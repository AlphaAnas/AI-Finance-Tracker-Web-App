import Link from "next/link";
import { FaTachometerAlt, FaExchangeAlt, FaWallet, FaChartBar, FaCog } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Transactions", icon: <FaExchangeAlt />, path: "/transactions" },
  { name: "Budgets", icon: <FaWallet />, path: "/budgets" },
  { name: "Reports", icon: <FaChartBar />, path: "/reports" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <div className="h-screen  bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">MaaliMunshi</h2>
      {/* /* flex is basically a CSS layout model that allows
       items to align and distribute space within a container efficiently, even when their sizes are dynamic or unknown. */} 
      <nav className="flex-1"> 
        {menuItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
