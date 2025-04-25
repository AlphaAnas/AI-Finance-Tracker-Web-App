"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/firebase"
import { redirect } from "next/navigation"
import { toast } from "react-hot-toast"
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

// Color palette for the charts
const COLORS = ["#6b5b95", "#feb236", "#d64161", "#ff7b25", "#87bdd8", "#b5e7a0"]

// Define types
interface User {
  uid: string
}

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


export default function ExpenseDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Derived state for charts
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([])
  const [monthlyData, setMonthlyData] = useState<{ name: string; amount: number }[]>([])

  const fetchTransactions = async (userId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log(`Fetching transactions for user ID: ${userId}`)
      const response = await fetch(`/api/get-transactions?uid=${userId}`)

      // For 404 just treat as empty data
      if (response.status === 404) {
        setTransactions([])
        processTransactionsData([])
        return
      }
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setTransactions(data)

      // Process data for charts once transactions are loaded
      processTransactionsData(data)
    } catch (err) {
      console.error("Error details:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Process transactions data for both charts
  const processTransactionsData = (transactions: Transaction[]) => {
    if (!transactions.length) {
      setCategoryData([])
      setMonthlyData([])
      return
    }

    // Process data for category chart
    const categoryMap = new Map<string, number>()

    transactions.forEach((transaction) => {
      const category = transaction.category || "Other"
      const currentAmount = categoryMap.get(category) || 0
      categoryMap.set(category, currentAmount + transaction.amount)
    })

    const categoryChartData = Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
    }))

    // Process data for monthly chart
    const monthlyMap = new Map<string, number>()
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Initialize all months with 0
    monthNames.forEach((month) => {
      monthlyMap.set(month, 0)
    })

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthIndex = date.getMonth()
      const monthName = monthNames[monthIndex]
      const currentAmount = monthlyMap.get(monthName) || 0
      monthlyMap.set(monthName, currentAmount + transaction.amount)
    })

    // Convert to array and take first 6 months
    const monthlyChartData = Array.from(monthlyMap.entries())
      .map(([name, amount]) => ({ name, amount }))
      .slice(0, 6)

    setCategoryData(categoryChartData)
    setMonthlyData(monthlyChartData)
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

      // Set user and fetch transactions within the same callback
      setUser(currentUser)
      fetchTransactions(currentUser.uid)
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 p-5 rounded-lg shadow-md text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
     

      {/* Expense Categories Chart */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-black">Expense Categories</h3>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={105}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex justify-center items-center h-[250px] text-gray-500">No category data available</div>
        )}
      </div>
    </div>
  )
}
