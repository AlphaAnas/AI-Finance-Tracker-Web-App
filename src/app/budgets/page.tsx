"use client"

import React, { useState } from "react"
import {
  BadgeDollarSign,
  BarChart3,
  Calendar,
  ChevronDown,
  CreditCard,
  Home,
  Plus,
  ShoppingCart,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
  ChevronRight,
  ChevronUp,
  PieChart,
  Receipt,
  Settings,
} from "lucide-react"

// Import UI components directly from the components directory
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Transaction {
  date: string
  amount: number
  description: string
}

interface Budget {
  name: string
  spent: number
  allocated: number
  left: number
  icon: React.ReactNode
  color: string
  transactions: number
  trend: "up" | "down" | "stable"
  details: Transaction[]
}

interface WeeklySummary {
  startDate: string
  endDate: string
  weekNumber: number
}

interface MonthlySummary {
  month: string
  year: number
}

interface YearlySummary {
  year: number
  previousYearComparison: string
}

type PeriodSummary = WeeklySummary | MonthlySummary | YearlySummary

interface BudgetData {
  weekly: {
    budgets: Budget[]
    summary: WeeklySummary
  }
  monthly: {
    budgets: Budget[]
    summary: MonthlySummary
  }
  yearly: {
    budgets: Budget[]
    summary: YearlySummary
  }
}

