import React from 'react';
import { CELL_HEIGHT } from './Heatmap.constants';

interface IProps {}

export const HeatmapRowLabels: React.FC<IProps> = (props) => {
  return (
    <g id={'day-label'} transform={`translate(0, ${CELL_HEIGHT})`}>
      <text x={'40'} y={8} fontSize={'10px'} fill={'black'} textAnchor={'end'}>
        Mon
      </text>
      <text x={'40'} y={32} fontSize={'10px'} fill={'black'} textAnchor={'end'}>
        Wed
      </text>
      <text x={'40'} y={55} fontSize={'10px'} fill={'black'} textAnchor={'end'}>
        Fri
      </text>
    </g>
  );
};

HeatmapRowLabels.displayName = 'HeatmapRowLabels';
HeatmapRowLabels.defaultProps = {};
