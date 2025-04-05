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
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-500">Budget Tracker</h1>
          <p className="text-muted-foreground mt-1">Manage and track your spending across categories</p>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {selectedPeriod === "monthly" ? "Monthly" : selectedPeriod === "weekly" ? "Weekly" : "Yearly"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedPeriod("weekly")}>Weekly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("monthly")}>Monthly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedPeriod("yearly")}>Yearly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600">
                <Plus className="h-4 w-4" />
                Add Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create new budget</DialogTitle>
                <DialogDescription>Set up a new budget category to track your spending.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Budget Name</Label>
                  <Input id="name" placeholder="e.g., Groceries, Rent, etc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="amount">Allocated Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="amount" type="number" className="pl-7" placeholder="0.00" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
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
                <Button variant="outline" onClick={() => setIsAddBudgetOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddBudgetOpen(false)}>Create Budget</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px] bg-gray-200">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-700 hover:bg-gray-300"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-700 hover:bg-gray-300"
          >
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-gray-800">Budget Summary</CardTitle>
                <CardDescription className="text-gray-600">
                  Your {selectedPeriod} budget overview for {new Date().toLocaleString("default", { month: "long" })}{" "}
                  {new Date().getFullYear()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BadgeDollarSign className="h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Total Budget</span>
                      </div>
                      <span className="font-semibold text-gray-800">${totalAllocated.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Total Spent</span>
                      </div>
                      <span className="font-semibold text-gray-800">${totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-5 w-5 text-gray-800" />
                        <span className="text-sm font-medium text-gray-700">Remaining</span>
                      </div>
                      <span className="font-semibold text-gray-800">${totalRemaining.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-700">{percentSpent}% spent</span>
                    </div>
                    <Progress value={percentSpent} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>$0</span>
                      <span>${totalAllocated.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {budgets.map((budget, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <div className={`${budget.color} p-2 rounded-md text-white`}>{budget.icon}</div>
                      <CardTitle className="text-base text-gray-800">{budget.name}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center mb-1">
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
                      <Progress
                        value={(budget.spent / budget.allocated) * 100}
                        className="h-2"
                      />
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
                    {budget.transactions} transactions this period
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-800">AI-Powered Insights</CardTitle>
                    <CardDescription className="text-gray-600">
                      Smart analysis of your spending patterns and behaviors
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-gray-800 bg-gray-200 px-3 py-1 rounded-full text-sm">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-800"></span>
                    </span>
                    AI Active
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-gray-100 border-gray-200">
                    <div className="flex gap-3">
                      <div className="bg-gray-800 text-white p-2 rounded-full h-fit">
                        <TrendingDown className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Spending Anomaly Detected</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Your grocery spending is 27% higher than your usual pattern. This might be due to recent price
                          increases in your frequently purchased items.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Predictive Spending Forecast</h4>
                    <div className="h-[180px] w-full bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-800">
                        <BarChart3 className="h-10 w-10 mx-auto mb-2" />
                        <p className="text-sm">AI-generated spending forecast visualization</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      Based on your historical data, our AI predicts you'll spend approximately{" "}
                      <span className="font-medium text-gray-800">$2,140</span> next month.
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Smart Recommendations</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 border rounded-md hover:bg-gray-100 transition-colors">
                        <div className="bg-gray-200 p-2 rounded-md text-gray-800">
                          <BadgeDollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">Optimize Entertainment Budget</h5>
                          <p className="text-sm text-gray-600">
                            You could save $45/month by consolidating your streaming subscriptions.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border rounded-md hover:bg-gray-100 transition-colors">
                        <div className="bg-gray-200 p-2 rounded-md text-gray-800">
                          <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-800">Grocery Shopping Pattern</h5>
                          <p className="text-sm text-gray-600">
                            Shopping on Wednesdays could save you approximately 12% on your grocery bills.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

