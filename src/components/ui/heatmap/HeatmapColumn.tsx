import React from 'react';
import { CELL_WIDTH } from './Heatmap.constants';
import { HeatmapColumnCell } from './HeatmapColumnCell';

interface IProps {
  firstDayOfYearIndex: number;
  index: number;
  lastDayOfYearIndex: number;
  x: number;
}

export const HeatmapColumn: React.FC<IProps> = (props) => {
  const daysInWeek = React.useMemo(() => {
    if (props.index === 0) {
      return 7 - props.firstDayOfYearIndex;
    }

    if (props.index === 51) {
      return 7 - props.lastDayOfYearIndex;
    }

    return 7;
  }, [props.index, props.firstDayOfYearIndex, props.lastDayOfYearIndex]);

  return (
    <g transform={`translate(${props.x}, 0)`}>
      {[
        ...Array(daysInWeek)
          .fill(null)
          .map((_: null, index: number) => {
            let y = CELL_WIDTH * index;

            if (props.index === 0) {
              y = props.firstDayOfYearIndex * CELL_WIDTH + CELL_WIDTH * index;
            }

            return <HeatmapColumnCell y={y} key={`heatmapColumnCell-${props.x}-${y}`} />;
          }),
      ]}
    </g>
  );
};

HeatmapColumn.displayName = 'HeatmapColumn';
HeatmapColumn.defaultProps = {};
