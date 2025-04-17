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
  title: string
  total: number
  spent: number
  category: string
  userId: string
}

// Map categories to icons and colors
const categoryIcons: Record<string, JSX.Element> = {
  Groceries: <FaShoppingCart />,
  Rent: <FaHome />,
  Transport: <FaCar />,
  Dining: <FaUtensils />,
  Travel: <FaPlane />,
  Entertainment: <FaGamepad />,
  // Default icon for any other category
  default: <FaShoppingCart />,
}

const categoryColors: Record<string, string> = {
  Groceries: "text-blue-500",
  Rent: "text-purple-500",
  Transport: "text-yellow-500",
  Dining: "text-green-500",
  Travel: "text-red-500",
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

  // Process budget data to calculate remaining amounts and add UI elements
  const processBudgetData = (budgets: Budget[]) => {
    if (!budgets.length) {
      setProcessedBudgets([])
      return
    }

    const processed = budgets.map((budget) => {
      const remaining = Math.max(0, budget.total - budget.spent)
      const category = budget.category || "default"

      return {
        ...budget,
        remaining,
        color: categoryColors[category] || categoryColors.default,
        icon: categoryIcons[category] || categoryIcons.default,
      }
    })

    setProcessedBudgets(processed)
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
      // fetchBudgets(currentUser.uid)
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
              <></>
              // <div
              //   key={budget.id || index}
              //   className="bg-gray-50 p-3 rounded-lg mb-3 flex justify-between items-center"
              // >
              //   <div className="flex items-center gap-3">
              //     <span className={`${budget.color} text-xl`}>{budget.icon}</span>
              //     <h3 className="text-md font-medium text-gray-800">{budget.title}</h3>
              //   </div>
              //   <div className="text-right">
              //     <p className="text-sm text-gray-600">${budget.spent.toFixed(2)} spent</p>
              //     <div className="relative w-32 h-2 bg-gray-300 rounded-full mt-1">
              //       <div
              //         className={`absolute h-2 rounded-full bg-opacity-70`}
              //         style={{
              //           width: `${percentage}%`,
              //           backgroundColor: budget.color.replace("text-", "").replace("-500", ""),
              //         }}
              //       ></div>
              //     </div>
              //     <p className={`text-xs ${percentage >= 100 ? "text-red-500" : "text-green-500"}`}>
              //       ${budget.remaining.toFixed(2)} left
              //     </p>
              //   </div>
              // </div>
            )
          })
        ) : (
          <div className="flex justify-center items-center h-[150px] text-gray-500">No budget data available</div>
        )}
      </div>
    </div>
  )
}
