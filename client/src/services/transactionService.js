import axios from "axios";

export const getTransactions = async () => {
  const response = await axios.get("http://localhost:8000/api/transactions");
  return response.data.transactions;
};

export const createTransaction = async (data) => {
  const response = await axios.post("http://localhost:8000/api/transactions", data);
  return response.data.transaction;
};
