import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from '../../test/test.utils';
import { SplashPage } from './SplashPage';

describe('SplashPage', () => {
  const defaultProps = {
    appVersion: '1234',
  };

  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <SplashPage {...defaultProps} />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });

  describe('on initial load', () => {
    test('should render the user form', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <SplashPage {...defaultProps} />
        </TestWrapper>,
      );

      expect(() => getAllByText('Search')).not.toThrow();
    });
  });
});
