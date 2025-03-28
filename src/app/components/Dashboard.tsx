"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import StatCard from './common/StatCard';
// import ChartContainer from './common/ChartContainer';
// import TransactionItem from './common/TransactionItem';
// import BudgetCard from './common/BudgetCard';
// import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Home,
  Car,
  Music,
  Coffee,
} from 'lucide-react';

const recentTransactions = [
  {
    id: '1',
    date: 'Today',
    description: 'Grocery Store',
    amount: 89.50,
    category: 'Groceries',
    type: 'expense',
    status: 'completed',
  },
  {
    id: '2',
    date: 'Yesterday',
    description: 'Salary Deposit',
    amount: 2400.00,
    category: 'Income',
    type: 'income',
    status: 'completed',
  },
  {
    id: '3',
    date: '3 days ago',
    description: 'Restaurant',
    amount: 45.80,
    category: 'Dining',
    type: 'expense',
    status: 'completed',
  },
];

const budgetData = [
  {
    id: '1',
    category: 'Groceries',
    allocated: 500,
    spent: 350,
    icon: <ShoppingBag className="h-4 w-4" />,
    color: 'finance-blue',
  },
  {
    id: '2',
    category: 'Rent',
    allocated: 1200,
    spent: 1200,
    icon: <Home className="h-4 w-4" />,
    color: 'finance-purple',
  },
  {
    id: '3',
    category: 'Transport',
    allocated: 250,
    spent: 180,
    icon: <Car className="h-4 w-4" />,
    color: 'finance-green',
  },
  {
    id: '4',
    category: 'Entertainment',
    allocated: 200,
    spent: 125,
    icon: <Music className="h-4 w-4" />,
    color: 'finance-yellow',
  },
];

const expensesByCategory = [
  { name: 'Groceries', value: 350, color: '#38BDF8' },
  { name: 'Rent', value: 1200, color: '#A78BFA' },
  { name: 'Transport', value: 180, color: '#4ADE80' },
  { name: 'Entertainment', value: 125, color: '#FACC15' },
  { name: 'Dining', value: 210, color: '#F87171' },
  { name: 'Other', value: 135, color: '#94A3B8' },
];

const monthlySpending = [
  { name: 'Jan', amount: 1800 },
  { name: 'Feb', amount: 2200 },
  { name: 'Mar', amount: 1900 },
  { name: 'Apr', amount: 2400 },
  { name: 'May', amount: 2300 },
  { name: 'Jun', amount: 2100 },
];

const Dashboard = () => {
  const handleEditTransaction = (id: string) => {
    console.log('Edit transaction', id);
  };

  const handleDeleteTransaction = (id: string) => {
    console.log('Delete transaction', id);
  };

  const handleEditBudget = (id: string) => {
    console.log('Edit budget', id);
  };

  const totalBalance = 1100;
  const totalIncome = 8200;
  const totalExpense = 2800;

  return (
    <div className="ml-64"> {/* Add margin to accommodate fixed sidebar */}
      {/* Main Content */}
      <div className="p-8">
        <div className="flex flex-col">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Current Balance"
              value={`$${totalBalance.toFixed(2)}`}
              icon={<Wallet className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
              className="border-l-4 border-finance-blue"
              iconClassName="bg-finance-blue-light text-finance-blue-dark"
            />
            <StatCard
              title="Total Income"
              value={`$${totalIncome.toFixed(2)}`}
              icon={<TrendingUp className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
              className="border-l-4 border-finance-green"
              iconClassName="bg-finance-green-light text-finance-green-dark"
            />
            <StatCard
              title="Total Expenses"
              value={`$${totalExpense.toFixed(2)}`}
              icon={<TrendingDown className="h-5 w-5" />}
              trend={{ value: 3, isPositive: false }}
              className="border-l-4 border-finance-red"
              iconClassName="bg-finance-red-light text-finance-red-dark"
            />
            <StatCard
              title="Savings Rate"
              value={`${Math.round((totalIncome - totalExpense) / totalIncome * 100)}%`}
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 5, isPositive: true }}
              className="border-l-4 border-finance-purple"
              iconClassName="bg-finance-purple-light text-finance-purple-dark"
            />
          </div>

          {/* Charts section commented out */}
          
          {/* Recent Transactions and Budget Overview commented out */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;