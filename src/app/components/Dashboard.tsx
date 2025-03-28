"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import StatCard from './common/StatCard';
// import ChartContainer from './common/ChartContainer';
// import TransactionItem from './common/TransactionItem';
// import BudgetCard from './common/BudgetCard';
import { Button } from '@/app/components/ui/button';



import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Home,
  Car,
  Music,
} from 'lucide-react';

const recentTransactions = [
  { id: '1', date: 'Today', description: 'Grocery Store', amount: 89.50, category: 'Groceries', type: 'expense', status: 'completed' },
  { id: '2', date: 'Yesterday', description: 'Salary Deposit', amount: 2400.00, category: 'Income', type: 'income', status: 'completed' },
  { id: '3', date: '3 days ago', description: 'Restaurant', amount: 45.80, category: 'Dining', type: 'expense', status: 'completed' },
];

const budgetData = [
  { id: '1', category: 'Groceries', allocated: 500, spent: 350, icon: <ShoppingBag className="h-4 w-4" />, color: '#38BDF8' },
  { id: '2', category: 'Rent', allocated: 1200, spent: 1200, icon: <Home className="h-4 w-4" />, color: '#A78BFA' },
  { id: '3', category: 'Transport', allocated: 250, spent: 180, icon: <Car className="h-4 w-4" />, color: '#4ADE80' },
  { id: '4', category: 'Entertainment', allocated: 200, spent: 125, icon: <Music className="h-4 w-4" />, color: '#FACC15' },
];

const Dashboard = () => {
  // More realistic financial data with meaningful patterns
  const totalBalance = 4750.25;
  const lastMonthBalance = 4250.80;
  const balanceGrowth = ((totalBalance - lastMonthBalance) / lastMonthBalance) * 100;
  
  const totalIncome = 5200.75;
  const lastMonthIncome = 4850.50;
  const incomeGrowth = ((totalIncome - lastMonthIncome) / lastMonthIncome) * 100;
  
  const totalExpense = 3125.30;
  const lastMonthExpense = 2950.70;
  const expenseGrowth = ((totalExpense - lastMonthExpense) / lastMonthExpense) * 100;
  
  // Calculate savings rate (income - expenses) / income * 100
  const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;
  const lastMonthSavingsRate = ((lastMonthIncome - lastMonthExpense) / lastMonthIncome) * 100;
  const savingsRateChange = savingsRate - lastMonthSavingsRate;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Current Balance"
          value={`$${totalBalance.toFixed(2)}`}
          icon={<Wallet className="h-5 w-5" />}
          trend={{ value: parseFloat(balanceGrowth.toFixed(1)), isPositive: balanceGrowth > 0 }}
          className="border-l-4"
          style={{ borderLeftColor: '#38BDF8' }}
          iconClassName="text-white"
          iconStyle={{ backgroundColor: '#E0F2FE', color: '#0284C7' }}
        />
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: parseFloat(incomeGrowth.toFixed(1)), isPositive: incomeGrowth > 0 }}
          className="border-l-4"
          style={{ borderLeftColor: '#4ADE80' }}
          iconClassName="text-white"
          iconStyle={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpense.toFixed(2)}`}
          icon={<TrendingDown className="h-5 w-5" />}
          trend={{ value: parseFloat(expenseGrowth.toFixed(1)), isPositive: false }}
          className="border-l-4"
          style={{ borderLeftColor: '#F87171' }}
          iconClassName="text-white"
          iconStyle={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
        />
        <StatCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: parseFloat(Math.abs(savingsRateChange).toFixed(1)), isPositive: savingsRateChange > 0 }}
          className="border-l-4"
          style={{ borderLeftColor: '#A78BFA' }}
          iconClassName="text-white"
          iconStyle={{ backgroundColor: '#F3E8FF', color: '#7C3AED' }}
        />
      </div>






    </div>
  );
};

export default Dashboard;
