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

const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

// Configuration HTTPS
const httpsOptions = {
    cert: fs.readFileSync('/etc/letsencrypt/live/k0li.fr/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/k0li.fr/privkey.pem')
};

// Démarrage du serveur HTTPS
https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});