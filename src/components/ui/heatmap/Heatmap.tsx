import React from 'react';
import dayjs from 'dayjs';
import styles from '../../../styles/App.module.css';
import { weeksOfMonth } from './Heatmap.utils';
import { HeatmapColumnLabels } from './HeatmapColumnLabels';
import { HeatmapRowLabels } from './HeatmapRowLabels';
import { HeatmapColumn } from './HeatmapColumn';
import { CELL_WIDTH, LEFT_LABEL_MARGIN } from './Heatmap.constants';

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

  const weekCountForMonthList = React.useMemo(() => {
    return [
      ...Array(12)
        .fill(null)
        .map((_: null, index: number) => {
          const year = 2021;

          return weeksOfMonth(year, index);
        }),
    ];
  }, []);
  const countOfCalendarWeeks = React.useMemo(
    () => weekCountForMonthList.reduce((sum: number, weekCountForMonth: number) => sum + weekCountForMonth, 0),
    [],
  );

  return (
    <div>
      Heatmap
      <div className={styles.heatmap}>
        <svg width={'800'} height={'150'} preserveAspectRatio="xMaxYMin meet">
          <HeatmapColumnLabels weekCountForMonthList={weekCountForMonthList} />

          <g transform={'translate(0, 15)'}>
            <HeatmapRowLabels />

            {[
              ...Array(countOfCalendarWeeks)
                .fill(null)
                .map((_: null, index: number) => {
                  const x = CELL_WIDTH * index + LEFT_LABEL_MARGIN;

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
