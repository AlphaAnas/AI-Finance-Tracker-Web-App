"use client";

import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { auth } from "@/app/firebase"; // adjust path if needed
import { onAuthStateChanged } from "firebase/auth";

import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";


const TRANSACTIONS_PER_PAGE = 5;

// Function to format date to relative time
const formatRelativeTime = (dateString: string): string => {
  const today = new Date();
  const date = new Date(dateString);
  
  // Reset time part for accurate day comparison
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  // Calculate difference in days
  const diffTime = todayDate.getTime() - compareDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else {
    // Format as MM/DD/YYYY for older dates
    return date.toLocaleDateString();
  }
}

interface Transaction {
  id: string;
  userid: string;
  account: string;
  date: string;
  status: "incoming" | "outgoing";
  amount: number;
  category: string;
  description: string;
  vendor?: string;
  invoiceType?: string;
  gstAmount?: number;
  items?: Array<{
    ItemName: string;
    Price: number;
    Quantity: number;
  }>;
}

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
}





export default function RecentTransactions()
{

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Initialize as empty array instead of undefined
  
  const fetchTransactions = async (userId: string) => {
      try {
        setIsLoading(true);
        setError(null);
  
        console.log(`Fetching transactions for user ID: ${userId}`);
        const response = await fetch(`/api/get-transactions?uid=${userId}`);
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error details:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) {
          console.log("Redirecting to login");
          toast.error('Session expired. Please log in again.');
          setTimeout(() => {
            toast.dismiss();
            redirect("/login");
          }, 1000);
          return;
        }
  
        // Set user and fetch transactions within the same callback
        // to avoid race conditions
        setUser(currentUser);
        fetchTransactions(currentUser.uid);
        if (transactions.length !== 0) {
            
        }
      });
  
      return () => unsubscribe();
    }, []);
  
const indexOfFirstTransaction = 0;
const indexOfLastTransaction = indexOfFirstTransaction + TRANSACTIONS_PER_PAGE;
// currentTransactions contains the transactions for the current page - its an array of transactions
const currentTransactions = transactions && transactions.length > 0 
  ? transactions.slice(indexOfFirstTransaction, indexOfLastTransaction) 
  : [];

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold  text-black">Recent Transactions</h2>
        <Link href="/transactions" className="text-blue-600 hover:underline">View all →</Link>
      </div>
      <div className="mt-4">
        {currentTransactions.map((tx, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-3">
            <div>
              <h3 className="text-md font-medium text-gray-800">
                {tx.category}
              </h3>
              <p className="text-gray-500 text-sm">{formatRelativeTime(tx.date)} • <FaCheckCircle className="inline text-green-500" /></p>
            </div>
            <div className="text-right">
              <p className={`font-semibold text-red-400`}>
                {`-$${Math.abs(tx.amount).toFixed(2)}`}
              </p>
              <span className="text-gray-500 text-xs bg-gray-200 px-2 py-1 rounded">
              {tx.description ? 
                  (tx.description.length > 20 ? 
                    `${tx.description.substring(0, 20)}...` : 
                    tx.description) : 
                  'No description'
                  }

              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
