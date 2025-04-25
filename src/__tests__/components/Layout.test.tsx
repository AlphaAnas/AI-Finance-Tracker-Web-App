import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
  auth: {},
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/app/firebase', () => ({
  auth: {},
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock dropdown components
jest.mock('@/components/ui/dropdown-menu', () => {
  return {
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-menu">{children}</div>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dropdown-content">{children}</div>,
    DropdownMenuItem: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
      <button data-testid="dropdown-item" onClick={onClick}>
        {children}
      </button>
    ),
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <button data-testid="dropdown-trigger">{children}</button>,
  };
});

describe('Layout Component', () => {
  const mockPush = jest.fn();
  const mockRouter = { push: mockPush };
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders loading spinner initially', () => {
    // Mock that authentication state is still loading
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      // Don't call the callback immediately to simulate loading
      return jest.fn(); // Return unsubscribe function
    });

    const { container } = render(<Layout>Test Content</Layout>);
    
    // Check if loading spinner is displayed - using className
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    // Mock authenticated user
    const mockUser = {
      email: 'test@example.com',
      displayName: null,
    };

    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    render(<Layout>Test Content</Layout>);
    
    // Check if children content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    // Check if username is derived from email
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('redirects to login page when user is not authenticated', async () => {
    // Mock unauthenticated user
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn(); // Return unsubscribe function
    });

    render(<Layout>Test Content</Layout>);
    
    // Check if router.push was called with '/login'
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('handles logout correctly', async () => {
    // Mock authenticated user
    const mockUser = {
      email: 'test@example.com',
      displayName: null,
    };

    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn(); // Return unsubscribe function
    });

    (signOut as jest.Mock).mockResolvedValue(undefined);

    render(<Layout>Test Content</Layout>);
    
    // Open dropdown and click logout
    fireEvent.click(screen.getByTestId('dropdown-trigger'));
    
    // Find the logout button and click it
    const logoutButtons = screen.getAllByTestId('dropdown-item');
    const logoutButton = logoutButtons.find(button => button.textContent?.includes('Logout'));
    if (logoutButton) {
      fireEvent.click(logoutButton);
    }
    
    // Verify signOut was called
    expect(signOut).toHaveBeenCalled();
    
    // Wait for async operations
    await waitFor(() => {
      // Check if toast.success was called
      expect(toast.success).toHaveBeenCalledWith('Logged out successfully');
      // Check if router.push was called with '/login'
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
}); 