"use client";

import { ReactNode } from 'react';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <div className="flex h-screen">
          {!isAuthPage && (
            <div className="w-1/5 min-w-40 max-w-60">
              <Sidebar />
            </div>
          )}
          <div className={`${!isAuthPage ? 'flex-1' : 'w-full'} overflow-y-auto bg-gray-100`}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
