import { ReactNode } from "react";

interface CardProps {
  title: string;
  amount: string;
  percentage: string;
  isIncrease: boolean;
  icon: ReactNode;
  borderColor: string;
}

export default function Card({ title, amount, percentage, isIncrease, icon, borderColor }: CardProps) {
  return (
    <div className={`p-5 rounded-lg shadow-md flex-1 border-t-4 ${borderColor} bg-white`}>
      <div className="flex justify-between items-center">
        <h3 className="text-gray-600 font-semibold">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-black mt-2">{amount}</p>
      {/* <p className={`text-sm mt-1 ${isIncrease ? "text-green-500" : "text-red-500"}`}>
        {isIncrease ? "↑" : "↓"} {percentage} vs last month
      </p> */}
    </div>
  );
}
