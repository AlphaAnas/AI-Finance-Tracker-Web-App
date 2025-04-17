"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/firebase"
import { redirect } from "next/navigation"
import { toast } from "react-hot-toast"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Define types
interface User {
  uid: string
}

interface Transaction {
  id: string
  amount: number
  date: string // ISO date string
  userId: string
}

export default function BudgetChart() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [monthlyData, setMonthlyData] = useState<{ name: string; amount: number }[]>([])

  const fetchTransactions = async (userId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log(`Fetching transactions for user ID: ${userId}`)
      const response = await fetch(`/api/get-transactions?uid=${userId}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setTransactions(data)

      // Process data for monthly chart
      processMonthlyData(data)
    } catch (err) {
      console.error("Error details:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Process transactions data for monthly chart
  const processMonthlyData = (transactions: Transaction[]) => {
    if (!transactions.length) {
      setMonthlyData([])
      return
    }

    // Process data for monthly chart
    const monthlyMap = new Map<string, number>()
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Initialize all months with 0
    monthNames.forEach((month) => {
      monthlyMap.set(month, 0)
    })

    // Group transactions by month
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
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-black">Monthly Spending</h3>
        <div className="flex justify-center items-center h-[250px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-black">Monthly Spending</h3>
        <div className="bg-red-50 p-5 rounded-lg text-red-500 h-[250px] flex items-center justify-center">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-black">Monthly Spending</h3>
      {monthlyData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex justify-center items-center h-[250px] text-gray-500">No transaction data available</div>
      )}
    </div>
  )
}
