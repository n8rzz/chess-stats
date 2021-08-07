import React from 'react';

interface IProps {
  monthLabelIndexList: number[];
}

export const HeatmapColumnLabels: React.FC<IProps> = (props) => {
  const labelStartX = 48;
  const columnWidth = 16;
  const monthShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <g id={'day-label'} transform={'translate(0, 10)'}>
      {props.monthLabelIndexList.map((weekCountForMonth: number, index: number) => {
        let x = labelStartX;

        if (index !== 0) {
          const previousMonthWeekCount = props.monthLabelIndexList[index - 1];

          x = previousMonthWeekCount * columnWidth * index + labelStartX;
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
