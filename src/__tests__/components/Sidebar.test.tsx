import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../../components/Sidebar';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Sidebar Component', () => {
  it('renders the app name', () => {
    render(<Sidebar />);
    expect(screen.getByText('MaaliMunshi')).toBeInTheDocument();
  });

  it('renders all menu items with correct links', () => {
    render(<Sidebar />);
    
    // Check each menu item is rendered with correct link
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
    
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Transactions').closest('a')).toHaveAttribute('href', '/transactions');
    
    expect(screen.getByText('Budgets')).toBeInTheDocument();
    expect(screen.getByText('Budgets').closest('a')).toHaveAttribute('href', '/budgets');
    
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Settings').closest('a')).toHaveAttribute('href', '/settings');
  });

  it('renders the back button with correct link', () => {
    render(<Sidebar />);
    
    // The back button should navigate to /login
    const backButton = screen.getByRole('button');
    expect(backButton.closest('a')).toHaveAttribute('href', '/login');
  });
}); 