import React from 'react';
import { CELL_WIDTH } from './Heatmap.constants';

interface IProps {
  weekCountForMonthList: number[];
}

export const HeatmapColumnLabels: React.FC<IProps> = (props) => {
  const labelStartX = 48;
  const monthShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <g id={'day-label'} transform={'translate(0, 10)'}>
      {props.weekCountForMonthList.map((weekCountForMonth: number, index: number) => {
        let x = labelStartX;
        const previousWeekCount = props.weekCountForMonthList.reduce(
          (sum: number, weekCount: number, monthIndex: number) => {
            if (monthIndex >= index) {
              return sum;
            }

            return sum + props.weekCountForMonthList[monthIndex];
          },
          0,
        );

        if (index !== 0) {
          x = previousWeekCount * CELL_WIDTH + labelStartX;
        }

        return (
          <text x={x} y={'0'} key={`heatmapColumnLabel-${monthShortName[index]}`} fontSize={'10px'} fill={'black'}>
            {monthShortName[index]}
          </text>
        );
      })}
    </g>
  );
};

HeatmapColumnLabels.displayName = 'HeatmapColumnLabels';
HeatmapColumnLabels.defaultProps = {};
