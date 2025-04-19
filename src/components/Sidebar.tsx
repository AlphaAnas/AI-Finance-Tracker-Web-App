import Link from "next/link";
import { FaTachometerAlt, FaExchangeAlt, FaWallet, FaChartBar, FaCog, FaArrowLeft } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Transactions", icon: <FaExchangeAlt />, path: "/transactions" },
  { name: "Budgets", icon: <FaWallet />, path: "/budgets" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
  // { name: "Reports", icon: <FaChartBar />, path: "/reports" },
];

export default function Sidebar() {
  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-5 pb-2">
        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="flex items-center text-sm bg-transparent hover:bg-gray-800 py-1 px-1 rounded transition-colors duration-200">
              <FaArrowLeft size={12} />
            </button>
          </Link>
          <Link href="/login">
            <h2 className="text-2xl font-bold cursor-pointer">MaaliMunshi</h2>
          </Link>
        </div>
      </div>
      
      <nav className="flex-1 p-5 pt-3"> 
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors duration-200">
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}