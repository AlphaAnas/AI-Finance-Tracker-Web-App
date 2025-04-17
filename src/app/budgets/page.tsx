"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/app/firebase"
import { redirect } from "next/navigation"
import { toast } from "react-hot-toast"
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
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"

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

// Define types
interface User {
  uid: string
}

interface Budget {
  id: string
  name: string
  allocated: number
  spent: number
  category: string
  userId: string
  transactions?: number
  trend?: string
  icon?: React.ReactNode
  color?: string
}

// Map categories to icons and colors
const categoryIcons: Record<string, React.ReactNode> = {
  Groceries: <ShoppingCart className="h-5 w-5" />,
  Rent: <Home className="h-5 w-5" />,
  Transport: <CreditCard className="h-5 w-5" />,
  Entertainment: <BarChart3 className="h-5 w-5" />,
  // Default icon for any other category
  default: <ShoppingCart className="h-5 w-5" />,
}

const categoryColors: Record<string, string> = {
  Groceries: "bg-emerald-500",
  Rent: "bg-violet-500",
  Transport: "bg-amber-500",
  Entertainment: "bg-blue-500",
  // Default color for any other category
  default: "bg-gray-500",
}

export default function BudgetsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [processedBudgets, setProcessedBudgets] = useState<any[]>([])

  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  // Form state for new budget
  const [newBudgetName, setNewBudgetName] = useState("")
  const [newBudgetAmount, setNewBudgetAmount] = useState("")
  const [newBudgetCategory, setNewBudgetCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculated totals
  const [totalAllocated, setTotalAllocated] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [totalRemaining, setTotalRemaining] = useState(0)
  const [percentSpent, setPercentSpent] = useState(0)

  const fetchBudgets = async (userId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log(`Fetching budgets for user ID: ${userId}`)
      const response = await fetch(`/api/get-budgets?uid=${userId}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setBudgets(data)

      // Process budget data
      processBudgetData(data)
    } catch (err) {
      console.error("Error details:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Process budget data to calculate totals and add UI elements
  const processBudgetData = (budgets: Budget[]) => {
    if (!budgets.length) {
      setProcessedBudgets([])
      setTotalAllocated(0)
      setTotalSpent(0)
      setTotalRemaining(0)
      setPercentSpent(0)
      return
    }

    // Calculate totals
    const allocated = budgets.reduce((acc, budget) => acc + budget.allocated, 0)
    const spent = budgets.reduce((acc, budget) => acc + budget.spent, 0)
    const remaining = allocated - spent
    const percent = allocated > 0 ? Math.round((spent / allocated) * 100) : 0

    setTotalAllocated(allocated)
    setTotalSpent(spent)
    setTotalRemaining(remaining)
    setPercentSpent(percent)

    // Process individual budgets
    const processed = budgets.map((budget) => {
      const category = budget.category || "default"
      const left = budget.allocated - budget.spent

      // Determine trend (this would ideally be calculated from historical data)
      let trend = "stable"
      if (budget.spent > budget.allocated * 0.9) {
        trend = "up"
      } else if (budget.spent < budget.allocated * 0.5) {
        trend = "down"
      }

      return {
        ...budget,
        left,
        icon: categoryIcons[category] || categoryIcons.default,
        color: categoryColors[category] || categoryColors.default,
        transactions: budget.transactions || Math.floor(Math.random() * 10) + 1, // Placeholder
        trend,
      }
    })

    setProcessedBudgets(processed)
  }

  // Handle adding a new budget
  const handleAddBudget = async () => {
    if (!user) return

    if (!newBudgetName.trim()) {
      toast.error("Please enter a budget name")
      return
    }

    if (!newBudgetAmount || Number.parseFloat(newBudgetAmount) <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    if (!newBudgetCategory) {
      toast.error("Please select a category")
      return
    }

    try {
      setIsSubmitting(true)

      const newBudget = {
        name: newBudgetName,
        allocated: Number.parseFloat(newBudgetAmount),
        spent: 0, // New budgets start with 0 spent
        category: newBudgetCategory,
        userId: user.uid,
        createdAt: serverTimestamp(),
      }

      // Add to Firestore
      await addDoc(collection(db, "budgets"), newBudget)

      // Reset form and close dialog
      setNewBudgetName("")
      setNewBudgetAmount("")
      setNewBudgetCategory("")
      setIsAddBudgetOpen(false)

      // Refresh budgets
      fetchBudgets(user.uid)

      toast.success("Budget added successfully")
    } catch (err) {
      console.error("Error adding budget:", err)
      toast.error("Failed to add budget")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle deleting a budget
  const handleDeleteBudget = async (budgetId: string) => {
    if (!user) return

    try {
      await deleteDoc(doc(db, "budgets", budgetId))

      // Refresh budgets
      fetchBudgets(user.uid)

      toast.success("Budget deleted successfully")
    } catch (err) {
      console.error("Error deleting budget:", err)
      toast.error("Failed to delete budget")
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("Redirecting to login")
        toast.error("Session expired. Please log in again.")
        setTimeout(() => {
          toast.dismiss()
          redirect("/login")
        }, 1000)
        return
      }

      // Set user and fetch budgets within the same callback
      setUser(currentUser)
      fetchBudgets(currentUser.uid)
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 md:p-6 flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="bg-red-50 p-5 rounded-lg text-red-500 flex items-center justify-center">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-[2rem] font-bold text-[#6366F1] mb-1">
              Budget Tracker
            </h1>
            <p className="text-gray-500">
              Manage and track your spending across categories
            </p>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#6366F1] text-white hover:bg-[#5558E8] rounded-lg px-4 py-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Monthly
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white rounded-lg shadow-lg border border-gray-100">
                <DropdownMenuItem className="text-gray-900 font-medium hover:bg-gray-50">
                  Weekly
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 font-medium hover:bg-gray-50">
                  Monthly
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-900 font-medium hover:bg-gray-50">
                  Yearly
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              onClick={() => setIsAddBudgetOpen(true)}
              className="bg-[#6366F1] text-white hover:bg-[#5558E8] rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Budget
            </Button>
          </div>
        </div>

        {/* Budget Summary Section */}
        <div className="mb-8">
          <h2 className="text-[#1F2937] text-xl font-bold mb-2">Budget Summary</h2>
          <p className="text-gray-500 mb-4">Your monthly budget overview for April 2025</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-blue-600">
                  <BadgeDollarSign className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Total Budget</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">$2,150</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-purple-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Total Spent</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">$1,850</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-green-600">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <span className="text-gray-600">Remaining</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">$300</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Overall Progress</span>
              <span className="text-gray-900">86% spent</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#6366F1]"
                style={{ width: '86%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>$2,150</span>
            </div>
          </div>
        </div>

        {/* Budget Categories Grid */}
        <div className="grid grid-cols-4 gap-4">
          {/* Groceries Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900">Groceries</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold text-gray-900">$350</span>
                <span className="text-sm text-gray-500">of $500</span>
              </div>

              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '70%' }}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">70% spent</span>
                  <span className="text-emerald-500 font-medium">$150 left</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                12 transactions this monthly
              </p>
            </div>
          </div>

          {/* Rent Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-violet-100 p-2 rounded-lg">
                  <Home className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="font-bold text-gray-900">Rent</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold text-gray-900">$1200</span>
                <span className="text-sm text-gray-500">of $1200</span>
              </div>

              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500" style={{ width: '100%' }}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">100% spent</span>
                  <span className="text-red-500 font-medium">Budget depleted</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                1 transactions this monthly
              </p>
            </div>
          </div>

          {/* Transport Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900">Transport</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold text-gray-900">$180</span>
                <span className="text-sm text-gray-500">of $250</span>
              </div>

              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '72%' }}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">72% spent</span>
                  <span className="text-emerald-500 font-medium">$70 left</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                8 transactions this monthly
              </p>
            </div>
          </div>

          {/* Entertainment Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Entertainment</h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-bold text-gray-900">$120</span>
                <span className="text-sm text-gray-500">of $200</span>
              </div>

              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">60% spent</span>
                  <span className="text-emerald-500 font-medium">$80 left</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                5 transactions this monthly
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Budget Dialog */}
      <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
        <DialogContent className="bg-white rounded-lg shadow-xl max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Create new budget
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Set up a new budget category to track your spending.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Budget Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Groceries, Rent, etc."
                value={newBudgetName}
                onChange={(e) => setNewBudgetName(e.target.value)}
                className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Allocated Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-7 w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  placeholder="0.00"
                  value={newBudgetAmount}
                  onChange={(e) => setNewBudgetAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select value={newBudgetCategory} onValueChange={setNewBudgetCategory}>
                <SelectTrigger id="category" className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddBudgetOpen(false)}
              className="border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddBudget}
              disabled={isSubmitting}
              className="bg-[#4F46E5] text-white hover:bg-[#4338CA]"
            >
              {isSubmitting ? "Creating..." : "Create Budget"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
