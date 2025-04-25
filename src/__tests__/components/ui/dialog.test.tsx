import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '../../../components/ui/dialog';

// Mock the portal implementation to make testing easier
jest.mock('@radix-ui/react-dialog', () => {
  const actual = jest.requireActual('@radix-ui/react-dialog');
  return {
    ...actual,
    // Mock Portal to render children directly without actual portal behavior
    Portal: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-portal">{children}</div>,
  };
});

describe('Dialog Components', () => {
  it('renders a closed dialog by default', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <div>Dialog Content</div>
        </DialogContent>
      </Dialog>
    );

    // Trigger should be visible
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    
    // Content should not be in the document when closed
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
  });

  it('opens dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <div>Dialog Content</div>
        </DialogContent>
      </Dialog>
    );

    // Click the trigger button to open the dialog
    await userEvent.click(screen.getByTestId('dialog-trigger'));
    
    // Content should now be in the document
    await waitFor(() => {
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
    });
  });

  it('renders a complete dialog with all subcomponents', async () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a dialog description</DialogDescription>
          </DialogHeader>
          <div>Main Content</div>
          <DialogFooter>
            <DialogClose data-testid="dialog-close-button">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog
    await userEvent.click(screen.getByTestId('dialog-trigger'));
    
    // Verify all dialog components are rendered
    await waitFor(() => {
      expect(screen.getByText('Dialog Title')).toBeInTheDocument();
      expect(screen.getByText('This is a dialog description')).toBeInTheDocument();
      expect(screen.getByText('Main Content')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-close-button')).toBeInTheDocument();
    });
  });

  describe('DialogContent', () => {
    it('applies default styles', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent data-testid="dialog-content">
            <DialogTitle>Dialog Title</DialogTitle>
            Content
          </DialogContent>
        </Dialog>
      );
      
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveClass('fixed');
      expect(content).toHaveClass('left-[50%]');
      expect(content).toHaveClass('top-[50%]');
      expect(content).toHaveClass('z-50');
      expect(content).toHaveClass('translate-x-[-50%]');
      expect(content).toHaveClass('translate-y-[-50%]');
    });

    it('includes a close button', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            Content
          </DialogContent>
        </Dialog>
      );
      
      // Find the close button using its SVG icon
      const closeButton = screen.getByRole('button', { 
        name: /close/i 
      });
      expect(closeButton).toBeInTheDocument();
    });

    it('applies custom className', async () => {
      render(
        <Dialog defaultOpen>
          <DialogContent className="custom-class" data-testid="dialog-content">
            <DialogTitle>Dialog Title</DialogTitle>
            Content
          </DialogContent>
        </Dialog>
      );
      
      const content = screen.getByTestId('dialog-content');
      expect(content).toHaveClass('custom-class');
    });
  });

  describe('DialogHeader', () => {
    it('applies default styles', () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogHeader data-testid="dialog-header">Header Content</DialogHeader>
          </DialogContent>
        </Dialog>
      );
      
      const header = screen.getByTestId('dialog-header');
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
      expect(header).toHaveClass('space-y-1.5');
      expect(header).toHaveClass('text-center');
      expect(header).toHaveClass('sm:text-left');
    });
  });

  describe('DialogFooter', () => {
    it('applies default styles', () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogFooter data-testid="dialog-footer">Footer Content</DialogFooter>
          </DialogContent>
        </Dialog>
      );
      
      const footer = screen.getByTestId('dialog-footer');
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('flex-col-reverse');
      expect(footer).toHaveClass('sm:flex-row');
      expect(footer).toHaveClass('sm:justify-end');
    });
  });

  describe('DialogTitle and DialogDescription', () => {
    it('applies correct styles when used within Dialog', () => {
      render(
        <Dialog defaultOpen>
          <DialogContent>
            <DialogTitle data-testid="dialog-title">Dialog Title</DialogTitle>
            <DialogDescription data-testid="dialog-desc">Description</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      
      const title = screen.getByTestId('dialog-title');
      expect(title).toHaveClass('text-lg');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('leading-none');
      expect(title).toHaveClass('tracking-tight');
      
      const desc = screen.getByTestId('dialog-desc');
      expect(desc).toHaveClass('text-sm');
      expect(desc).toHaveClass('text-muted-foreground');
    });
  });
}); 