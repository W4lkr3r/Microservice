const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticket');
const { connectRabbitMQ } = require('./config/rabbitmq');

// Load env vars
dotenv.config();

// Connect to database
connectDB();
connectRabbitMQ();

const app = express();

// Body parser
app.use(express.json());

app.use('/', ticketRoutes);



const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Ticket Service running on port ${PORT}`);
});
