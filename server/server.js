const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// API routes
app.use('/api/transactions', transactionRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Server running successfully');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
