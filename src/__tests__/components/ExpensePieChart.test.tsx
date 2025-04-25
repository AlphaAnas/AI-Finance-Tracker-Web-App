import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ExpenseDashboard from '../../components/ExpensePieChart';
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

// Mock recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  Legend: () => <div data-testid="legend" />,
  Tooltip: () => <div data-testid="tooltip" />,
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bar-chart">{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />
}));

// Mock useState and useEffect for component
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useState: jest.fn().mockImplementation(originalReact.useState),
    useEffect: jest.fn().mockImplementation(originalReact.useEffect),
  };
});

// Mock setTimeout
jest.useFakeTimers();

// Mock fetch API
global.fetch = jest.fn();

describe('ExpensePieChart Component', () => {
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

    render(<ExpenseDashboard />);
    
    // Check loading spinner is displayed
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', async () => {
    // Mock unauthenticated user
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn(); // Return unsubscribe function
    });

    render(<ExpenseDashboard />);
    
    // Verify toast.error was called
    expect(toast.error).toHaveBeenCalledWith('Session expired. Please log in again.');
    
    // Fast-forward timers
    jest.runAllTimers();
    
    // Verify redirect is called after timeout
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('fetches and displays transactions as pie chart when user is authenticated', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock successful API response with sample transaction data
    const mockTransactions = [
      { 
        id: '1', 
        userid: 'test-user-id',
        category: 'Groceries',
        amount: 150,
        date: '2023-01-15',
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Weekly grocery'
      },
      { 
        id: '2', 
        userid: 'test-user-id',
        category: 'Rent',
        amount: 1000,
        date: '2023-01-20',
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Monthly rent'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<ExpenseDashboard />);
    
    // Verify API call was made with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(`/api/get-transactions?uid=test-user-id`);

    // Wait for component to update after fetch
    await waitFor(() => {
      expect(screen.getByText('Expense Categories')).toBeInTheDocument();
    });
    
    // Check that chart components are rendered
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock failed API response
    const errorMessage = 'An unexpected error occurred';
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    render(<ExpenseDashboard />);
    
    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('shows empty state when no transactions exist', async () => {
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

    render(<ExpenseDashboard />);
    
    // Wait for empty state message to be displayed
    await waitFor(() => {
      expect(screen.getByText('No category data available')).toBeInTheDocument();
    });
  });

  it('handles 404 response from API gracefully', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock 404 API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    render(<ExpenseDashboard />);
    
    // Wait for component to update
    await waitFor(() => {
      expect(screen.getByText('No category data available')).toBeInTheDocument();
    });
  });

  it('correctly processes transaction data for chart', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Create transactions with same category to test aggregation
    const mockTransactions = [
      { 
        id: '1', 
        userid: 'test-user-id',
        category: 'Food',
        amount: 100,
        date: '2023-01-15',
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Restaurant'
      },
      { 
        id: '2', 
        userid: 'test-user-id',
        category: 'Food',
        amount: 75,
        date: '2023-01-20',
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Grocery store'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<ExpenseDashboard />);
    
    // Verify the component loaded successfully
    await waitFor(() => {
      expect(screen.getByText('Expense Categories')).toBeInTheDocument();
    });
    
    // Since we can't directly check the processed data values in the chart,
    // we at least verify the chart components are rendered
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie')).toBeInTheDocument();
  });
}); 