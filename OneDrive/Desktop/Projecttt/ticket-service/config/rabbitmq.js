const amqp = require('amqplib');

let channel = null;

const connectRabbitMQ = async () => {
    try {
        console.log('🐰 Attempting to connect to RabbitMQ...');
        const connection = await amqp.connect('amqp://127.0.0.1');
        console.log('🐰 Connection created, creating channel...');

        channel = await connection.createChannel();
        await channel.assertQueue('ticket_notification');
        console.log('🐰 RabbitMQ Connected Successfully!');
    } catch (error) {
        console.error('RabbitMQ Connection Error:', error.message);
        console.log('🐰 Retrying in 5 seconds...');
        setTimeout(connectRabbitMQ, 5000); // Retry after 5s
    }
};

const publishEvent = (queue, message) => {
    if (!channel) {
        console.error('No RabbitMQ Channel!');
        return;
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to ${queue}:`, message);
};

module.exports = { connectRabbitMQ, publishEvent };