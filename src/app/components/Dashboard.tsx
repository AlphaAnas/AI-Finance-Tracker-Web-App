<<<<<<< Updated upstream
"use client"

import React from 'react';
import dynamic from 'next/dynamic';
import StatCard from './common/StatCard';
=======

import React from 'react';
// import StatCard from './common/StatCard';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const totalBalance = 1100;
=======
  const totalBalance = 5400;
>>>>>>> Stashed changes
  const totalIncome = 8200;
  const totalExpense = 2800;

  return (
<<<<<<< Updated upstream
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
=======
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartContainer
            title="Monthly Spending"
            className="lg:col-span-2"
            action={
              <Button variant="ghost" size="sm" className="text-xs">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySpending} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar
                  dataKey="amount"
                  radius={[4, 4, 0, 0]}
                  fill="#38BDF8"
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer title="Expense Categories">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <Button variant="ghost" size="sm" asChild>
                <a href="/transactions">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  {...transaction}
                  onEdit={handleEditTransaction}
                  onDelete={handleDeleteTransaction}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Budget Overview</h2>
              <Button variant="ghost" size="sm" asChild>
                <a href="/budgets">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {budgetData.slice(0, 3).map((budget) => (
                <BudgetCard
                  key={budget.id}
                  {...budget}
                  onEdit={handleEditBudget}
                />
              ))}
            </div>
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
};

<<<<<<< Updated upstream
export default Dashboard;
=======
export default Dashboard;
>>>>>>> Stashed changes
