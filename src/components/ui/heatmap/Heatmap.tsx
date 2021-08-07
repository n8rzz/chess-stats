import React from 'react';
import dayjs from 'dayjs';
import styles from '../../../styles/App.module.css';
import { weeksOfMonth } from './Heatmap.utils';
import { HeatmapColumnLabels } from './HeatmapColumnLabels';
import { HeatmapCellLabels } from './HeatmapCellLabels';
import { HeatmapColumn } from './HeatmapColumn';

interface IProps {}

export const Heatmap: React.FC<IProps> = (props) => {
  const startDate = '2019-01-01';
  const endDate = '2019-12-31';
  const firstWeekCellIndex = React.useMemo(() => {
    return dayjs(startDate).format('d');
  }, []);

  const lastWeekCellIndex = React.useMemo(() => {
    return dayjs(endDate).format('d');
  }, []);

  const monthLabelIndexList = React.useMemo(() => {
    return [
      ...Array(12)
        .fill(null)
        .map((_: null, index: number) => {
          const year = 2021;

          return weeksOfMonth(year, index);
        }),
    ];
  }, []);

  return (
    <div>
      Heatmap
      <div className={styles.heatmap}>
        <svg width={'900'} height={'150'} preserveAspectRatio="xMaxYMin meet">
          <HeatmapColumnLabels monthLabelIndexList={monthLabelIndexList} />

          <g transform={'translate(0, 15)'}>
            <HeatmapCellLabels />

            {[
              ...Array(52)
                .fill(null)
                .map((_: null, index: number) => {
                  const x = 16 * index + 50;

                  return (
                    <HeatmapColumn
                      x={x}
                      index={index}
                      key={`heatMapColumn-${x}`}
                      firstDayOfYearIndex={index === 0 ? parseInt(firstWeekCellIndex, 10) : 0}
                      lastDayOfYearIndex={index === 52 ? parseInt(lastWeekCellIndex, 10) : 0}
                    />
                  );
                }),
            ]}
          </g>
        </svg>
      </div>
    </div>
  );
};

Heatmap.displayName = 'Heatmap';
Heatmap.defaultProps = {};
