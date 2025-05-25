const express = require('express');
const path = require('path');
const router = express.Router();

const generatedRoutes = require('./generatedRoutes');
const apiController = require('../controllers/apiController');

// API flow execution
router.post('/api/run-flow', apiController.runFlow);
router.use('/api', generatedRoutes);

// Serve IDE static (fallback to index.html for SPA routing)
router.get('/ide', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

module.exports = router;