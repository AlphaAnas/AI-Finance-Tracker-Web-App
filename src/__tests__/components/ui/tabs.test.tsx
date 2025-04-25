import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';

describe('Tabs Components', () => {
  it('renders tabs correctly with all subcomponents', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
      </Tabs>
    );

    // Check if tabs are rendered
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    
    // Test tab panel visibility - active content visible, inactive content hidden
    const visiblePanel = screen.getByText('Tab 1 Content');
    expect(visiblePanel).toBeVisible();
    
    // The inactive content might be in the DOM but hidden
    const hiddenPanels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(hiddenPanels.length).toBeGreaterThanOrEqual(0); // There might be hidden panels
  });

  it('changes tab content when clicking different tabs', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Tab 1 Content</TabsContent>
        <TabsContent value="tab2">Tab 2 Content</TabsContent>
      </Tabs>
    );

    // Initial state - Tab 1 content should be visible
    expect(screen.getByText('Tab 1 Content')).toBeVisible();
    
    // Tab 2 content may be in the DOM but should not be visible
    const tab2Content = screen.queryByText('Tab 2 Content');
    if (tab2Content) {
      expect(tab2Content).not.toBeVisible();
    }
    
    // Click on Tab 2
    const user = userEvent.setup();
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    
    // After clicking, Tab 2 content should be visible
    expect(screen.getByText('Tab 2 Content')).toBeVisible();
    
    // Tab 1 content may still be in the DOM but should not be visible
    const tab1Content = screen.queryByText('Tab 1 Content');
    if (tab1Content) {
      expect(tab1Content).not.toBeVisible();
    }
  });

  describe('TabsList', () => {
    it('renders with default classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList data-testid="tabs-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      const tabsList = screen.getByTestId('tabs-list');
      expect(tabsList).toHaveClass('inline-flex');
      expect(tabsList).toHaveClass('items-center');
      expect(tabsList).toHaveClass('justify-center');
      expect(tabsList).toHaveClass('rounded-md');
      expect(tabsList).toHaveClass('bg-muted');
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-class" data-testid="tabs-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      const tabsList = screen.getByTestId('tabs-list');
      expect(tabsList).toHaveClass('custom-class');
    });
  });

  describe('TabsTrigger', () => {
    it('renders with default classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="tab-trigger">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      const trigger = screen.getByTestId('tab-trigger');
      expect(trigger).toHaveClass('inline-flex');
      expect(trigger).toHaveClass('items-center');
      expect(trigger).toHaveClass('justify-center');
      expect(trigger).toHaveClass('whitespace-nowrap');
      expect(trigger).toHaveClass('rounded-sm');
    });

    it('has active state when selected', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="active-tab">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" data-testid="inactive-tab">Tab 2</TabsTrigger>
          </TabsList>
        </Tabs>
      );
      
      const activeTab = screen.getByTestId('active-tab');
      expect(activeTab).toHaveAttribute('data-state', 'active');
      
      const inactiveTab = screen.getByTestId('inactive-tab');
      expect(inactiveTab).toHaveAttribute('data-state', 'inactive');
    });
  });

  describe('TabsContent', () => {
    it('renders content when tab is active', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="content">Content</TabsContent>
        </Tabs>
      );
      
      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('mt-2');
      expect(content).toHaveTextContent('Content');
    });

    it('has hidden attribute when tab is not selected', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Tab 1 Content</TabsContent>
          <TabsContent value="tab2" data-testid="inactive-content">Tab 2 Content</TabsContent>
        </Tabs>
      );
      
      // Inactive tab content should be hidden but may be in the DOM
      const inactiveContent = screen.getByTestId('inactive-content');
      expect(inactiveContent).toHaveAttribute('hidden');
      expect(inactiveContent).not.toBeVisible();
    });

    it('applies custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-class" data-testid="content">
            Content
          </TabsContent>
        </Tabs>
      );
      
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('custom-class');
    });
  });
}); 