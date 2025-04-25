import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Label } from '../../../components/ui/label';

describe('Label Component', () => {
  it('renders correctly with text content', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('text-sm');
    expect(label).toHaveClass('font-medium');
    expect(label).toHaveClass('leading-none');
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed');
    expect(label).toHaveClass('peer-disabled:opacity-70');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-class');
  });

  it('renders with "for" attribute to associate with form element', () => {
    render(
      <>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" type="text" />
      </>
    );
    
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('forwards ref to label element', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Test Label</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('passes additional props to label element', () => {
    render(<Label id="test-label" data-testid="label">Test Label</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('id', 'test-label');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Label onClick={handleClick}>Clickable Label</Label>);
    
    const label = screen.getByText('Clickable Label');
    await userEvent.click(label);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('correctly associates with form controls for click interaction', async () => {
    const handleChange = jest.fn();
    
    render(
      <>
        <Label htmlFor="test-checkbox">Test Checkbox</Label>
        <input 
          id="test-checkbox" 
          type="checkbox" 
          onChange={handleChange}
        />
      </>
    );
    
    // Clicking the label should check the associated checkbox
    await userEvent.click(screen.getByText('Test Checkbox'));
    
    // Verify the checkbox onChange was triggered via label click
    expect(handleChange).toHaveBeenCalled();
  });
}); 