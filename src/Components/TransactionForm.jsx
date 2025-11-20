import { useState } from "react";

const TransactionForm = ({ onAdd }) =>{
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount) {
      alert("Category & Amount are required");
      return;
    }

    const finalData = {
      ...formData,
      date: formData.date || new Date().toISOString().slice(0, 10), // ✅ default date
    };

    try {
      onAdd(finalData);

      // Reset form
      setFormData({
        type: "expense",
        category: "",
        amount: "",
        date: "",
        note: "",
      });
    } catch (error) {
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mt-5 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">➕ Add Transaction</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-4"
      >
        {/* Type */}
        <select
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <input
          type="text"
          placeholder="Category (eg: Food, Salary)"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />

        {/* Date */}
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        {/* Note */}
        <input
          type="text"
          placeholder="Add a note (optional)"
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 md:col-span-2"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />

        {/* Submit button */}
        <button className="bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition-all md:col-span-6">
          Add Transaction
        </button>
      </form>
    </div>
  );
}
export default TransactionForm;
