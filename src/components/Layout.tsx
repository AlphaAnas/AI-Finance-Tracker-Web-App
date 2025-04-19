"use client"

import { type ReactNode, useEffect, useState } from "react"
import { onAuthStateChanged, type User, signOut } from "firebase/auth"
import { auth } from "@/app/firebase" // adjust path if needed
// import Sidebar from "../Sidebar"
import { useRouter } from "next/navigation"
import { FaCog, FaSignOutAlt, FaBell } from "react-icons/fa"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { toast } from "react-hot-toast"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log("Setting up auth listener in Layout component")
    // onAuthStateChanged is a Firebase function that listens for changes in the user's authentication state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser ? currentUser.email : "No user")
      setUser(currentUser)
      setLoading(false)

      // If no user is authenticated and we're done loading, redirect to login
      if (!currentUser && !loading) {
        console.log("No authenticated user, redirecting to login")
        router.push("/login")
      }
    })

    return () => unsubscribe() // Cleanup listener
  }, [loading, router])

  const getInitial = () => {
    if (!user) return "U"
    return user.displayName?.charAt(0) || user.email?.charAt(0) || "U"
  }

  const getUsername = () => {
    if (!user) return "Guest"
    return user.displayName || user.email?.split("@")[0] || "User"
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error) {
      toast.error("Failed to log out")
      console.error("Logout error:", error)
    }
  }

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-600">Dashboard</h1>
            <button className="text-gray-600 hover:text-gray-800">
              <FaBell className="w-5 h-5" />
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-gray-700">{getUsername()}</span>
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center uppercase">
                  {getInitial()}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-black text-white border border-gray-800 rounded-md shadow-lg">
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800 text-white">
                  <FaCog className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800 text-red-400" onClick={handleLogout}>
                <FaSignOutAlt className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}