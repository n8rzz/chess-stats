import React from 'react';
import styles from '../../../styles/App.module.css';
import { PieceColor, WinLossDraw } from '../../../domain/game/games.constants';
import { StackedBarChartRow } from './StackedBarChartRow';

export interface IStackedBarChartData {
  data: {
    label: WinLossDraw;
    value: number;
  }[];
  key: string;
  leftAxisLabel: string;
  rightAxisLabel: string;
}

interface IProps {
  onClickDataItem: (move: string, value: WinLossDraw) => void;
  side: PieceColor;
  title: string;
  winLossDrawBySideAndOpening: any;
}

export const StackedBarChart: React.FC<IProps> = (props) => {
  // FIXME: this should live in the collection
  const chartData = React.useMemo(() => {
    return Object.keys(props.winLossDrawBySideAndOpening).reduce((sum: any, key: string): IStackedBarChartData[] => {
      if (key === 'results') {
        return sum;
      }

      const item = props.winLossDrawBySideAndOpening[key];
      const labelParts = key.split(':');
      const leftAxisLabel = props.side === PieceColor.White ? labelParts[0] : labelParts[1];
      const rightAxisLabel = props.side === PieceColor.White ? labelParts[1] ?? 0 : labelParts[0];

      return [
        ...sum,
        {
          key: key,
          leftAxisLabel: leftAxisLabel,
          rightAxisLabel: rightAxisLabel,
          data: [
            { label: WinLossDraw.Win, value: item.results.win ?? 0 },
            { label: WinLossDraw.Draw, value: item.results.draw ?? 0 },
            { label: WinLossDraw.Loss, value: item.results.loss ?? 0 },
          ],
        },
      ];
    }, []);
  }, [props.winLossDrawBySideAndOpening]);

  const onClickDataItem = React.useCallback((move: string, value: WinLossDraw) => {
    props.onClickDataItem(move, value);
  }, []);

  return (
    <div className={styles.stackedBarChart}>
      {props.title && <div className={styles.stackedBarChartHd}>{props.title}</div>}
      <div className={styles.stackedBarChartBd}>
        {chartData.map((item) => {
          return (
            <StackedBarChartRow
              data={item.data}
              key={item.key}
              leftAxisLabel={item.leftAxisLabel}
              move={item.key}
              onClickDataItem={onClickDataItem}
              rightAxisLabel={item.rightAxisLabel}
            />
          );
        })}
      </div>
    </div>
  );
};

StackedBarChart.displayName = 'StackedBarChart';
StackedBarChart.defaultProps = {};
