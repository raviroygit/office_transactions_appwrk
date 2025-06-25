const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    date: Date,
    description: String,
    amount: Number,
    type: String
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
