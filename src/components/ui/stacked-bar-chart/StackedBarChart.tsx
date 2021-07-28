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
  moveList: string[];
  moveNumber: number;
  onClickDataItem: (move: string, value: WinLossDraw) => void;
  side: PieceColor;
  title: string;
  winLossDrawBySideAndOpening: any;
}

export const StackedBarChart: React.FC<IProps> = (props) => {
  // FIXME: this should live in the collection
  const chartData = React.useMemo(() => {
    return Object.keys(props.winLossDrawBySideAndOpening).map(
      (key: string): IStackedBarChartData => {
        const item = props.winLossDrawBySideAndOpening[key];
        const labelParts = key.split(':');
        const leftAxisLabel = props.side === PieceColor.White ? labelParts[0] : labelParts[1];
        const rightAxisLabel = props.side === PieceColor.White ? labelParts[1] ?? 0 : labelParts[0];

        return {
          key: key,
          leftAxisLabel: leftAxisLabel,
          rightAxisLabel: rightAxisLabel,
          data: [
            { label: WinLossDraw.Win, value: item.win ?? 0 },
            { label: WinLossDraw.Draw, value: item.draw ?? 0 },
            { label: WinLossDraw.Loss, value: item.loss ?? 0 },
          ],
        };
      },
    );
  }, [props.moveNumber, props.winLossDrawBySideAndOpening]);

  const onClickDataItem = React.useCallback((move: string, value: WinLossDraw) => {
    props.onClickDataItem(move, value);
  }, []);

  return (
    <div className={styles.stackedBarChart}>
      {props.title && <div className={styles.stackedBarChartHd}>{props.title}</div>}
      {props.moveList && <div className={styles.stackedBarChartHdSubHd}>{props.moveList.join('  ')}</div>}
      <div className={styles.stackedBarChartBd}>
        {chartData.map((item) => {
          return (
            <StackedBarChartRow
              data={item.data}
              onClickDataItem={onClickDataItem}
              leftAxisLabel={item.leftAxisLabel}
              rightAxisLabel={item.rightAxisLabel}
              key={item.key}
            />
          );
        })}
      </div>
    </div>
  );
};

StackedBarChart.displayName = 'StackedBarChart';
StackedBarChart.defaultProps = {};
