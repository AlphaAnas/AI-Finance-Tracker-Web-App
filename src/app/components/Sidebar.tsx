"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/statistics', label: 'Statistics', icon: '📈' },
  { href: '/transactions', label: 'Transactions', icon: '💸' },
  { href: '/budgets', label: 'Budget', icon: '📋' },
  { href: '/analysis', label: 'Analysis', icon: '🔍' },
];

const accountItems = [
  { href: '/account', label: 'My Account', icon: '👤' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen p-4 fixed left-0 top-0">
      <div className="mb-8">
        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          Logo Here
        </div>
      </div>
      <nav>
        <h3 className="text-sm font-semibold text-gray-500 mb-2">GENERAL PREFERENCES</h3>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-md",
                  pathname === item.href 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="text-sm font-semibold text-gray-500 mt-6 mb-2">OTHER PREFERENCES</h3>
        <ul>
          {accountItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-md",
                  pathname === item.href 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;