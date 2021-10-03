import React from 'react';
import { render } from '@testing-library/react';
import { TestWrapper } from '../../../../test/test.utils';
import { PlayerStats } from './PlayerStats';
import { playerStatsPropsMock } from './__mocks__/PlayerStats.mocks';

describe.skip('PlayerStatsTest', () => {
  describe('when passed valid props', () => {
    test('should not throw', () => {
      expect(() =>
        render(
          <TestWrapper>
            <PlayerStats
              highLow={playerStatsPropsMock.highLow}
              isLoading={true}
              label={playerStatsPropsMock.label}
              stats={playerStatsPropsMock.stats}
            />
          </TestWrapper>,
        ),
      ).not.toThrow();
    });
  });

  describe('#isLoading', () => {
    describe('when passed as true', () => {
      test('should render loading text', () => {
        const { getByText } = render(
          <TestWrapper>
            <PlayerStats
              highLow={playerStatsPropsMock.highLow}
              isLoading={true}
              label={playerStatsPropsMock.label}
              stats={playerStatsPropsMock.stats}
            />
          </TestWrapper>,
        );

        expect(() => getByText('Loading...')).not.toThrow();
      });
    });
  });

  describe('#stats', () => {
    describe('when passed as null', () => {
      test('should render empty state', () => {
        const { getByText } = render(
          <TestWrapper>
            <PlayerStats
              highLow={playerStatsPropsMock.highLow}
              isLoading={playerStatsPropsMock.isLoading}
              label={playerStatsPropsMock.label}
              stats={null as any}
            />
          </TestWrapper>,
        );

        expect(() => getByText('No Player')).not.toThrow();
      });
    });
  });
});