export default function BudgetsPage() {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly")
  const [expandedBudget, setExpandedBudget] = useState<number | null>(null)

  // Sample data with period-specific structures
  const budgetData: BudgetData = {
    weekly: {
      budgets: [
        {
          name: "Groceries",
          spent: 120,
          allocated: 150,
          left: 30,
          icon: <ShoppingCart className="h-5 w-5" />,
          color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
          transactions: 5,
          trend: "up",
          details: [
            { date: "2023-05-15", amount: 45.20, description: "Whole Foods Market" },
            { date: "2023-05-10", amount: 32.50, description: "Trader Joe's" },
          ]
        },
        {
          name: "Transport",
          spent: 45,
          allocated: 60,
          left: 15,
          icon: <CreditCard className="h-5 w-5" />,
          color: "bg-gradient-to-br from-amber-400 to-amber-600",
          transactions: 3,
          trend: "down",
          details: [
            { date: "2023-05-18", amount: 35.00, description: "Uber Ride" },
            { date: "2023-05-15", amount: 10.00, description: "Bus Fare" },
          ]
        },
        {
          name: "Entertainment",
          spent: 40,
          allocated: 50,
          left: 10,
          icon: <BarChart3 className="h-5 w-5" />,
          color: "bg-gradient-to-br from-blue-400 to-blue-600",
          transactions: 2,
          trend: "up",
          details: [
            { date: "2023-05-20", amount: 25.00, description: "Movie Tickets" },
            { date: "2023-05-15", amount: 15.00, description: "Streaming Service" },
          ]
        },
      ],
      summary: {
        startDate: "2023-05-15",
        endDate: "2023-05-21",
        weekNumber: 20,
      }
    },
    monthly: {
      budgets: [
        {
          name: "Groceries",
          spent: 350,
          allocated: 500,
          left: 150,
          icon: <ShoppingCart className="h-5 w-5" />,
          color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
          transactions: 12,
          trend: "up",
          details: [
            { date: "2023-05-15", amount: 45.20, description: "Whole Foods Market" },
            { date: "2023-05-10", amount: 32.50, description: "Trader Joe's" },
            { date: "2023-05-05", amount: 78.30, description: "Costco" },
          ]
        },
        {
          name: "Rent",
          spent: 1200,
          allocated: 1200,
          left: 0,
          icon: <Home className="h-5 w-5" />,
          color: "bg-gradient-to-br from-violet-400 to-violet-600",
          transactions: 1,
          trend: "stable",
          details: [
            { date: "2023-05-01", amount: 1200.00, description: "Monthly Rent" },
          ]
        },
        {
          name: "Transport",
          spent: 180,
          allocated: 250,
          left: 70,
          icon: <CreditCard className="h-5 w-5" />,
          color: "bg-gradient-to-br from-amber-400 to-amber-600",
          transactions: 8,
          trend: "down",
          details: [
            { date: "2023-05-18", amount: 35.00, description: "Uber Ride" },
            { date: "2023-05-15", amount: 45.00, description: "Gas Station" },
            { date: "2023-05-10", amount: 25.00, description: "Public Transit Pass" },
          ]
        },
        {
          name: "Entertainment",
          spent: 120,
          allocated: 200,
          left: 80,
          icon: <BarChart3 className="h-5 w-5" />,
          color: "bg-gradient-to-br from-blue-400 to-blue-600",
          transactions: 5,
          trend: "up",
          details: [
            { date: "2023-05-20", amount: 15.99, description: "Netflix Subscription" },
            { date: "2023-05-15", amount: 25.00, description: "Movie Tickets" },
            { date: "2023-05-10", amount: 45.00, description: "Concert Tickets" },
          ]
        },
      ],
      summary: {
        month: "May",
        year: 2023,
      }
    },
    yearly: {
      budgets: [
        {
          name: "Groceries",
          spent: 4200,
          allocated: 6000,
          left: 1800,
          icon: <ShoppingCart className="h-5 w-5" />,
          color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
          transactions: 144,
          trend: "up",
          details: [
            { date: "2023-05-15", amount: 45.20, description: "Whole Foods Market" },
            { date: "2023-04-10", amount: 32.50, description: "Trader Joe's" },
            { date: "2023-03-05", amount: 78.30, description: "Costco" },
          ]
        },
        {
          name: "Rent",
          spent: 14400,
          allocated: 14400,
          left: 0,
          icon: <Home className="h-5 w-5" />,
          color: "bg-gradient-to-br from-violet-400 to-violet-600",
          transactions: 12,
          trend: "stable",
          details: [
            { date: "2023-05-01", amount: 1200.00, description: "Monthly Rent" },
            { date: "2023-04-01", amount: 1200.00, description: "Monthly Rent" },
            { date: "2023-03-01", amount: 1200.00, description: "Monthly Rent" },
          ]
        },
        {
          name: "Transport",
          spent: 2160,
          allocated: 3000,
          left: 840,
          icon: <CreditCard className="h-5 w-5" />,
          color: "bg-gradient-to-br from-amber-400 to-amber-600",
          transactions: 96,
          trend: "down",
          details: [
            { date: "2023-05-18", amount: 35.00, description: "Uber Ride" },
            { date: "2023-04-15", amount: 45.00, description: "Gas Station" },
            { date: "2023-03-10", amount: 25.00, description: "Public Transit Pass" },
          ]
        },
        {
          name: "Entertainment",
          spent: 1440,
          allocated: 2400,
          left: 960,
          icon: <BarChart3 className="h-5 w-5" />,
          color: "bg-gradient-to-br from-blue-400 to-blue-600",
          transactions: 60,
          trend: "up",
          details: [
            { date: "2023-05-20", amount: 15.99, description: "Netflix Subscription" },
            { date: "2023-04-15", amount: 25.00, description: "Movie Tickets" },
            { date: "2023-03-10", amount: 45.00, description: "Concert Tickets" },
          ]
        },
      ],
      summary: {
        year: 2023,
        previousYearComparison: "+5.2%",
      }
    },
  }

  const currentData = budgetData[selectedPeriod]
  const budgets = currentData.budgets
  const summary: PeriodSummary = currentData.summary

  const totalAllocated = budgets.reduce((acc, budget) => acc + budget.allocated, 0)
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const percentSpent = Math.round((totalSpent / totalAllocated) * 100)

  const toggleBudgetExpansion = (index: number) => {
    setExpandedBudget(expandedBudget === index ? null : index)
  }

  const getPeriodDescription = () => {
    switch (selectedPeriod) {
      case 'weekly': {
        const weeklySummary = summary as WeeklySummary
        return `Week ${weeklySummary.weekNumber} (${weeklySummary.startDate} - ${weeklySummary.endDate})`
      }
      case 'monthly': {
        const monthlySummary = summary as MonthlySummary
        return `${monthlySummary.month} ${monthlySummary.year}`
      }
      case 'yearly': {
        const yearlySummary = summary as YearlySummary
        return `${yearlySummary.year} ${yearlySummary.previousYearComparison ? `(${yearlySummary.previousYearComparison} vs last year)` : ''}`
      }
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm font-display">
              Budget Tracker
            </h1>
            <p className="text-gray-600">Manage and track your spending across categories</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg border-0 px-4 py-2 rounded-full"
              >
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-800">
                  {selectedPeriod === "monthly" ? "Monthly" : selectedPeriod === "weekly" ? "Weekly" : "Yearly"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="absolute inset-0 cursor-pointer"></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white shadow-xl rounded-xl border border-gray-100 mt-2 min-w-[160px]">
                  <DropdownMenuItem 
                    onClick={() => setSelectedPeriod("weekly")} 
                    className="hover:bg-blue-50 rounded-lg py-3 px-4 cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Weekly</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSelectedPeriod("monthly")} 
                    className="hover:bg-blue-50 rounded-lg py-3 px-4 cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Monthly</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setSelectedPeriod("yearly")} 
                    className="hover:bg-blue-50 rounded-lg py-3 px-4 cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Yearly</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-5">
                  <Plus className="h-4 w-4" />
                  <span className="font-medium">Add Budget</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-display">
                    Create new budget
                  </DialogTitle>
                  <DialogDescription>Set up a new budget category to track your spending.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="font-medium">Budget Name</Label>
                    <Input id="name" placeholder="e.g., Groceries, Rent, etc." className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount" className="font-medium">Allocated Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input id="amount" type="number" className="pl-7 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="font-medium">Category</Label>
                    <Select>
                      <SelectTrigger id="category" className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 backdrop-blur-sm rounded-lg">
                        <SelectItem value="essentials">Essentials</SelectItem>
                        <SelectItem value="housing">Housing</SelectItem>
                        <SelectItem value="transportation">Transportation</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddBudgetOpen(false)} className="border-gray-200 hover:bg-gray-100 rounded-lg">
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg rounded-lg">
                    Create Budget
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border-0 overflow-hidden rounded-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-display">
                Budget Summary
              </CardTitle>
              <CardDescription className="text-gray-600">
                {getPeriodDescription()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-lg text-white shadow-md">
                      <BadgeDollarSign className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Total Budget</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">${totalAllocated.toLocaleString()}</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-2 rounded-lg text-white shadow-md">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Total Spent</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">${totalSpent.toLocaleString()}</p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-lg text-white shadow-md">
                      <TrendingDown className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Remaining</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">${totalRemaining.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-700">{percentSpent}% spent</span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${percentSpent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>$0</span>
                  <span>${totalAllocated.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {budgets.map((budget, index) => (
              <Card 
                key={index} 
                className={`bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] overflow-hidden border-0 rounded-xl ${expandedBudget === index ? 'ring-2 ring-blue-400' : ''}`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${budget.color}`}></div>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <div className="flex items-center gap-2">
                    <div className={`${budget.color} p-2 rounded-xl text-white shadow-md`}>
                      {budget.icon}
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-800 font-display">{budget.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      onClick={() => toggleBudgetExpansion(index)}
                    >
                      {expandedBudget === index ? <ChevronUp className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-800">${budget.spent}</span>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-600">of ${budget.allocated}</span>
                      {budget.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : budget.trend === "down" ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : null}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`absolute top-0 left-0 h-full ${budget.color} transition-all duration-500 ease-out`}
                        style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">
                        {Math.round((budget.spent / budget.allocated) * 100)}% spent
                      </span>
                      <span className={budget.left > 0 ? "text-green-500" : "text-red-500"}>
                        {budget.left > 0 ? `$${budget.left} left` : "Budget depleted"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-1 text-xs text-gray-600">
                  {budget.transactions} transactions this {selectedPeriod}
                </CardFooter>
                
                {/* Expanded Content */}
                {expandedBudget === index && (
                  <div className="border-t border-gray-100 mt-2 pt-4 px-4 pb-4 animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">Recent Transactions</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full">
                          <PieChart className="h-3 w-3 mr-1" />
                          Analytics
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-full">
                          <Receipt className="h-3 w-3 mr-1" />
                          History
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {budget.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="bg-white p-1 rounded-md shadow-sm">
                              <Calendar className="h-3 w-3 text-gray-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{detail.description}</p>
                              <p className="text-xs text-gray-500">{detail.date}</p>
                            </div>
                          </div>
                          <span className="font-medium text-gray-800">${detail.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs rounded-full border-gray-200 hover:bg-gray-100">
                        <Settings className="h-3 w-3 mr-1" />
                        Manage Budget
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

