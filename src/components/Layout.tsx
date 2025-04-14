'use client';

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/firebase"; // adjust path if needed
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("Setting up auth listener in Layout component");
    // onAuthStateChanged is a Firebase function that listens for changes in the user's authentication state.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser ? currentUser.email : "No user");
      setUser(currentUser);
      setLoading(false);
      
      // If no user is authenticated and we're done loading, redirect to login
      if (!currentUser && !loading) {
        console.log("No authenticated user, redirecting to login");
        router.push('/login');
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [loading, router]);

  const getInitial = () => {
    if (!user) return "U";
    return user.displayName?.charAt(0) || user.email?.charAt(0) || "U";
  };

  const getUsername = () => {
    if (!user) return "Guest";
    return user.displayName || user.email?.split('@')[0] || "User";
  };

  // Show loading state while checking authentication
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="flex h-screen">
 
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-600">Dashboard</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-2 py-1 mr-4"
            />
            <span className="text-gray-600">🔔</span>
            <div className="ml-4 flex items-center">
              <span className="mr-2 text-gray-700">{getUsername()}</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full uppercase">
                {getInitial()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
