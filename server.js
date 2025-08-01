const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const documentationRoutes = require('./routes/documentationRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/documentation', documentationRoutes);

const PORT = process.env.PORT || 3443;

// Démarrage du serveur HTTP (Apache gère le SSL)
app.listen(PORT, '127.0.0.1', () => {
    console.log(`HTTP Server is running on port ${PORT}`);
});