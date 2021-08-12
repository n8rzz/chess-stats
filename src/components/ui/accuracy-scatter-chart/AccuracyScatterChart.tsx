import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { IOpponentAccuracyScatterChartData } from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  opponentAndUserAccuracyByDate: IOpponentAccuracyScatterChartData;
  title: string;
}

export const OpponentAccuracyScatterChart: React.FC<IProps> = (props) => {
  return (
    <div id={'opponent-rating-scatter-chart'}>
      <div className={styles.vr2}>
        <div className={styles.vr2}>
          <h3>{props.title}</h3>
        </div>

        <Chart
          options={{
            chart: {
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            grid: {
              xaxis: {
                lines: {
                  show: true,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              max: 100,
              min: 0,
            },
          }}
          series={[
            {
              name: 'Opponent',
              data: props.opponentAndUserAccuracyByDate.opponent,
            },
            {
              name: 'User',
              data: props.opponentAndUserAccuracyByDate.user,
            },
          ]}
          type={'scatter'}
          height={300}
        />
      </div>
    </div>
  );
};

OpponentAccuracyScatterChart.displayName = 'OpponentAccuracyScatterChart';
OpponentAccuracyScatterChart.defaultProps = {};
