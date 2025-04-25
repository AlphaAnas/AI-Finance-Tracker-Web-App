import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BudgetOverview from '../../components/BudgetOverview';
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
  }
}));

// Mock the react-icons
jest.mock('react-icons/fa', () => ({
  FaShoppingCart: () => <div data-testid="icon-shopping-cart" />,
  FaHome: () => <div data-testid="icon-home" />,
  FaCar: () => <div data-testid="icon-car" />,
  FaGamepad: () => <div data-testid="icon-gamepad" />,
  FaPlane: () => <div data-testid="icon-plane" />,
  FaUtensils: () => <div data-testid="icon-utensils" />
}));

// Mock fetch API
global.fetch = jest.fn();

describe('BudgetOverview Component', () => {
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

    render(<BudgetOverview />);
    
    // Check for loading spinner
    expect(screen.getByText('Budget Overview')).toBeInTheDocument();
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('fetches and displays budgets when user is authenticated', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock successful API responses
    const mockBudgets = [
      { 
        id: '1', 
        name: 'Groceries', 
        allocated: 500, 
        spent: 200, 
        category: 'Groceries',
        userId: 'test-user-id' 
      },
      { 
        id: '2', 
        name: 'Housing', 
        allocated: 1000, 
        spent: 900, 
        category: 'Rent',
        userId: 'test-user-id' 
      }
    ];

    const mockTransactions = [
      { 
        id: '1', 
        category: 'Groceries', 
        amount: 200, 
        InvoiceType: 'outgoing' 
      },
      { 
        id: '2', 
        category: 'Rent', 
        amount: 900, 
        InvoiceType: 'outgoing' 
      }
    ];

    // Mock the fetch calls for budgets and transactions
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBudgets)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTransactions)
      }));

    render(<BudgetOverview />);
    
    // Verify API calls were made with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(`/api/get-budgets?uid=test-user-id`);
    expect(global.fetch).toHaveBeenCalledWith(`/api/get-transactions?uid=test-user-id`);

    // Wait for component to update after fetch
    await waitFor(() => {
      // Check that budget items are rendered
      expect(screen.getByText('Groceries')).toBeInTheDocument();
      expect(screen.getByText('Housing')).toBeInTheDocument();
    });
    
    // Check for spending amounts
    expect(screen.getByText('Rs.200.00 spent')).toBeInTheDocument();
    expect(screen.getByText('Rs.900.00 spent')).toBeInTheDocument();
    
    // Check for remaining amounts
    expect(screen.getByText('Rs.300.00 left')).toBeInTheDocument();
    expect(screen.getByText('Rs.100.00 left')).toBeInTheDocument();
  });

  it('shows empty state when no budgets are available', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock empty API responses
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      }));

    render(<BudgetOverview />);
    
    // Wait for empty state message to be displayed
    await waitFor(() => {
      expect(screen.getByText('No budget data available')).toBeInTheDocument();
    });
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
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    render(<BudgetOverview />);
    
    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('handles 404 response for budgets gracefully', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock 404 API responses
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({
        ok: false,
        status: 404
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      }));

    render(<BudgetOverview />);
    
    // Wait for empty state message
    await waitFor(() => {
      expect(screen.getByText('No budget data available')).toBeInTheDocument();
    });
  });

  it('calculates remaining budget correctly', async () => {
    // Mock authenticated user
    const mockUser = { uid: 'test-user-id' };
    
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    // Mock budget with overspending
    const mockBudgets = [
      { 
        id: '1', 
        name: 'Entertainment', 
        allocated: 200, 
        spent: 0, // Will be calculated from transactions
        category: 'Entertainment',
        userId: 'test-user-id' 
      }
    ];

    // Mock transactions that exceed budget
    const mockTransactions = [
      { 
        id: '1', 
        category: 'Entertainment', 
        amount: 250, 
        InvoiceType: 'outgoing' 
      }
    ];

    // Mock the fetch calls
    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBudgets)
      }))
      .mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTransactions)
      }));

    render(<BudgetOverview />);
    
    // Wait for component to update
    await waitFor(() => {
      expect(screen.getByText('Entertainment')).toBeInTheDocument();
      expect(screen.getByText('Rs.250.00 spent')).toBeInTheDocument();
      // Remaining should be 0 when overspent (not negative)
      expect(screen.getByText('Rs.0.00 left')).toBeInTheDocument();
    });
  });
}); 