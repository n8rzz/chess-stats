import React from 'react';
import { WinLossDraw } from '../../../domain/game/games.constants';
import styles from '../../../styles/App.module.css';
import { StackedBarChartRow } from './StackedBarChartRow';

interface IProps {
  moveNumber: number;
  onClickDataItem: (move: string, value: WinLossDraw) => void;
  title?: string;
  winLossDrawBySideAndOpening: any;
}

export const StackedBarChart: React.FC<IProps> = (props) => {
  const chartData = React.useMemo(() => {
    return Object.keys(props.winLossDrawBySideAndOpening).map((key) => {
      const item = props.winLossDrawBySideAndOpening[key];

      return {
        axisLabel: key,
        data: [
          { label: WinLossDraw.Win, value: item.win ?? 0 },
          { label: WinLossDraw.Draw, value: item.draw ?? 0 },
          { label: WinLossDraw.Loss, value: item.loss ?? 0 },
        ],
      };
    });
  }, [props.moveNumber, props.winLossDrawBySideAndOpening]);

  const onClickDataItem = React.useCallback((move: string, value: WinLossDraw) => {
    props.onClickDataItem(move, value);
  }, []);

  console.log('$$$ chartData', chartData);

  return (
    <div className={styles.stackedBarChart}>
      {props.title && <div className={styles.stackedBarChartHd}>{props.title}</div>}
      <div className={styles.stackedBarChartBd}>
        {chartData.map((item) => {
          return (
            <StackedBarChartRow
              data={item.data}
              onClickDataItem={onClickDataItem}
              leftXaxisLabel={item.axisLabel}
              key={item.axisLabel}
            />
          );
        })}
      </div>
    </div>
  );
};

StackedBarChart.displayName = 'StackedBarChart';
StackedBarChart.defaultProps = {};
