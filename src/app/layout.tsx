"use client";

import { ReactNode } from 'react';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast'; // ✅ ADD THIS

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" /> {/* ✅ ADD THIS */}
        <div className="flex h-screen">
          {/* Only show sidebar if not on auth pages */}
          {!isAuthPage && (
            <div className="w-1/5 min-w-40 max-w-60">
              <Sidebar />
            </div>
          )}
          {/* Main content takes full width on auth pages, else 80% */}
          <div className={`${!isAuthPage ? 'flex-1' : 'w-full'} overflow-y-auto bg-gray-100`}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
