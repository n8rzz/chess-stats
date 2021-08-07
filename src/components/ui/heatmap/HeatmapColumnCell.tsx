import React from 'react';
import styles from '../../../styles/App.module.css';

interface IProps {
  y: number;
}

export const HeatmapColumnCell: React.FC<IProps> = (props) => {
  return <rect className={styles.heatmapColumnCell} x={0} y={props.y} height={'12px'} width={'12px'} rx={5} ry={5} />;
};

HeatmapColumnCell.displayName = 'HeatmapColumnCell';
HeatmapColumnCell.defaultProps = {};
