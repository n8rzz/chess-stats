import React from 'react';
import { render } from '@testing-library/react';
import { StatsPage } from './StatsPage';
import { TestWrapper } from '../../../test/test.utils';
import { Timeframe } from './StatsPage.constants';
import { TimeClass } from '../../../domain/game/games.constants';
import { StatsPageStore } from './StatsPage.store';

jest.mock('../../../domain/game/games.service');
jest.mock('../../../domain/player/player.service');
jest.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      provider: 'chess.com',
      username: 'bill_murray',
      timeframe: Timeframe.NinetyDays,
      timeClass: TimeClass.Rapid,
    },
  }),
}));
jest.mock('../../context/AppInsightsContextProvider', () => ({
  appInsights: jest.fn(),
  reactPlugin: jest.fn(),
}));

describe('StatsPage', () => {
  test('does not throw with valid props', () => {
    expect(() =>
      render(
        <TestWrapper>
          <StatsPage localStore={new StatsPageStore()} />
        </TestWrapper>,
      ),
    ).not.toThrow();
  });
});
