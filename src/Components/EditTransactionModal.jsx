import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function formatForInputDate(value) {
  if (!value && value !== 0) return "";                 // null/undefined -> empty
  // If already a string like "2024-11-11" (no time)
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }
  // ISO string with time: "2024-11-11T12:34:56.789Z"
  if (typeof value === "string" && value.includes("T")) {
    return value.split("T")[0];
  }
  // If it's a string but not ISO, try Date parsing
  const dateObj = new Date(value);
  if (!isNaN(dateObj.getTime())) {
    // toISOString uses UTC — slice gives yyyy-mm-dd
    return dateObj.toISOString().slice(0, 10);
  }
  // If it's already a Date object
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return ""; // fallback
}

const EditTransactionModal = ({ isOpen, onClose, transaction, onUpdate }) =>{
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  // Pre-fill values when modal opens (safe date handling)
  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type || "expense",
        category: transaction.category || "",
        amount: transaction.amount || "",
        date: formatForInputDate(transaction.date),
        note: transaction.note || "",
      });
    } else {
      // clear when no transaction
      setFormData({ type: "", category: "", amount: "", date: "", note: "" });
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount) {
      alert("Category and amount are required");
      return;
    }

    // wait for parent update, then close
    await onUpdate(transaction._id, formData);
    
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Edit Transaction</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            value={formData.type}
            className="w-full border rounded-lg p-2"
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            className="w-full border rounded-lg p-2"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <input
            type="number"
            className="w-full border rounded-lg p-2"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />

          <input
            type="date"
            className="w-full border rounded-lg p-2"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <textarea
            className="w-full border rounded-lg p-2"
            placeholder="Note (optional)"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Update Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditTransactionModal;