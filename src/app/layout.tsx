import { ReactNode } from 'react';
import './globals.css'; // Your global CSS
import Sidebar from './components/Sidebar';

export const metadata = {
  title: 'AI Finance Tracker',
  description: 'Track your finances with AI assistance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          {/* Sidebar spans 20% of the width */}
          <div className="w-1/5 min-w-40 max-w-60">
            <Sidebar />
          </div>
          {/* Main content takes the remaining 80% */}
          <div className="flex-1 overflow-y-auto bg-gray-100">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}