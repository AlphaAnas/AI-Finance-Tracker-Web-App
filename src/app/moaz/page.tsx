"use client";

import React from "react";

const TransactionAnalysis = () => {
  return (
    <div className="p-6 bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6 text-black">Financial Analysis</h1>
      <div className="space-y-4 w-full max-w-md">
        <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
          Show Statement
        </button>
        <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
          Do an Analysis of My Budget So Far and Make Recommendations
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl mt-10">
        {/* Real-Time Expense Tracking */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold">📊 Real-Time Expense Tracking</h2>
          <div className="bg-green-100 text-black p-2 rounded mt-2">
            <p>Grocery = 10,592</p>
            <p>Fuel = 2,672</p>
            <p>Spotify = 349</p>
          </div>
          <p className="mt-2">💰 Amount Spent (Feb 2025): Rs. 13,613</p>
          <p>🛍️ Total Spent: Rs. 90,125</p>
          <p>💳 Remaining Budget: Rs. 8,975</p>
        </div>

        {/* Personalized Insights */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold">🔍 Personalised Insights</h2>
          <button className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-600 transition mt-2">
            Give me total of Feb
          </button>
          <div className="bg-white text-black p-2 rounded mt-2">
            <h3 className="font-bold">📅 Your February 2025 Summary:</h3>
            <p>✔️ Received: Rs. 100,500</p>
            <p>❌ Spent: Rs. 93,125</p>
            <p>💰 Balance: Rs. 29,875</p>
          </div>
        </div>

        {/* Detailed Statement */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold">📄 Detailed Statement</h2>
          <button className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-green-600 transition mt-2">
            Show me Feb statement
          </button>
          <div className="bg-white text-black p-2 rounded mt-2">
            <h3 className="font-bold">📑 Hassab Statement - February 2025:</h3>
            <p>🛍️ Total Spent: Rs. 93,125</p>
            <p>💰 Total Received: Rs. 100,500</p>
            <p>💳 Balance: Rs. 29,875</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionAnalysis;
