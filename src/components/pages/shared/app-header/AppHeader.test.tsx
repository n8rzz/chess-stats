import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from '../../../../test/test.utils';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <AppHeader isLoading={false} username={'bill murray'} />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });

  describe('when #isLoading is true', () => {
    test('should not render username', () => {
      const usernameMock = 'bill_murray';
      const { getByText } = render(
        <TestWrapper>
          <AppHeader isLoading={true} username={usernameMock} />
        </TestWrapper>,
      );

      expect(() => getByText(usernameMock)).toThrow();
    });
  });

  describe('when #isLoading is false', () => {
    test('should render username', () => {
      const usernameMock = 'bill_murray';
      const { getByText } = render(
        <TestWrapper>
          <AppHeader isLoading={false} username={usernameMock} />
        </TestWrapper>,
      );

      expect(() => getByText(/bill_murray/)).not.toThrow();
    });
  });
});
