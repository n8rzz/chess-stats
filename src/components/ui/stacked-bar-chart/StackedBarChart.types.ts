import { WinLossDraw } from '../../../domain/game/games.constants';

export interface IStackedBarChartData {
  data: {
    label: WinLossDraw;
    value: number;
  }[];
  key: string;
  leftAxisLabel: string;
  rightAxisLabel: string;
}
