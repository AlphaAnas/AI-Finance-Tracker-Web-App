import { ReactNode } from 'react';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import ClientLayout from '@/app/client-layout';

export const metadata = {
  title: 'Expense Tracker',
  description: 'Track your expenses and manage your finances',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Toaster position="top-center" />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}