
import React from 'react';
import Header from '@/app/components/Header';
import Dashboard from '@/app/components/Dashboard'

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
