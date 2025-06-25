const Transaction = require('../models/Transaction');

const createTransaction = async (data) => {
  const tx = new Transaction(data);
  await tx.save();
  return tx;
};

const getAllTransactions = async () => {
  return await Transaction.find().sort({ updatedAt: -1 });
};

module.exports = {
  createTransaction,
  getAllTransactions,
};
