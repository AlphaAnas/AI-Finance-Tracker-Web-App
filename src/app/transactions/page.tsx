"use client";

import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaArrowUp, 
  FaArrowDown, 
  FaFileExport, 
  FaPlus 
} from 'react-icons/fa';

// Sample transaction data
const sampleTransactions = [
  {
    id: "TRX-7823",
    account: "Main Checking",
    date: "2023-08-15",
    status: "incoming",
    amount: 1250.00,
    category: "Salary",
    description: "Monthly salary deposit"
  },
  {
    id: "TRX-7824",
    account: "Credit Card",
    date: "2023-08-14",
    status: "outgoing",
    amount: 120.50,
    category: "Groceries", 
    description: "Weekly grocery shopping"
  },
  {
    id: "TRX-7825",
    account: "Savings",
    date: "2023-08-13",
    status: "incoming",
    amount: 500.00,
    category: "Transfer",
    description: "Transfer from checking"
  },
  {
    id: "TRX-7826",
    account: "Main Checking",
    date: "2023-08-12",
    status: "outgoing",
    amount: 45.00,
    category: "Entertainment",
    description: "Movie tickets"
  },
  {
    id: "TRX-7827",
    account: "Credit Card",
    date: "2023-08-10",
    status: "outgoing",
    amount: 85.20,
    category: "Utilities",
    description: "Electricity bill"
  },
  {
    id: "TRX-7828",
    account: "Main Checking",
    date: "2023-08-09",
    status: "outgoing",
    amount: 35.75,
    category: "Transportation",
    description: "Fuel"
  },
  {
    id: "TRX-7829",
    account: "Savings",
    date: "2023-08-08",
    status: "incoming",
    amount: 200.00,
    category: "Interest",
    description: "Monthly interest"
  },
  {
    id: "TRX-7830",
    account: "Credit Card",
    date: "2023-08-07",
    status: "outgoing",
    amount: 129.99,
    category: "Shopping",
    description: "New headphones"
  },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState("desc");
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  // Filter and sort transactions
  const filteredTransactions = sampleTransactions
    .filter(transaction => {
      // Apply status filter
      if (statusFilter !== "all" && transaction.status !== statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.id.toLowerCase().includes(searchLower) ||
          transaction.account.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower) ||
          transaction.description.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date
      if (dateSort === "desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  // Toggle selection of a transaction
  const toggleSelect = (id: string) => {
    setSelectedTransactions(prev => 
      prev.includes(id) 
        ? prev.filter(transId => transId !== id)
        : [...prev, id]
    );
  };

  // Toggle selection of all transactions
  const toggleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredTransactions.map(t => t.id));
    }
  };

  // Handle date sort toggle
  const toggleDateSort = () => {
    setDateSort(prev => prev === "desc" ? "asc" : "desc");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-500">Transactions</h1>
        <div className="flex space-x-2">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <FaPlus /> Add Transaction
          </button>
          <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
            <FaFileExport /> Export
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Status:</span>
              <select
                className="border border-gray-300 rounded-md px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
              </select>
            </div>
            
            <button 
              className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setDateSort("desc");
              }}
            >
              <FaFilter /> Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[oklch(0.961_0.01_0)]">
              <tr>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Transaction ID
                  </span>
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Account
                </th>
                <th className="px-8 py-4 text-left">
                  <div className="flex items-center cursor-pointer" onClick={toggleDateSort}>
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider mr-1">Date</span>
                    {dateSort === "desc" ? <FaArrowDown size={12} /> : <FaArrowUp size={12} />}
                  </div>
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-8 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-[oklch(0.961_0.01_0)]">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{transaction.id}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-700">
                      {transaction.account}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-700">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'incoming' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status === 'incoming' ? (
                          <><FaArrowDown className="mr-1" /> Incoming</>
                        ) : (
                          <><FaArrowUp className="mr-1" /> Outgoing</>
                        )}
                      </span>
                    </td>
                    <td className={`px-8 py-5 whitespace-nowrap text-sm font-medium text-right ${
                      transaction.status === 'incoming' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.status === 'incoming' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table footer with pagination */}
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredTransactions.length}</span> transactions
                {selectedTransactions.length > 0 && (
                  <span className="ml-1">
                    (<span className="font-medium">{selectedTransactions.length}</span> selected)
                  </span>
                )}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 