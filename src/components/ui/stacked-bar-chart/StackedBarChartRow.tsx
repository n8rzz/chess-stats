import clsx from 'clsx';
import React from 'react';
import { WinLossDraw } from '../../../domain/game/games.constants';
import styles from '../../../styles/App.module.css';

export interface IStackedBarChartRowItem {
  label: WinLossDraw;
  value: number;
}

interface IProps {
  data: IStackedBarChartRowItem[];
  leftAxisLabel: string;
  move: string;
  onClickDataItem: (move: string, value: WinLossDraw) => void;
  rightAxisLabel: string;
}

export const StackedBarChartRow: React.FC<IProps> = (props) => {
  const valuePercentages = React.useMemo(() => {
    const valueSum = props.data.reduce((sum: number, dataItem: IStackedBarChartRowItem) => {
      return sum + dataItem.value;
    }, 0);

    return props.data.reduce((sum: number[], dataItem: IStackedBarChartRowItem, index: number) => {
      if (index === 2) {
        const lastEntry = 100 - (sum[0] + sum[1]);

        return [...sum, lastEntry];
      }

      return [...sum, Math.floor((dataItem.value / valueSum) * 100)];
    }, []);
  }, [props.data]);

  return (
    <div className={styles.stackedBarChartBdRow}>
      <div className={styles.stackedBarChartBdRowLeftAxisLabel}>{props.leftAxisLabel}</div>
      <div className={styles.stackedBarChartBdRowData}>
        {props.data.map((dataItem: IStackedBarChartRowItem, index: number) => {
          const isLastItem = props.data.length === index;
          const widthValue = !isLastItem ? `${valuePercentages[index]}%` : 'auto';

          if (dataItem.value === 0) {
            return null;
          }

          return (
            <div
              className={clsx({
                [styles.stackedBarChartBdRowDataItem]: true,
                [styles.mixStackedBarChartBdRowDataItemWin]: dataItem.label === WinLossDraw.Win,
                [styles.mixStackedBarChartBdRowDataItemDraw]: dataItem.label === WinLossDraw.Draw,
                [styles.mixStackedBarChartBdRowDataItemLoss]: dataItem.label === WinLossDraw.Loss,
              })}
              style={{ width: `${widthValue}` }}
              key={`${props.leftAxisLabel}-${dataItem.label}`}
              onClick={() => props.onClickDataItem(props.move, dataItem.label)}
            >
              {dataItem.value}
            </div>
          );
        })}
      </div>
      <div className={styles.stackedBarChartBdRowRightAxisLabel}>{props.rightAxisLabel}</div>
    </div>
  );
};

StackedBarChartRow.displayName = 'StackedBarChartRow';
StackedBarChartRow.defaultProps = {};
