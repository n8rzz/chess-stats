import { MovingAveragePeriod } from '../../../domain/game/games.constants';
import { Timeframe } from '../../pages/stats/StatsPage.constants';

export interface IAverageTimeframeOption {
  key: string;
  text: string;
  value: MovingAveragePeriod;
}

export const averageTimeframeOptionList: Record<Timeframe, IAverageTimeframeOption[]> = {
  [Timeframe.Today]: [],
  [Timeframe.SevenDays]: [
    {
      key: '5-days',
      text: '5 Days',
      value: MovingAveragePeriod.FiveDays,
    },
  ],
  [Timeframe.ThirtyDays]: [
    {
      key: '5-days',
      text: '5 Days',
      value: MovingAveragePeriod.FiveDays,
    },
    {
      key: '10-days',
      text: '10 Days',
      value: MovingAveragePeriod.TenDays,
    },
  ],
  [Timeframe.NinetyDays]: [
    {
      key: '5-days',
      text: '5 Days',
      value: MovingAveragePeriod.FiveDays,
    },
    {
      key: '10-days',
      text: '10 Days',
      value: MovingAveragePeriod.TenDays,
    },
    {
      key: '15-days',
      text: '15 Days',
      value: MovingAveragePeriod.FifteenDays,
    },
  ],
  [Timeframe.SixMonths]: [
    {
      key: '5-days',
      text: '5 Days',
      value: MovingAveragePeriod.FiveDays,
    },
    {
      key: '10-days',
      text: '10 Days',
      value: MovingAveragePeriod.TenDays,
    },
    {
      key: '15-days',
      text: '15 Days',
      value: MovingAveragePeriod.FifteenDays,
    },
    {
      key: '30-days',
      text: '30 Days',
      value: MovingAveragePeriod.ThirtyDays,
    },
  ],
  [Timeframe.OneYear]: [
    {
      key: '5-days',
      text: '5 Days',
      value: MovingAveragePeriod.FiveDays,
    },
    {
      key: '10-days',
      text: '10 Days',
      value: MovingAveragePeriod.TenDays,
    },
    {
      key: '15-days',
      text: '15 Days',
      value: MovingAveragePeriod.FifteenDays,
    },
    {
      key: '30-days',
      text: '30 Days',
      value: MovingAveragePeriod.ThirtyDays,
    },
  ],
};
