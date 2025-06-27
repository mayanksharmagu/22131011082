require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const shortUrlRoutes = require('./routes/shortUrlRoutes');
const customLogger = require('./middleware/logger');

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.static('public'));
app.use(customLogger);

// Routes
app.use('/', shortUrlRoutes);

// DB connection and server start
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
