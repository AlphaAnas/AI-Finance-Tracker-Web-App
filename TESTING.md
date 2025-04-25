# Testing Guide for AI Finance Tracker Web App

This guide outlines how to run and write tests for the Finance Tracker Web App.

## Setup

The project uses Jest and React Testing Library for testing. The following dependencies have been set up:

- Jest: JavaScript testing framework
- @testing-library/react: React component testing utilities
- @testing-library/jest-dom: Custom Jest matchers for DOM testing
- jest-environment-jsdom: DOM environment for Jest

## Running Tests

To run tests, use the following npm scripts:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are organized in the `src/__tests__/` directory, mirroring the structure of the components they test:

```
src/
├── __tests__/
│   └── components/
│       ├── Progress.test.tsx
│       ├── Sidebar.test.tsx
│       └── Layout.test.tsx
├── components/
    ├── Progress.tsx
    ├── Sidebar.tsx
    └── Layout.tsx
```

## Writing Tests

### Component Tests

When writing tests for React components:

1. Import the component and testing utilities:
   ```tsx
   import { render, screen } from '@testing-library/react';
   import Component from '../../components/Component';
   ```

2. Use the `describe` block to group related tests:
   ```tsx
   describe('Component Name', () => {
     // tests go here
   });
   ```

3. Test individual behaviors with `it` or `test`:
   ```tsx
   it('renders correctly', () => {
     render(<Component />);
     expect(screen.getByText('Expected Text')).toBeInTheDocument();
   });
   ```

### Mocking Dependencies

For components with external dependencies (like Firebase or Next.js routing), use Jest's mocking capabilities:

```tsx
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
  // other firebase functions you need
}));
```

### Testing User Interactions

Use `fireEvent` or `userEvent` from Testing Library to simulate user interactions:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';

test('button click triggers action', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  fireEvent.click(screen.getByText('Click Me'));
  expect(handleClick).toHaveBeenCalled();
});
```

## Best Practices

1. Test behavior, not implementation details
2. Focus on user interaction and what users see
3. Use accessible queries (`getByRole`, `getByLabelText`, etc.) when possible
4. Mock only what's necessary
5. Keep tests simple and focused
6. Use realistic test data
7. Don't test third-party libraries (they should have their own tests)

## Example Test

```tsx
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
});
``` 