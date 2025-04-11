'use client';

import { useAuth } from '@/app/context/AuthContext';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-gray-600">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 