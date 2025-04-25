import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from '../../../components/ui/input';

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('uses text as default type', () => {
    // In React, inputs without a specified type default to "text"
    // at the HTML level
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input') as HTMLInputElement;
    // Using the standard DOM property check instead of attribute
    expect(input.type).toBe('text');
  });

  it('applies custom type', () => {
    render(<Input type="email" data-testid="email-input" />);
    const input = screen.getByTestId('email-input') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('passes HTML attributes to input element', () => {
    render(<Input placeholder="Enter text" required disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it('handles value change', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.type(input, 'test input');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles focus and blur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
}); 