const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

app.use('/', authRoutes);



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
