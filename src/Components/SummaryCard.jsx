const SummaryCard = ({ income, expense }) => {
  const balance = income - expense;

  const cardBase =
    "p-6 rounded-2xl text-center shadow-md transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">

      {/* Income */}
      <div className={`${cardBase} bg-linear-to-r from-green-100 to-green-300`}>
        <h3 className="text-lg font-semibold text-green-900">Income</h3>
        <p className="text-3xl font-bold text-green-800 mt-2">₹{income}</p>
      </div>

      {/* Expense */}
      <div className={`${cardBase} bg-linear-to-r from-red-100 to-red-300`}>
        <h3 className="text-lg font-semibold text-red-900">Expense</h3>
        <p className="text-3xl font-bold text-red-800 mt-2">₹{expense}</p>
      </div>

      {/* Balance */}
      <div className={`${cardBase} bg-linear-to-r from-blue-100 to-blue-300`}>
        <h3 className="text-lg font-semibold text-blue-900">Balance</h3>
        <p className="text-3xl font-bold text-blue-800 mt-2">₹{balance}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
