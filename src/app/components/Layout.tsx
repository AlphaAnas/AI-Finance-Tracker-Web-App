import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
// Import your navigation component here
// import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar/>
      <main className="container mx-auto py-4">
        {children}
      </main>
    </div>
  );
}