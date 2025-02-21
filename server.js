const express = require('express');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const documentationRoutes = require('./routes/documentationRoutes');
const healthRoutes = require('./routes/healthRoutes');
require('dotenv').config();
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors())
// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/documentation', documentationRoutes);
app.use('/health', healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
