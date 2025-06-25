const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a transaction
router.post('/', transactionController.createTransaction);

// Get all transactions
router.get('/', transactionController.getAllTransactions);

module.exports = router;
