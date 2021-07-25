import React from 'react';
import { WinLossDraw } from '../../../domain/game/games.constants';
import styles from '../../../styles/App.module.css';

export interface IStackedBarChartRowItem {
  label: WinLossDraw;
  value: number;
}

interface IProps {
  data: IStackedBarChartRowItem[];
  onClickDataItem: (move: string, value: WinLossDraw) => void;
  xaxisLabel: string;
}

export const StackedBarChartRow: React.FC<IProps> = (props) => {
  const valuePercentages = React.useMemo(() => {
    const valueSum = props.data.reduce((sum: number, dataItem: IStackedBarChartRowItem) => {
      return sum + dataItem.value;
    }, 0);

    return props.data.reduce((sum: number[], dataItem: IStackedBarChartRowItem) => {
      return [...sum, Math.floor((dataItem.value / valueSum) * 100)];
    }, []);
  }, [props.data]);

  return (
    <div className={styles.stackedBarChartBdRow}>
      <div className={styles.stackedBarChartBdRowXaxisLabel}>{props.xaxisLabel}</div>
      <div className={styles.stackedBarChartBdRowData}>
        {props.data.map((dataItem: IStackedBarChartRowItem, index: number) => {
          if (dataItem.value === 0) {
            return null;
          }

          return (
            <div
              className={styles.stackedBarChartBdRowDataItem}
              style={{ width: `${valuePercentages[index]}%` }}
              key={`${props.xaxisLabel}-${dataItem.label}`}
              onClick={() => props.onClickDataItem(props.xaxisLabel, dataItem.label)}
            >
              {dataItem.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

StackedBarChartRow.displayName = 'StackedBarChartRow';
StackedBarChartRow.defaultProps = {};
