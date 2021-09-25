import React from 'react';
import { render } from '@testing-library/react';
import { StatsPage } from './StatsPage';
import { TestWrapper } from '../../../test/test.utils';

describe('StatsPage', () => {
  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <StatsPage />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });
});
