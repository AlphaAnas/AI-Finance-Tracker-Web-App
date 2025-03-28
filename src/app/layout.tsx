import { ReactNode } from 'react';
import './globals.css'; // Your global CSS
import DashboardLayout from './components/DashboardLayout';

export const metadata = {
  title: 'AI Finance Tracker',
  description: 'Track your finances with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}