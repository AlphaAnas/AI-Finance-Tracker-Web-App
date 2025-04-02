import { FaShoppingCart, FaHome, FaCar } from "react-icons/fa";

const budgets = [
  { title: "Groceries", spent: 350, remaining: 150, total: 500, color: "text-blue-500", icon: <FaShoppingCart /> },
  { title: "Rent", spent: 1200, remaining: 0, total: 1200, color: "text-purple-500", icon: <FaHome /> },
  { title: "Transport", spent: 180, remaining: 70, total: 250, color: "text-yellow-500", icon: <FaCar /> },
];

export default function BudgetOverview() {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold  text-black">Budget Overview</h2>
        <a href="#" className="text-blue-600 hover:underline">View all →</a>
      </div>
      <div className="mt-4">
        {budgets.map((budget, index) => {
          const percentage = Math.round((budget.spent / budget.total) * 100);
          return (
            <div key={index} className="bg-gray-50 p-3 rounded-lg mb-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className={`${budget.color} text-xl`}>{budget.icon}</span>
                <h3 className="text-md font-medium text-gray-800">{budget.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm  text-gray-600">${budget.spent.toFixed(2)} spent</p>
                <div className="relative w-32 h-2 bg-gray-300 rounded-full mt-1">
                  <div className={`absolute h-2 rounded-full ${budget.color} bg-opacity-70`} style={{ width: `${percentage}%` }}></div>
                </div>
                <p className={`text-xs ${percentage === 100 ? "text-red-500" : "text-green-500"}`}>
                  {budget.remaining.toFixed(2)} left
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
