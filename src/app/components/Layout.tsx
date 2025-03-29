import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar spans the full height */}
      <Sidebar />
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
            <span className="ml-4 bg-blue-500 text-white px-3 py-1 rounded-full">
              U {/* Replace this with USERNAME first letter */}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
