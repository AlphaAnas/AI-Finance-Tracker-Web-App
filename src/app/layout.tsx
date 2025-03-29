import { ReactNode } from 'react';
import './globals.css'; // Your global CSS

export const metadata = {
  title: 'AI Finance Tracker',
  description: 'Track your finances with AI assistance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
