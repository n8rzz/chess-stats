import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TestWrapper } from '../../../../test/test.utils';
import { AppHeader } from './AppHeader';

describe('App', () => {
  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <AppHeader onClickSearch={jest.fn()} />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });

  describe('when form is valid', () => {
    describe('and user clicks `Submit` button', () => {
      test('should call `props.onClickSearch()`', () => {
        const onClickSearchSpy = jest.fn();
        const { getByPlaceholderText, getByText } = render(
          <TestWrapper>
            <AppHeader onClickSearch={onClickSearchSpy} />
          </TestWrapper>,
        );

        const usernameInputElement = getByPlaceholderText('Username');
        const searchButtonElement = getByText('Search');

        fireEvent.change(usernameInputElement, { target: { value: 'n8rzz' } });
        fireEvent.click(searchButtonElement);

        expect(onClickSearchSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when form is invalid', () => {
    describe('and user clicks `Submit` button', () => {
      test('should not call `props.onClickSearch()`', () => {
        const onClickSearchSpy = jest.fn();
        const { getByText } = render(
          <TestWrapper>
            <AppHeader onClickSearch={onClickSearchSpy} />
          </TestWrapper>,
        );

        const searchButtonElement = getByText('Search');

        fireEvent.click(searchButtonElement);

        expect(onClickSearchSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
