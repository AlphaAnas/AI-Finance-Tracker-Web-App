import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from '../../components/Progress';

describe('Progress Component', () => {
  it('renders with default props', () => {
    render(<Progress value={50} />);
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<Progress value={50} className="custom-class" />);
    const progressElement = screen.getByRole('progressbar');
    expect(progressElement).toHaveClass('custom-class');
  });

  it('renders with custom indicatorClassName', () => {
    render(<Progress value={50} indicatorClassName="custom-indicator" />);
    const progressElement = screen.getByRole('progressbar');
    // The indicator is a child of the progress element
    expect(progressElement.firstChild).toHaveClass('custom-indicator');
  });

  it('renders with correct value', () => {
    render(<Progress value={75} />);
    const progressElement = screen.getByRole('progressbar');
    const indicator = progressElement.firstChild as HTMLElement;
    expect(indicator).toHaveStyle('transform: translateX(-25%)');
  });
}); 