const transactionService = require('../services/transactionService');

const createTransaction = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
    const { amount, description, type } = req.body;
    if (!amount || !description || !type) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }
    const tx = await transactionService.createTransaction(req.body);
    res.status(201).json({ success: true, transaction: tx });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const txs = await transactionService.getAllTransactions();
    res.json({ success: true, transactions: txs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
};
