import React from 'react';
import { render, screen } from '@testing-library/react';
import { LampContainer } from '../../../components/ui/lamp';

// Create a simpler mock that just preserves the DOM behavior
jest.mock('framer-motion', () => {
  return {
    __esModule: true,
    motion: new Proxy(
      {},
      {
        get: function(target, prop) {
          if (prop === 'div') {
            // Return a simple functional component that renders a div
            return function MotionDiv(props) {
              const { children, ...restProps } = props;
              // Filter out framer-motion specific props
              const {
                initial, animate, exit, transition, whileHover,
                whileTap, whileFocus, whileDrag, whileInView,
                variants, layoutId, layout, ...validProps
              } = restProps;
              
              return <div data-testid="motion-div" {...validProps}>{children}</div>;
            };
          }
          return undefined;
        }
      }
    ),
  };
});

describe('LampContainer Component', () => {
  it('renders correctly with children', () => {
    render(
      <LampContainer>
        <div data-testid="child-element">Test Content</div>
      </LampContainer>
    );
    
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default classes to container', () => {
    render(<LampContainer>Content</LampContainer>);
    
    const container = screen.getByText('Content').closest('div[class*="relative flex min-h-screen"]');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('relative');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
    expect(container).toHaveClass('overflow-hidden');
    expect(container).toHaveClass('bg-slate-950');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('rounded-md');
    expect(container).toHaveClass('z-0');
  });

  it('applies custom className when provided', () => {
    render(
      <LampContainer className="custom-class">
        <div>Content</div>
      </LampContainer>
    );
    
    const container = screen.getByText('Content').closest('div[class*="relative flex min-h-screen"]');
    expect(container).toHaveClass('custom-class');
  });

  it('renders motion elements for animation', () => {
    render(<LampContainer>Content</LampContainer>);
    
    // Check if motion.div elements are rendered (mocked as divs with data-testid="motion-div")
    const motionDivs = screen.getAllByTestId('motion-div');
    expect(motionDivs.length).toBeGreaterThanOrEqual(4); // At least 4 motion divs expected
  });

  it('positions children at the bottom of the lamp effect', () => {
    render(
      <LampContainer>
        <div data-testid="test-content">Child Content</div>
      </LampContainer>
    );
    
    // Find the content wrapper div that contains the children
    const contentWrapper = screen.getByTestId('test-content').closest('div[class*="relative z-50"]');
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toHaveClass('relative');
    expect(contentWrapper).toHaveClass('z-50');
    expect(contentWrapper).toHaveClass('flex');
    expect(contentWrapper).toHaveClass('-translate-y-80');
  });

  it('applies blur and gradient effects', () => {
    render(<LampContainer>Content</LampContainer>);
    
    // Check for gradient and blur elements
    const blurElements = screen.getAllByTestId('motion-div').filter(el => 
      el.className.includes('blur') || 
      el.className.includes('backdrop-blur')
    );
    
    expect(blurElements.length).toBeGreaterThan(0);
  });
}); 