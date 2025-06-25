const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/transactions', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to database');
  } catch (err) {
    console.error('Failed to connect to database', err);
    process.exit(1);
  }
};

module.exports = connectDB;
