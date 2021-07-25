import React from 'react';
import { WinLossDraw } from '../../../domain/game/games.constants';
import styles from '../../../styles/App.module.css';
import { StackedBarChartRow } from './StackedBarChartRow';

interface IProps {
  moveNumber: number;
  onClickDataItem: (move: string, value: WinLossDraw) => void;
  winLossDrawBySideAndOpening: any;
}

export const StackedBarChart: React.FC<IProps> = (props) => {
  const onClickDataItem = React.useCallback((move: string, value: WinLossDraw) => {
    props.onClickDataItem(move, value);
  }, []);

  // const chartData = React.useMemo(
  //   () => [
  //     {
  //       name: 'e4',
  //       data: [30, 20, 10],
  //     },
  //     {
  //       name: 'd4',
  //       data: [20, 20, 60],
  //     },
  //     {
  //       name: 'a3',
  //       data: [0, 0, 100],
  //     },
  //   ],
  //   [],
  // );

  return (
    <div>
      <div className={styles.stackedBarChart}>
        <div className={styles.stackedBarChartHd}>stackedBarChart - Title</div>
        <div className={styles.stackedBarChartBd}>
          <StackedBarChartRow
            data={[
              { label: WinLossDraw.Win, value: 4 },
              { label: WinLossDraw.Draw, value: 2 },
              { label: WinLossDraw.Loss, value: 8 },
            ]}
            onClickDataItem={onClickDataItem}
            xaxisLabel={'e4'}
          />
        </div>
      </div>
    </div>
  );
};

StackedBarChart.displayName = 'StackedBarChart';
StackedBarChart.defaultProps = {};
