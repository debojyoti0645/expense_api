const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/transactions', transactionRoutes);


// Test route
app.get('/', (req, res) => {
    res.send("ExpenseSync API Running");
});

// Import DB (forces connection test)
require('./config/db');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
