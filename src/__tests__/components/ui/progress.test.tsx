import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Progress } from '../../../components/ui/progress';

describe('Progress Component', () => {
  it('renders correctly', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Progress value={50} data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    
    expect(progress).toHaveClass('relative');
    expect(progress).toHaveClass('w-full');
    expect(progress).toHaveClass('overflow-hidden');
    expect(progress).toHaveClass('rounded-full');
    expect(progress).toHaveClass('bg-secondary');
    expect(progress).toHaveClass('h-4');
  });

  it('applies custom class name', () => {
    render(<Progress value={50} className="custom-class" data-testid="progress" />);
    const progress = screen.getByTestId('progress');
    
    expect(progress).toHaveClass('custom-class');
  });

  it('transforms indicator based on value prop', () => {
    render(<Progress value={50} data-testid="progress" />);
    const indicator = screen.getByTestId('progress').querySelector('div');
    
    expect(indicator).toHaveClass('h-full');
    expect(indicator).toHaveClass('w-full');
    expect(indicator).toHaveClass('flex-1');
    expect(indicator).toHaveClass('bg-primary');
    expect(indicator).toHaveClass('transition-all');
    
    // Extract the numeric value from the transform style
    const style = indicator?.getAttribute('style');
    const match = style?.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
    if (match && match[1]) {
      const translateValue = parseFloat(match[1]);
      // For a 50% value, the translateX should be around -50%
      expect(translateValue).toBeCloseTo(-50, 1);
    } else {
      fail('Could not extract transform value from style');
    }
  });

  it('sets the correct aria attributes', () => {
    render(<Progress value={50} />);
    const progressbar = screen.getByRole('progressbar');
    
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
  });

  it('handles zero value correctly', () => {
    render(<Progress value={0} data-testid="progress" />);
    const indicator = screen.getByTestId('progress').querySelector('div');
    
    // Extract the numeric value from the transform style
    const style = indicator?.getAttribute('style');
    const match = style?.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
    if (match && match[1]) {
      const translateValue = parseFloat(match[1]);
      // For a 0% value, the translateX should be around -100%
      expect(translateValue).toBeCloseTo(-100, 1);
    } else {
      fail('Could not extract transform value from style');
    }
  });

  it('handles 100% value correctly', () => {
    render(<Progress value={100} data-testid="progress" />);
    const indicator = screen.getByTestId('progress').querySelector('div');
    
    // Extract the numeric value from the transform style
    const style = indicator?.getAttribute('style');
    const match = style?.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
    if (match && match[1]) {
      const translateValue = parseFloat(match[1]);
      // For a 100% value, the translateX should be around 0%
      expect(translateValue).toBeCloseTo(0, 1);
    } else {
      fail('Could not extract transform value from style');
    }
  });

  it('handles undefined value correctly', () => {
    render(<Progress data-testid="progress" />);
    const indicator = screen.getByTestId('progress').querySelector('div');
    
    // Extract the numeric value from the transform style
    const style = indicator?.getAttribute('style');
    const match = style?.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
    if (match && match[1]) {
      const translateValue = parseFloat(match[1]);
      // For undefined value, the translateX should be around -100%
      expect(translateValue).toBeCloseTo(-100, 1);
    } else {
      fail('Could not extract transform value from style');
    }
    
    // Aria value should be undefined
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).not.toHaveAttribute('aria-valuenow');
  });

  it('forwards ref to progress element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes other props to progress element', () => {
    render(<Progress value={50} id="test-progress" data-testid="progress-bar" />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('id', 'test-progress');
    expect(progress).toHaveAttribute('data-testid', 'progress-bar');
  });
}); 