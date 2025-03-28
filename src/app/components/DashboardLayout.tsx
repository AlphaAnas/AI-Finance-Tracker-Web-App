import React, { ReactNode } from 'react';
import Sidebar from '@/app/components/Sidebar'; 

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />  {/*Display a sidebar on every page */}
      <div className="ml-64 flex-1 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;