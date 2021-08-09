import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { IOpponentRatingScatterChartData } from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  opponentAndUserRatingsByDate: IOpponentRatingScatterChartData;
}

export const OpponentRatingsScatterChart: React.FC<IProps> = (props) => {
  console.log('===', props);

  return (
    <div id={'opponent-rating-scatter-chart'}>
      <div className={styles.vr2}>
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
              name: 'Opponent Rating',
              data: props.opponentAndUserRatingsByDate.opponent,
            },
            {
              name: 'User Rating',
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
