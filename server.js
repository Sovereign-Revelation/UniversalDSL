require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

// Serve static frontend from /frontend
app.use('/ide', express.static(path.join(__dirname, 'frontend')));

// Main API routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Sovereign IDE running at http://localhost:${PORT}/ide`);
});
