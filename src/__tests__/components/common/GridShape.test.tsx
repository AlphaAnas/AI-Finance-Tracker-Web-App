import React from 'react';
import { render } from '@testing-library/react';
import GridShape from '../../../components/common/GridShape';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        data-testid="next-image" 
        {...props} 
      />
    );
  },
}));

describe('GridShape Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<GridShape />);
    expect(container).toBeTruthy();
  });

  it('renders two grid containers', () => {
    const { container } = render(<GridShape />);
    // Check that two containers are rendered
    const divContainers = container.querySelectorAll('div');
    // The component should have 3 divs: 1 wrapper (Fragment doesn't create a div) and 2 container divs
    expect(divContainers.length).toBe(2);
  });

  it('renders two images with correct attributes', () => {
    const { getAllByTestId } = render(<GridShape />);
    
    // Check that two images are rendered
    const images = getAllByTestId('next-image');
    expect(images).toHaveLength(2);
    
    // Check image attributes
    images.forEach(image => {
      expect(image).toHaveAttribute('src', '/images/shape/grid-01.svg');
      expect(image).toHaveAttribute('alt', 'grid');
      expect(image).toHaveAttribute('width', '540');
      expect(image).toHaveAttribute('height', '254');
    });
  });

  it('has containers with correct CSS classes', () => {
    const { container } = render(<GridShape />);
    
    const divContainers = container.querySelectorAll('div');
    
    // First container should have appropriate classes
    expect(divContainers[0].className).toContain('absolute');
    expect(divContainers[0].className).toContain('right-0');
    expect(divContainers[0].className).toContain('top-0');
    
    // Second container should have appropriate classes
    expect(divContainers[1].className).toContain('absolute');
    expect(divContainers[1].className).toContain('bottom-0');
    expect(divContainers[1].className).toContain('left-0');
    expect(divContainers[1].className).toContain('rotate-180');
  });
}); 