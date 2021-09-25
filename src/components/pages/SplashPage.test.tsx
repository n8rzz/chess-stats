import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from '../../test/test.utils';
import { SplashPage } from './SplashPage';

describe('SplashPage', () => {
  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <SplashPage />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });

  describe('on initial load', () => {
    test('should render the user form', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <SplashPage />
        </TestWrapper>,
      );

      expect(() => getAllByText('Submit')).not.toThrow();
    });

    test('should render empty state', () => {
      const emptyText = 'No Data';
      const { getAllByText } = render(
        <TestWrapper>
          <SplashPage />
        </TestWrapper>,
      );

      expect(() => getAllByText(emptyText)).not.toThrow();
    });
  });
});
