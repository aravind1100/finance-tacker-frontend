import { useLocation, useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  Scatter,
} from "recharts";

const COLORS = ["#ff6b6b", "#4dabf7", "#ffd43b", "#51cf66", "#845ef7", "#ffa94d"];

function formatCurrency(v) {
  if (v === null || v === undefined) return "-";
  return `₹${Number(v).toLocaleString()}`;
}

// ✅ Custom tooltip to show balance + income + expense separately
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const balanceObj = payload.find((p) => p.dataKey === "balance");
  const incomeObj = payload.find((p) => p.dataKey === "income");
  const expenseObj = payload.find((p) => p.dataKey === "expense");
  const formattedDate = new Date(label).toLocaleDateString("en-GB");  
  return (
    <div className="bg-white p-3 rounded-xl shadow-md border">
      <div className="font-semibold mb-1">{formattedDate}</div>
      <div className="flex gap-3 text-sm">
        {incomeObj && (
          <div>
            <span className="text-sky-600 font-medium">Income</span>
            <div>{formatCurrency(incomeObj.value)}</div>
          </div>
        )}
        {expenseObj && (
          <div>
            <span className="text-rose-600 font-medium">Expense</span>
            <div>{formatCurrency(expenseObj.value)}</div>
          </div>
        )}
        {balanceObj && (
          <div>
            <span className="text-violet-600 font-medium">Balance</span>
            <div>{formatCurrency(balanceObj.value)}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const Analytics = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions = [] } = location.state || {};

  if (!transactions.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <h2 className="text-gray-600 text-xl mb-4">No transaction data available 📉</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ✅ PIE + BAR Data
  const incomeData = transactions.filter((t) => t.type === "income");
  const expenseData = transactions.filter((t) => t.type === "expense");

  const categoryData = expenseData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map((k) => ({
    name: k,
    value: categoryData[k],
  }));

  const totalIncome = incomeData.reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = expenseData.reduce((s, t) => s + Number(t.amount), 0);

  const barData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
  ];

  // ✅ LINE CHART DATA - only actual existing dates (no future empty dates)
  const grouped = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

    if (!grouped[formatted]) grouped[formatted] = { date: formatted, income: 0, expense: 0 };
    if (t.type === "income") grouped[formatted].income += Number(t.amount);
    else grouped[formatted].expense += Number(t.amount);
  });

  const groupedArray = Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));

  let running = 0;
  const lineData = groupedArray.map((item) => {
  const timestamp = new Date(item.date).getTime();   // ✅ convert to number (ms since 1970)
  running += item.income - item.expense;

  return {
    date: timestamp,     // ✅ Using number for X-axis
    income: item.income,
    expense: item.expense,
    balance: running,
  };
});


  return (
    <div className="p-6 min-h-screen bg-linear-to-br from-purple-200 via-indigo-100 to-blue-200">
      <div className="max-w-5xl mx-auto">

        {/* TITLE + BACK BUTTON */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📊 Financial Analytics</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition shadow"
          >
            ← Back
          </button>
        </div>

        {/* PIE + BAR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PIE CARD */}
          <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
              Expense Category Breakdown
            </h3>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={90} label>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatCurrency} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BAR CARD */}
          <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
              Income vs Expense (Totals)
            </h3>

            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={formatCurrency} />
                  <Legend />
                  <Bar dataKey="amount">
                    {barData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* LINE CHART */}
        <div className="bg-white shadow rounded-xl p-5 border border-gray-200 mt-6">
          <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">
            Balance Flow Over Time 📈
          </h3>

          <div style={{ width: "100%", height: 420 }}>
            <ResponsiveContainer>
              <ComposedChart data={lineData}>
                <XAxis
                dataKey="date"
                type="number"               
                domain={["dataMin", "dataMax"]} 
                tickFormatter={(d) => new Date(d).toLocaleDateString("en-GB")}
                 />

                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#845ef7"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
                <Scatter data={lineData} dataKey="income" fill="#51cf66" />
                <Scatter data={lineData} dataKey="expense" fill="#ff6b6b" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
