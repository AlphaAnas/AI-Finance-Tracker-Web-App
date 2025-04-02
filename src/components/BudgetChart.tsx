"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", spending: 1800 },
  { month: "Feb", spending: 2200 },
  { month: "Mar", spending: 1700 },
  { month: "Apr", spending: 2400 },
  { month: "May", spending: 2300 },
  { month: "Jun", spending: 2100 },
];

export default function BudgetChart() {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">Monthly Spending</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="spending" fill="#3498db" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
