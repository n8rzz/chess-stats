import React from 'react';
import styles from '../../../styles/App.module.css';
import { CELL_HEIGHT, CELL_WIDTH } from './Heatmap.constants';

interface IProps {
  y: number;
}

export const HeatmapColumnCell: React.FC<IProps> = (props) => {
  return (
    <rect
      className={styles.heatmapColumnCell}
      x={0}
      y={props.y}
      height={CELL_HEIGHT - 2}
      width={CELL_WIDTH - 2}
      rx={5}
      ry={5}
    />
  );
};

HeatmapColumnCell.displayName = 'HeatmapColumnCell';
HeatmapColumnCell.defaultProps = {};
