import { ReactNode } from 'react';
<<<<<<< Updated upstream
import './globals.css'; // Your global CSS
import DashboardLayout from './components/DashboardLayout';
=======
// import { Toaster } from "@/app/components/ui/toaster";
// import { Toaster as Sonner } from "@/app/components/ui/sonner";
// import { TooltipProvider } from "@/app/components/ui/tooltip";
import './globals.css';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        <DashboardLayout>
          {children}
        </DashboardLayout>
=======
        {/* <TooltipProvider> */}
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          {/* <Toaster />
          <Sonner />
        </TooltipProvider> */}
>>>>>>> Stashed changes
      </body>
    </html>
  );
}