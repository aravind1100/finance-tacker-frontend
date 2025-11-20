// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import SummaryCard from "../Components/SummaryCard";
import TransactionForm from "../Components/TransactionForm";
import TransactionList from "../Components/TransactionList";
import EditTransactionModal from "../Components/EditTransactionModal";
import API from "../api.js";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]); // ✅ backup list for filtering
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/user/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
      setAllTransactions(res.data); // ✅ store original data
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  };

  const fetchAllTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/user/alltransactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
      setAllTransactions(res.data); // ✅ update original list
    } catch {
      alert("Failed to fetch all transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (data) => {
    try {
      const res = await API.post("/user/transaction", data);

      setTransactions((prev) => [res.data, ...prev]);
      setAllTransactions((prev) => [res.data, ...prev]); // ✅ also update backup
    } catch {
      alert("Failed to add transaction");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/user/transaction/${id}`);

      setTransactions((prev) => prev.filter((t) => t._id !== id));
      setAllTransactions((prev) => prev.filter((t) => t._id !== id)); // ✅ update backup too
    } catch {
      alert("Failed to delete transaction");
    }
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await API.patch(`/user/transaction/${id}`, updatedData);
      const updated = res.data.updatedTransaction || res.data;

      setTransactions((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setAllTransactions((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      ); // ✅ sync backup

      setEditModalOpen(false);
    } catch {
      alert("Failed to update transaction");
    }
  };

  const handleFilter = (type) => {
    if (type === "reset") {
      setTransactions(allTransactions); // ✅ restore backup
      return;
    }

    if (type === "income") {
      setTransactions(allTransactions.filter((t) => t.type === "income"));
    }

    if (type === "expense") {
      setTransactions(allTransactions.filter((t) => t.type === "expense"));
    }

    if (type === "today") {
      setTransactions(
        allTransactions.filter(
          (t) => new Date(t.date).toDateString() === new Date().toDateString()
        )
      );
    }

    if (type === "month") {
      const currMonth = new Date().getMonth();
      const currYear = new Date().getFullYear();
      setTransactions(
        allTransactions.filter((t) => {
          const d = new Date(t.date);
          return d.getMonth() === currMonth && d.getFullYear() === currYear;
        })
      );
    }
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div
      className="min-h-screen bg-linear-to-r from-blue-100 via-blue-200 to-indigo-200 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
      }}
    >
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-10 backdrop-blur-sm">
        <SummaryCard income={income} expense={expense} />

        <TransactionForm onAdd={handleAddTransaction} />

        <TransactionList
          transactions={transactions}
          onDelete={handleDelete}
          onEdit={handleEditClick}
          onFetchAll={fetchAllTransactions}
          onFilter={handleFilter}
        />

        <EditTransactionModal
          isOpen={editModalOpen}
          transaction={selectedTransaction}
          onUpdate={handleUpdate}
          onClose={() => setEditModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
