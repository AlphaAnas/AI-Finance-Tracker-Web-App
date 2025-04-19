"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/app/firebase"
import { redirect } from "next/navigation"
import { toast } from "react-hot-toast"
import { FaShoppingCart, FaHome, FaCar, FaUtensils, FaPlane, FaGamepad } from "react-icons/fa"
import Link from "next/link"
import type { JSX } from "react"

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
}

interface Transaction {
  id: string
  category: string
  amount: number
  InvoiceType: "incoming" | "outgoing"
}

// Map categories to icons and colors
const categoryIcons: Record<string, JSX.Element> = {
  Groceries: <FaShoppingCart />,
  Rent: <FaHome />,
  Transport: <FaCar />,
  Entertainment: <FaGamepad />,
  // Default icon for any other category
  default: <FaShoppingCart />,
}

const categoryColors: Record<string, string> = {
  Groceries: "text-blue-500",
  Rent: "text-purple-500",
  Transport: "text-yellow-500",
  Entertainment: "text-pink-500",
  // Default color for any other category
  default: "text-gray-500",
}

export default function BudgetOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [processedBudgets, setProcessedBudgets] = useState<any[]>([])

  const fetchBudgets = async (userId: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch both budgets and transactions
      const [budgetsResponse, transactionsResponse] = await Promise.all([
        fetch(`/api/get-budgets?uid=${userId}`),
        fetch(`/api/get-transactions?uid=${userId}`)
      ])

      if (!budgetsResponse.ok || !transactionsResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const budgetsData = await budgetsResponse.json()
      const transactionsData = await transactionsResponse.json()

      // Calculate spent amounts for each budget based on matching transactions
      const updatedBudgets = budgetsData.map((budget: Budget) => {
        const matchingTransactions = transactionsData.filter(
          (tx: Transaction) => 
            tx.category.toLowerCase() === budget.category.toLowerCase() && 
            tx.InvoiceType === 'outgoing'
        )

        const spent = matchingTransactions.reduce(
          (sum: number, tx: Transaction) => sum + Number(tx.amount), 
          0
        )

        return {
          ...budget,
          title: budget.name, // Map name to title for display
          total: budget.allocated, // Map allocated to total for display
          spent: spent,
          transactions: matchingTransactions.length
        }
      })

      setBudgets(updatedBudgets)
      processBudgetData(updatedBudgets)
    } catch (err) {
      console.error("Error details:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // Process budget data to calculate remaining amounts and add UI elements
  const processBudgetData = (budgets: Budget[]) => {
    if (!budgets.length) {
      setProcessedBudgets([])
      return
    }

    const processed = budgets.map((budget) => {
      const remaining = Math.max(0, budget.allocated - budget.spent)
      const category = budget.category || "default"
      const percentage = Math.round((budget.spent / budget.allocated) * 100)

      return {
        ...budget,
        remaining,
        color: categoryColors[category] || categoryColors.default,
        icon: categoryIcons[category] || categoryIcons.default,
        percentage
      }
    })

    // Sort by percentage spent (highest to lowest)
    processed.sort((a, b) => b.percentage - a.percentage)
    
    // Take only top 4 budgets for overview
    setProcessedBudgets(processed.slice(0, 4))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No user logged in")
        return
      }

      setUser(currentUser)
      fetchBudgets(currentUser.uid)
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">Budget Overview</h2>
          <Link href="/budgets" className="text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="flex justify-center items-center h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">Budget Overview</h2>
          <Link href="/budgets" className="text-blue-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="bg-red-50 p-5 rounded-lg text-red-500 h-[200px] flex items-center justify-center">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black">Budget Overview</h2>
        <Link href="/budgets" className="text-blue-600 hover:underline">
          View all →
        </Link>
      </div>
      <div className="mt-4">
        {processedBudgets.length > 0 ? (
          processedBudgets.map((budget, index) => {
            const percentage = Math.round((budget.spent / budget.total) * 100)
            return (
              <div
                key={budget.id || index}
                className="bg-gray-50 p-3 rounded-lg mb-3 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <span className={`${budget.color} text-xl`}>{budget.icon}</span>
                  <h3 className="text-md font-medium text-gray-800">{budget.title}</h3>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">${budget.spent.toFixed(2)} spent</p>
                  <div className="relative w-32 h-2 bg-gray-300 rounded-full mt-1">
                    <div
                      className={`absolute h-2 rounded-full bg-opacity-70`}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: budget.color.replace("text-", "").replace("-500", ""),
                      }}
                    ></div>
                  </div>
                  <p className={`text-xs ${percentage >= 100 ? "text-red-500" : "text-green-500"}`}>
                    ${budget.remaining.toFixed(2)} left
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex justify-center items-center h-[150px] text-gray-500">No budget data available</div>
        )}
      </div>
    </div>
  )
}
