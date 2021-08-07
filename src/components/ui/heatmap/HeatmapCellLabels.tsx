import React from 'react';

interface IProps {}

export const HeatmapCellLabels: React.FC<IProps> = (props) => {
  return (
    <g id={'day-label'} transform={'translate(0, 10)'}>
      <text x={'40'} y={'16'} fontSize={'10px'} fill={'black'} textAnchor={'end'}>
        Mon
      </text>
      <text x={'40'} y={'48'} fontSize={'10px'} fill={'black'} textAnchor={'end'}>
        Wed
      </text>
      <text x={'40'} y={'80'} fontSize={'10px'} fill={'black'} textAnchor={'end'}>
        Fri
      </text>
    </g>
  );
};

HeatmapCellLabels.displayName = 'HeatmapCellLabels';
HeatmapCellLabels.defaultProps = {};
