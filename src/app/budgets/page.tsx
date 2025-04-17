"use client"

import { useState } from "react"
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

export default function BudgetsPage() {
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  // Sample data
  const budgets = [
    {
      name: "Groceries",
      spent: 350,
      allocated: 500,
      left: 150,
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "bg-emerald-500",
      transactions: 12,
      trend: "up",
    },
    {
      name: "Rent",
      spent: 1200,
      allocated: 1200,
      left: 0,
      icon: <Home className="h-5 w-5" />,
      color: "bg-violet-500",
      transactions: 1,
      trend: "stable",
    },
    {
      name: "Transport",
      spent: 180,
      allocated: 250,
      left: 70,
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-amber-500",
      transactions: 8,
      trend: "down",
    },
    {
      name: "Entertainment",
      spent: 120,
      allocated: 200,
      left: 80,
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-blue-500",
      transactions: 5,
      trend: "up",
    },
  ]

  const totalAllocated = budgets.reduce((acc, budget) => acc + budget.allocated, 0)
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0)
  const totalRemaining = totalAllocated - totalSpent
  const percentSpent = Math.round((totalSpent / totalAllocated) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              Budget Tracker
            </h1>
            <p className="text-gray-600 mt-2">Manage and track your spending across categories</p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Calendar className="h-4 w-4" />
                  {selectedPeriod === "monthly" ? "Monthly" : selectedPeriod === "weekly" ? "Weekly" : "Yearly"}
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-40 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-xl p-2 animate-in fade-in-80 slide-in-from-top-1"
              >
                <DropdownMenuItem 
                  onClick={() => setSelectedPeriod("weekly")} 
                  className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-gray-900 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 focus:bg-gradient-to-r focus:from-blue-100 focus:to-purple-100"
                >
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Weekly
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedPeriod("monthly")} 
                  className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-gray-900 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 focus:bg-gradient-to-r focus:from-blue-100 focus:to-purple-100"
                >
                  <Calendar className="h-4 w-4 text-purple-600" />
                  Monthly
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSelectedPeriod("yearly")} 
                  className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 text-gray-900 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 focus:bg-gradient-to-r focus:from-blue-100 focus:to-purple-100"
                >
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  Yearly
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Plus className="h-4 w-4" />
                  Add Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle>Create new budget</DialogTitle>
                  <DialogDescription>Set up a new budget category to track your spending.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Budget Name</Label>
                    <Input id="name" placeholder="e.g., Groceries, Rent, etc." className="border-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Allocated Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <Input id="amount" type="number" className="pl-7 border-gray-200 focus:ring-2 focus:ring-blue-500" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category" className="border-gray-200 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm">
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
                  <Button variant="outline" onClick={() => setIsAddBudgetOpen(false)} className="hover:bg-gray-100">
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddBudgetOpen(false)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    Create Budget
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Budget Summary Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Budget Summary
              </CardTitle>
              <CardDescription className="text-gray-900">
                Your {selectedPeriod} budget overview for {new Date().toLocaleString("default", { month: "long" })}{" "}
                {new Date().getFullYear()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeDollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-900">Total Budget</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">${totalAllocated.toLocaleString()}</span>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-900">Total Spent</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</span>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-900">Remaining</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">${totalRemaining.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900 font-medium">Overall Progress</span>
                  <span className="font-semibold text-gray-900">{percentSpent}% spent</span>
                </div>
                <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${percentSpent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span>${totalAllocated.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {budgets.map((budget, index) => (
              <Card
                key={index}
                className="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${budget.color} p-2 rounded-lg text-white transform group-hover:scale-110 transition-transform duration-300`}>
                        {budget.icon}
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">{budget.name}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">${budget.spent}</span>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-900 font-medium">of ${budget.allocated}</span>
                      {budget.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      ) : budget.trend === "down" ? (
                        <TrendingDown className="h-4 w-4 text-green-500" />
                      ) : null}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute h-full ${budget.color} rounded-full transition-all duration-500 ease-in-out`}
                        style={{ width: `${(budget.spent / budget.allocated) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">
                        {Math.round((budget.spent / budget.allocated) * 100)}% spent
                      </span>
                      <span className={budget.left > 0 ? "text-green-600" : "text-red-600"}>
                        {budget.left > 0 ? `$${budget.left} left` : "Budget depleted"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <span className="text-xs text-gray-500">{budget.transactions} transactions this {selectedPeriod}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

