"use client";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Groceries", value: 400 },
  { name: "Rent", value: 1200 },
  { name: "Transport", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Dining", value: 350 },
  { name: "Other", value: 150 },
];

const COLORS = ["#6b5b95", "#feb236", "#d64161", "#ff7b25", "#87bdd8", "#b5e7a0"];

export default function ExpensePieChart() {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-black">Expense Categories</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={105}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
