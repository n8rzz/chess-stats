import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import { TestWrapper } from '../../../test/test.utils';

describe('App', () => {
  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <App />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });

  describe('on initial load', () => {
    test('should render the user form', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <App />
        </TestWrapper>,
      );

      expect(() => getAllByText('Submit')).not.toThrow();
    });

    test('should render empty state', () => {
      const emptyText = 'No Data';
      const { getAllByText } = render(
        <TestWrapper>
          <App />
        </TestWrapper>,
      );

      expect(() => getAllByText(emptyText)).not.toThrow();
    });
  });
});
