const express = require('express');
const router = express.Router();
const { createTodo } = require('../controllers/createTodo');

// Define your routes
router.post('/todos', createTodo);

module.exports = router;
