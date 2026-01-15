const express = require('express');
const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3003; // Different port!

// CONSUMER LOGIC 🐰
const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        await channel.assertQueue('ticket_notification');

        console.log('📧 Waiting for messages in ticket_notification...');

        channel.consume('ticket_notification', (data) => {
            const { ticketId, title, userEmail } = JSON.parse(data.content);

            console.log(`\n📨 RECEIVED EVENT:`);
            console.log(`   - Sending Email to: ${userEmail}`);
            console.log(`   - Subject: Ticket Created: ${title}`);
            console.log(`   - Body: Your ticket (${ticketId}) has been received!`);

            channel.ack(data); // Tell RabbitMQ "We got it"
        });

    } catch (error) {
        console.error('RabbitMQ Error:', error);
    }
};

connectRabbitMQ();

app.get('/', (req, res) => {
    res.send('Notification Service is Running');
});

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});