"use client";

import React, { useState } from 'react';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaFileDownload, 
  FaCalendarAlt 
} from 'react-icons/fa';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('income');
  const [timeRange, setTimeRange] = useState('month');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500">Financial Reports</h1>
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <FaFileDownload /> Export
          </button>
          <div className="relative">
            <select 
              className="bg-white border border-gray-300 rounded-md px-3 py-2 appearance-none pr-8"
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <FaCalendarAlt className="absolute right-2 top-3 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Report navigation tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 flex items-center gap-2 ${
              activeTab === 'income' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => handleTabChange('income')}
          >
            <FaChartLine /> Income Analysis
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 ${
              activeTab === 'expenses' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => handleTabChange('expenses')}
          >
            <FaChartPie /> Expense Breakdown
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 ${
              activeTab === 'cashflow' 
                ? 'border-b-2 border-blue-500 text-blue-500' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => handleTabChange('cashflow')}
          >
            <FaChartBar /> Cash Flow
          </button>
        </div>
      </div>

      {/* Report content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main chart */}
        <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-medium mb-4 text-blue-500">
            {activeTab === 'income' && 'Income Trends'}
            {activeTab === 'expenses' && 'Expense Categories'}
            {activeTab === 'cashflow' && 'Cash Flow Analysis'}
          </h2>
          <div className="h-64 flex items-center justify-center bg-[oklch(0.961_0.01_0)] rounded-md">
            <p className="text-gray-700">Chart visualization will appear here</p>
          </div>
        </div>

        {/* Summary panel */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4 text-blue-500">Summary</h2>
          
          {activeTab === 'income' && (
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Total Income</span>
                  <span className="font-medium">$8,450.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Highest Source</span>
                  <span className="font-medium">Salary</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Growth</span>
                  <span className="font-medium text-green-500">+12% vs. previous</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Total Expenses</span>
                  <span className="font-medium">$3,260.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Highest Category</span>
                  <span className="font-medium">Housing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Change</span>
                  <span className="font-medium text-red-500">+5% vs. previous</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cashflow' && (
            <div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Net Cash Flow</span>
                  <span className="font-medium">$5,190.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Savings Rate</span>
                  <span className="font-medium">61.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Trend</span>
                  <span className="font-medium text-green-500">Increasing</span>
                </div>
              </div>
            </div>
          )}

          {/* Common stats across all tabs */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-2 text-blue-500">Key Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-800 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">↑</span>
                <span>Your savings rate is above your target of 50%</span>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">!</span>
                <span>Entertainment spending increased by 15%</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">i</span>
                <span>You're on track to meet your annual savings goal</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed data section */}
      <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-blue-500">Detailed Data</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[oklch(0.961_0.01_0)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  {activeTab === 'income' ? 'Source' : activeTab === 'expenses' ? 'Category' : 'Type'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  {activeTab === 'cashflow' ? 'Balance' : 'Percentage'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sample data rows - these would be populated from real data */}
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-[oklch(0.961_0.01_0)]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    2023-{Math.floor(Math.random() * 12) + 1}-{Math.floor(Math.random() * 28) + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activeTab === 'income' 
                      ? ['Salary', 'Investments', 'Freelance', 'Rental', 'Other'][Math.floor(Math.random() * 5)] 
                      : activeTab === 'expenses'
                        ? ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities'][Math.floor(Math.random() * 5)]
                        : ['Income', 'Expense'][Math.floor(Math.random() * 2)]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {activeTab === 'expenses' ? '-' : ''} 
                    ${Math.floor(Math.random() * 1000) + 100}.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {activeTab === 'cashflow' 
                      ? `$${Math.floor(Math.random() * 10000) + 1000}.00`
                      : `${Math.floor(Math.random() * 30) + 5}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 