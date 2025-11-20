import { Trash2, Edit, BarChart3, ListFilter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TransactionList = ({
  transactions,
  onDelete,
  onEdit,
  onFetchAll,
  onFilter,
}) => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 mt-8 border border-gray-100 transition-all duration-300 hover:shadow-purple-300">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span>📋</span> Transaction List
        </h2>

        <div className="relative flex flex-wrap gap-3 justify-end">

          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <ListFilter size={18} />
            Filter
          </button>

          {/* Filter Dropdown */}
          {showFilter && (
            <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg w-40 text-sm z-10 p-2">
              {["income", "expense", "today", "month", "reset"].map((filter) => (
                <button
                  key={filter}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded capitalize"
                  onClick={() => {
                    onFilter(filter);
                    setShowFilter(false);
                  }}
                >
                  {filter === "reset" ? "Reset Filters" : filter}
                </button>
              ))}
            </div>
          )}

          {/* Analytics Button */}
          <button
            onClick={() => navigate("/analytics", { state: { transactions } })}
            className="flex items-center gap-2 bg-linear-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition"
          >
            <BarChart3 size={18} /> Analyse
          </button>

          {/* Fetch All */}
          <button
            onClick={onFetchAll}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-blue-700 hover:scale-105 transition"
          >
            All
          </button>
        </div>
      </div>

      {/* Table */}
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8 text-lg">
          Add transactions or Click All to view all your transactions 🙂
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Note</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t._id}
                  className="border-b hover:bg-purple-50 hover:shadow-md transition-all cursor-pointer"
                >
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        t.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.type.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-4 text-gray-800">{t.category}</td>

                  <td className="p-4 font-bold">
                    {t.type === "income" ? (
                      <span className="text-green-600">+ ₹{t.amount}</span>
                    ) : (
                      <span className="text-red-600">- ₹{t.amount}</span>
                    )}
                  </td>

                  <td className="p-4 text-gray-500">
                    {new Date(t.date).toLocaleDateString("en-GB")}
                  </td>

                  <td className="p-4 text-gray-600">{t.note || "-"}</td>

                  <td className="p-4">
                    <div className="flex items-center justify-center gap-4">

                      {/* Edit */}
                      <button
                        onClick={() => onEdit(t)}
                        className="p-2 rounded-full bg-blue-50 hover:bg-blue-200 text-blue-600 transition-all"
                      >
                        <Edit size={18} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(t._id)}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-200 text-red-600 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
