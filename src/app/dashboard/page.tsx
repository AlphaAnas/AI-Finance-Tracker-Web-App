"use client";

import Layout from "@/components/Layout";
import Card from "@/components/common/Card";
import BudgetChart from "@/components/BudgetChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import BudgetOverview from "@/components/BudgetOverview";
import RecentTransactions from "@/components/RecentTransactions";
import { FaWallet, FaDollarSign, FaChartLine, FaPiggyBank } from "react-icons/fa";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { auth } from "@/app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { UserData } from "../api/profile/userDataService";

interface Transaction {
  id: string;
  userid: string;
  account: string;
  date: string;
  
  InvoiceType: "incoming" | "outgoing";
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

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [dashboardStats, setDashboardStats] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    savingsRate: 0,
  });

  function updateDashboard(transactions: Transaction[]) {
    const income = transactions
      .filter((tx) => tx.InvoiceType === "incoming")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = transactions
      .filter((tx) => tx.InvoiceType === "outgoing")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const balance = income - expenses;
    const savingsRate = income ? parseFloat(((balance / income) * 100).toFixed(0)) : 0;

    setDashboardStats({
      income,
      expenses,
      balance,
      savingsRate,
    });
  }

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
      updateDashboard(data);
    } catch (err) {
      console.error("Error details:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log(`Fetching profile for user ID: ${userId}`);
      const response = await fetch(`/api/profile?uid=${userId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserProfile(data.data);
      console.log("User profile fetched:", data.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      toast.error("Failed to load profile data");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("Redirecting to login");
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          toast.dismiss();
          redirect("/login");
        }, 1000);
        return;
      }

      setUser(currentUser);
      fetchTransactions(currentUser.uid);
      fetchUserProfile(currentUser.uid);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-black mb-6">Dashboard</h2>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          title="Current Balance"
          amount={`Rs. ${userProfile?.currentBalance?.toFixed(2) || '0.00'}`}
          percentage={`${dashboardStats.savingsRate}%`}
          isIncrease={userProfile?.currentBalance ? (userProfile.currentBalance >= 0) : true}
          icon={<FaWallet />}
          borderColor="border-blue-500"
        />
        <Card
          title="Total Income"
          amount={`Rs. ${dashboardStats.income.toFixed(2)}`}
          percentage="8%"
          isIncrease={true}
          icon={<FaChartLine />}
          borderColor="border-green-500"
        />
        <Card
          title="Total Expenses"
          amount={`Rs. ${dashboardStats.expenses.toFixed(2)}`}
          percentage="3%"
          isIncrease={false}
          icon={<FaDollarSign />}
          borderColor="border-red-500"
        />
        <Card
          title="Savings Rate"
          amount={`${dashboardStats.savingsRate}%`}
          percentage="5%"
          isIncrease={true}
          icon={<FaPiggyBank />}
          borderColor="border-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <BudgetChart />
        <ExpensePieChart  />
      </div>

      {/* Transaction Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactions />
        <BudgetOverview />
      </div>
    </Layout>
  );
}
