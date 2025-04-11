'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/';

  return (
    <div className="flex">
      {!isAuthPage && <Sidebar />}
      <main className="flex-1 min-h-screen bg-gray-50">
        {children}
      </main>
    </div>
  );
} 