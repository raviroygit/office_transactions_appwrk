import React, { useCallback, useEffect, useState } from "react";
import { getTransactions as fetchTransactions } from "../services/transactionService";
import AddTransactionModal from "../components/AddTransactionModal";

export default function Transactions() {
  const [txs, setTxs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getTransactions = useCallback(async () => {
    const transactions = await fetchTransactions();
    let balance = 0;
    if (transactions) {
      const computed = transactions
        .slice()
        .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt))
        .map((tx) => {
          balance = tx.type === "credit" ? balance + tx.amount : balance - tx.amount;
          return { ...tx, balance };
        })
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setTxs(computed);
    }
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  const handleAdd = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const onTransactionAdded = () => {
    handleClose();
    getTransactions();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "50px" }}>
        <h2>Office Transactions</h2>
        <button onClick={handleAdd}> + Add Transaction</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Credit</th>
              <th>Debit</th>
              <th>Running Balance</th>
            </tr>
          </thead>
          <tbody>
            {txs?.map((tx) => (
              <tr key={tx._id}>
                <td>{new Date(tx.updatedAt).toLocaleDateString()}</td>
                <td>{tx.description}</td>
                <td>{tx?.type.toString() === "credit" ? tx.amount : ""}</td>
                <td>{tx?.type.toString() === "debit" ? tx.amount : ""}</td>
                <td>{tx.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div
          style={{
            padding: "20px",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#d3cfcf",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "999",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "white",
              padding: "20px",
              borderRadius: "6px",
              position: "relative",
              minWidth: "400px",
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "8px",
                right: "12px",
                border: "24px",
                background: "transparent",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <AddTransactionModal onCancel={handleClose} onSuccess={onTransactionAdded} />
          </div>
        </div>
      )}
    </div>
  );
}
