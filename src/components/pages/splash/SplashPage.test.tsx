import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from '../../../test/test.utils';
import { SplashPage } from './SplashPage';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      message: '',
    },
  }),
}));

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
});
