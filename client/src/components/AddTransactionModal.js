import React, { useState } from "react";
import { createTransaction } from "../services/transactionService";

export default function AddTransactionModal({ onSuccess, onCancel }) {
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("credit");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desc || !amount || !type) {
      return alert("Please fill all fields");
    }
    try {
      setIsLoading(true);
      await createTransaction({
        amount,
        type: type.toString(),
        description: desc,
      });
      if (onSuccess) onSuccess();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      alert("Something went wrong! while saving the transactions");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h3> New Transaction</h3>
      <div style={{ display: "flex", top: "2px", bottom: "2px" }}>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value.toString())}>
          <option value={"credit"}>Credit</option>
          <option value={"debit"}>Debit</option>
        </select>
      </div>
      <div style={{ display: "flex", top: "2px", bottom: "2px" }}>
        <label>Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div style={{ display: "flex", top: "2px", bottom: "2px" }}>
        <label>Description</label>
        <input type="string" value={desc} onChange={(e) => setDesc(e.target.value)} required />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "30px",
          alignItems: "end",
          width: "100%",
        }}
      >
        <button type="submit" disabled={isLoading}>Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
