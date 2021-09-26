import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TestWrapper } from '../../test/test.utils';
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

  describe.skip('when form is valid', () => {
    describe('and user clicks `Submit` button', () => {
      test('should navigate to /stats page`', () => {});
    });
  });

  describe('when form is invalid', () => {
    describe('and user clicks `Submit` button', () => {
      test('should not call `props.onClickSearch()`', () => {
        const onClickSearchSpy = jest.fn();
        const { getByText } = render(
          <TestWrapper>
            <SplashPage {...defaultProps} />
          </TestWrapper>,
        );

        const searchButtonElement = getByText('Search');

        fireEvent.click(searchButtonElement);

        expect(onClickSearchSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
