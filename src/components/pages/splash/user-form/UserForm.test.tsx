import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TestWrapper } from '../../../../test/test.utils';
import { UserForm } from './UserForm';
import { Timeframe, timeframeLabel } from '../../stats/StatsPage.constants';
import { TimeClass, timeClassLabel } from '../../../../domain/game/games.constants';

jest.mock('nookies', () => ({
  parseCookies: jest.fn().mockReturnValue({}),
  destroyCookie: jest.fn(),
  setCookie: jest.fn(),
}));

describe('UserForm', () => {
  const defaultProps: React.ComponentProps<typeof UserForm> = {
    onSubmit: jest.fn(),
  };

  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <UserForm {...defaultProps} />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });

  describe('on initial load', () => {
    test('should render the user form', () => {
      const { getAllByText } = render(
        <TestWrapper>
          <UserForm {...defaultProps} />
        </TestWrapper>,
      );

      expect(() => getAllByText('Search')).not.toThrow();
    });

    describe('and no stored username', () => {
      test('should render empty username input', () => {
        const { getByPlaceholderText } = render(
          <TestWrapper>
            <UserForm {...defaultProps} />
          </TestWrapper>,
        );

        const usernameInputElement = getByPlaceholderText('Username') as HTMLInputElement;

        expect(usernameInputElement.value).toBe('');
      });

      test('should render default timeframe option', () => {
        const { getAllByText } = render(
          <TestWrapper>
            <UserForm {...defaultProps} />
          </TestWrapper>,
        );

        expect(() => getAllByText(timeframeLabel[Timeframe.SevenDays])).not.toThrow();
      });

      test('should render default game type option', () => {
        const { getAllByText } = render(
          <TestWrapper>
            <UserForm {...defaultProps} />
          </TestWrapper>,
        );

        expect(() => getAllByText(timeClassLabel[TimeClass.Rapid])).not.toThrow();
      });

      test('should render remember me default state', () => {
        const { getByText } = render(
          <TestWrapper>
            <UserForm {...defaultProps} />
          </TestWrapper>,
        );

        expect(() => getByText(/Remember Username/)).not.toThrow();
      });
    });
  });

  describe('when form is valid', () => {
    describe('and user clicks `Submit` button', () => {
      test.todo('should call `props.onSubmit()`');
    });
  });

  describe('when form is invalid', () => {
    describe('and user clicks `Submit` button', () => {
      test('should not call `props.onClickSearch()`', () => {
        const onClickSearchSpy = jest.fn();
        const { getByText } = render(
          <TestWrapper>
            <UserForm {...defaultProps} />
          </TestWrapper>,
        );

        const searchButtonElement = getByText('Search');

        fireEvent.click(searchButtonElement);

        expect(onClickSearchSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
