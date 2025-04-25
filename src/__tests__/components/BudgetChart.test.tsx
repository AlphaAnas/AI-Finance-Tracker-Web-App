import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BudgetChart from '../../components/BudgetChart';
import { onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Mock console methods to silence logs during tests
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Mock dependencies
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  auth: {}
}));

jest.mock('@/app/firebase', () => ({
  auth: {}
}));

// Mock the redirect since it's a Server Component API
jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn(),
    dismiss: jest.fn()
  }
}));

// Mock setTimeout
jest.useFakeTimers();

// Mock recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />
}));

// Mock fetch API
global.fetch = jest.fn();

describe('BudgetChart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Silence console logs for cleaner test output
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    // Restore console methods after each test
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  it('renders loading state initially', () => {
    // Mock auth to not immediately call the callback
    (onAuthStateChanged as jest.Mock).mockImplementation(() => {
      return jest.fn(); // Return unsubscribe function
    });

    render(<BudgetChart />);
    
    // Check loading spinner is displayed
    const spinner = screen.getByText('Monthly Spending');
    expect(spinner).toBeInTheDocument();
    
    // Find spinner by class instead of role
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', async () => {
    // Mock unauthenticated user
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn(); // Return unsubscribe function
    });

    render(<BudgetChart />);
    
    // Verify toast.error was called
    expect(toast.error).toHaveBeenCalledWith('Session expired. Please log in again.');
    
    // Fast-forward timers
    jest.runAllTimers();
    
    // Verify redirect is called after timeout
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('fetches and displays transactions when user is authenticated', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock successful API response with sample transaction data
    const mockTransactions = [
      { id: '1', amount: 100, date: '2023-01-15', userId: 'test-user-id' },
      { id: '2', amount: 200, date: '2023-02-20', userId: 'test-user-id' },
      { id: '3', amount: 150, date: '2023-03-10', userId: 'test-user-id' }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<BudgetChart />);
    
    // Verify API call was made with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(`/api/get-transactions?uid=test-user-id`);

    // Wait for component to update after fetch
    await waitFor(() => {
      // Check that loading state is no longer present
      const loadingSpinner = document.querySelector('.animate-spin');
      expect(loadingSpinner).not.toBeInTheDocument();
    });
    
    // Mocked chart components should be in the document
    expect(screen.queryByTestId('responsive-container')).toBeInTheDocument();
  });

  it('shows error message when API call fails', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock failed API response
    const errorMessage = 'Failed to fetch transactions';
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: errorMessage })
    });

    render(<BudgetChart />);
    
    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('shows "No transaction data available" when no data', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock empty API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<BudgetChart />);
    
    // Wait for empty state message to be displayed
    await waitFor(() => {
      expect(screen.getByText('No transaction data available')).toBeInTheDocument();
    });
  });
}); 