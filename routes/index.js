const express = require('express');
const path = require('path');
const router = express.Router();

const generatedRoutes = require('./generatedRoutes');
const apiController = require('../controllers/apiController');

// DSL schema execution endpoint
router.post('/run-flow', apiController.runFlow);

// All auto-generated routes from universal DSL
router.use('/', generatedRoutes);

module.exports = router;
