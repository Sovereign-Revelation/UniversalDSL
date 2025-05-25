require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// API & IDE routes
app.use('/', routes);

// Error middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}/ide`)
);