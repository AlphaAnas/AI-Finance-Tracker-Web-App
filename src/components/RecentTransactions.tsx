import { FaCheckCircle } from "react-icons/fa";

const transactions = [
  { title: "Grocery Store", amount: -89.5, category: "Groceries", date: "Today", status: "Completed" },
  { title: "Salary Deposit", amount: 2400, category: "Income", date: "Yesterday", status: "Completed" },
  { title: "Restaurant", amount: -45.8, category: "Dining", date: "3 days ago", status: "Completed" },
];

export default function RecentTransactions() {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <a href="#" className="text-blue-600 hover:underline">View all →</a>
      </div>
      <div className="mt-4">
        {transactions.map((tx, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-3">
            <div>
              <h3 className="text-md font-medium">{tx.title}</h3>
              <p className="text-gray-500 text-sm">{tx.date} • <FaCheckCircle className="inline text-green-500" /> {tx.status}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${tx.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                {tx.amount < 0 ? `-$${Math.abs(tx.amount).toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
              </p>
              <span className="text-gray-500 text-xs bg-gray-200 px-2 py-1 rounded">{tx.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
