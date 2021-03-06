import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { IOpponentRatingScatterChartData } from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  opponentAndUserRatingsByDate: IOpponentRatingScatterChartData;
  title: string;
}

export const OpponentRatingsScatterChart: React.FC<IProps> = (props) => {
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
              max: props.opponentAndUserRatingsByDate.maxRating + 20,
              min: props.opponentAndUserRatingsByDate.minRating - 20,
            },
          }}
          series={[
            {
              name: 'Opponent',
              data: props.opponentAndUserRatingsByDate.opponent,
            },
            {
              name: 'User',
              data: props.opponentAndUserRatingsByDate.user,
            },
          ]}
          type={'scatter'}
          height={300}
        />
      </div>
    </div>
  );
};

OpponentRatingsScatterChart.displayName = 'OpponentRatingsScatterChart';
OpponentRatingsScatterChart.defaultProps = {};
