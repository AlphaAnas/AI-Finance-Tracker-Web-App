import React from 'react';
import { render } from '@testing-library/react';
import Lamp from '../../../components/effects/lamp';

// Mock React first, before any test code runs
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  
  // Create a mock setProperty function inside the mock
  const mockSetProperty = jest.fn();
  
  return {
    ...originalReact,
    // Mock useRef with inline implementation
    useRef: jest.fn().mockImplementation(() => ({
      current: {
        style: {
          setProperty: mockSetProperty
        }
      }
    })),
    // Mock useEffect with inline implementation
    useEffect: jest.fn().mockImplementation(cb => cb())
  };
});

describe('Lamp Component', () => {
  let mockAddEventListener: jest.Mock;
  let mockRemoveEventListener: jest.Mock;
  
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup window event listener mocks
    mockAddEventListener = jest.fn();
    mockRemoveEventListener = jest.fn();
    window.addEventListener = mockAddEventListener;
    window.removeEventListener = mockRemoveEventListener;
  });
  
  afterEach(() => {
    // Restore mocks after each test
    jest.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<Lamp />);
    expect(container).toBeTruthy();
  });

  it('adds pointermove event listener on mount when ref exists', () => {
    render(<Lamp />);
    
    // Event listener should be added for pointermove
    expect(mockAddEventListener).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function)
    );
  });
  
  it('removes pointermove event listener on unmount when ref exists', () => {
    // We need to capture the cleanup function from useEffect
    const oldUseEffect = React.useEffect;
    let cleanupFn: (() => void) | undefined;
    
    // Override useEffect for this test only
    (React.useEffect as jest.Mock).mockImplementationOnce((cb) => {
      cleanupFn = cb();
      return oldUseEffect;
    });
    
    render(<Lamp />);
    
    // Call the cleanup function if it exists
    if (cleanupFn) cleanupFn();
    
    // Should remove the event listener
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function)
    );
  });
  
  it('updates CSS variables on pointer move', () => {
    // Get a reference to the mock setProperty
    const reactModule = jest.requireMock('react');
    const useRefMock = reactModule.useRef as jest.Mock;
    const setPropertyMock = useRefMock().current.style.setProperty;
    
    render(<Lamp />);
    
    // Get the event handler function that was registered
    const moveHandler = mockAddEventListener.mock.calls[0][1];
    
    // Call the handler with a mock event
    moveHandler({ clientX: 100, clientY: 200 });
    
    // Verify CSS variables were set
    expect(setPropertyMock).toHaveBeenCalledWith('--x', '100px');
    expect(setPropertyMock).toHaveBeenCalledWith('--y', '200px');
  });
  
  it('does not register event listener when ref is null', () => {
    // Mock useRef to return null for this test
    const reactModule = jest.requireMock('react');
    (reactModule.useRef as jest.Mock).mockReturnValueOnce({ current: null });
    
    render(<Lamp />);
    
    // No event listener should be registered when ref is null
    expect(mockAddEventListener).not.toHaveBeenCalled();
  });
  
  it('has correct CSS classes', () => {
    const { container } = render(<Lamp />);
    
    // Check outer div
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv.className).toContain('pointer-events-none');
    expect(outerDiv.className).toContain('fixed');
    expect(outerDiv.className).toContain('inset-0');
    
    // Check inner div
    const innerDiv = outerDiv.firstChild as HTMLElement;
    expect(innerDiv.className).toContain('absolute');
    expect(innerDiv.className).toContain('rounded-full');
    expect(innerDiv.className).toContain('bg-emerald-400/20');
  });
}); 