import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecentTransactions from '../../components/RecentTransactions';
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
  redirect: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    dismiss: jest.fn()
  },
  Toaster: jest.fn(() => <div data-testid="toast-container" />)
}));

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaCheckCircle: () => <div data-testid="check-circle-icon" />
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  );
});

// Mock setTimeout
jest.useFakeTimers();

// Mock fetch API
global.fetch = jest.fn();

describe('RecentTransactions Component', () => {
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

    render(<RecentTransactions />);
    
    // Check that the component renders its header while loading
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    expect(screen.getByText('View all →')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', async () => {
    // Mock unauthenticated user
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn(); // Return unsubscribe function
    });

    render(<RecentTransactions />);
    
    // Verify toast.error was called
    expect(toast.error).toHaveBeenCalledWith('Session expired. Please log in again.');
    
    // Fast-forward timers
    jest.runAllTimers();
    
    // Verify redirect is called after timeout
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('fetches and displays transactions when user is authenticated', async () => {
    // Get current date for testing relative time
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 6);
    
    // Format dates to ISO string (YYYY-MM-DD)
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const lastWeekStr = lastWeek.toISOString().split('T')[0];
    
    // Mock authenticated user
    const mockUser = { 
      uid: 'test-user-id',
      displayName: 'Test User',
      email: 'test@example.com'
    };
    
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
        date: todayStr,
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Weekly grocery'
      },
      { 
        id: '2', 
        userid: 'test-user-id',
        category: 'Salary',
        amount: 5000,
        date: yesterdayStr,
        account: 'Main',
        InvoiceType: 'incoming',
        description: 'Monthly salary'
      },
      { 
        id: '3', 
        userid: 'test-user-id',
        category: 'Entertainment',
        amount: 50,
        date: lastWeekStr,
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Movie tickets'
      },
      { 
        id: '4', 
        userid: 'test-user-id',
        category: 'Dining',
        amount: 85,
        date: lastWeekStr,
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Restaurant dinner'
      },
      { 
        id: '5', 
        userid: 'test-user-id',
        category: 'Transport',
        amount: 30,
        date: lastWeekStr,
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Uber ride'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<RecentTransactions />);
    
    // Verify API call was made with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(`/api/get-transactions?uid=test-user-id`);

    // Wait for component to update after fetch
    await waitFor(() => {
      // Check that at least one category is rendered
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });
    
    // Check amount formatting
    await waitFor(() => {
      expect(screen.getByText('-Rs.150.00')).toBeInTheDocument();
    });
    
    // Check for the "more transactions" text since we have 5 transactions but only show 4
    await waitFor(() => {
      expect(screen.getByText('1 more transactions...')).toBeInTheDocument();
    });
  });

  it('shows all transactions when there are fewer than 5', async () => {
    // Mock authenticated user
    const mockUser = { 
      uid: 'test-user-id',
      displayName: 'Test User',
      email: 'test@example.com'
    };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock API response with only 3 transactions
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
        category: 'Salary',
        amount: 5000,
        date: '2023-01-14',
        account: 'Main',
        InvoiceType: 'incoming',
        description: 'Monthly salary'
      },
      { 
        id: '3', 
        userid: 'test-user-id',
        category: 'Entertainment',
        amount: 50,
        date: '2023-01-10',
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'Movie tickets'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<RecentTransactions />);
    
    // Wait for component to update after fetch
    await waitFor(() => {
      // Check that all categories are rendered
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });
    
    // The "more transactions" text should not be present
    expect(screen.queryByText(/more transactions/)).not.toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Mock authenticated user
    const mockUser = { 
      uid: 'test-user-id',
      displayName: 'Test User',
      email: 'test@example.com'
    };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock failed API response
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch transactions'));

    render(<RecentTransactions />);
    
    // Component should still render its basic structure even with an error
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
  });

  it('truncates long descriptions', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Create transaction with very long description
    const mockTransactions = [
      { 
        id: '1', 
        userid: 'test-user-id',
        category: 'Groceries',
        amount: 150,
        date: '2023-01-15',
        account: 'Main',
        InvoiceType: 'outgoing',
        description: 'This is a very long description that should be truncated in the UI component'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<RecentTransactions />);
    
    // Wait for component to update
    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });
    
    // The description should be truncated with "..." at the end - exactly 20 characters plus "..."
    await waitFor(() => {
      expect(screen.getByText('This is a very long ...')).toBeInTheDocument();
    });
  });

  it('shows "No description" when description is missing', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Create transaction with no description
    const mockTransactions = [
      { 
        id: '1', 
        userid: 'test-user-id',
        category: 'Groceries',
        amount: 150,
        date: '2023-01-15',
        account: 'Main',
        InvoiceType: 'outgoing',
        description: ''
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions
    });

    render(<RecentTransactions />);
    
    // Wait for component to update
    await waitFor(() => {
      expect(screen.getByText('Groceries')).toBeInTheDocument();
    });
    
    // Should show "No description" for empty description
    await waitFor(() => {
      expect(screen.getByText('No description')).toBeInTheDocument();
    });
  });
}); 