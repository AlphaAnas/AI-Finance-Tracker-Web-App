import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../../components/common/Card';

describe('Card Component', () => {
  const mockProps = {
    title: 'Total Income',
    amount: '$12,345',
    percentage: '10%',
    isIncrease: true,
    icon: <div data-testid="mock-icon">💰</div>,
    borderColor: 'border-green-500'
  };

  it('renders the card with all provided props', () => {
    render(<Card {...mockProps} />);
    
    // Check that title and amount are properly displayed
    expect(screen.getByText('Total Income')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
    
    // Check that the icon is rendered
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('applies the correct border color class', () => {
    const { container } = render(<Card {...mockProps} />);
    
    // Check for the border color class on the outermost div
    const card = container.firstChild;
    expect(card).toHaveClass('border-green-500');
  });

  it('renders with different props correctly', () => {
    const differentProps = {
      ...mockProps,
      title: 'Expenses',
      amount: '$5,678',
      borderColor: 'border-red-500',
      isIncrease: false
    };
    
    const { container } = render(<Card {...differentProps} />);
    
    // Check that the new values are displayed
    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('$5,678')).toBeInTheDocument();
    
    // Check that the new border color is applied to the outermost div
    const card = container.firstChild;
    expect(card).toHaveClass('border-red-500');
  });
}); 