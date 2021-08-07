import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { ICountByDate } from '../../../domain/game/games.types';
import { GameResult, MovingAveragePeriod } from '../../../domain/game/games.constants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  countByDate: ICountByDate;
  onChangeMovingAverage: (nextPeriod: MovingAveragePeriod) => void;
  title: string;
}

export const WinLossCountChart: React.FC<IProps> = (props) => {
  return (
    <div id={'win-loss-count-by-period-chart'} className={styles.vr2}>
      <div className={styles.vr1}>
        <h3>{props.title}</h3>
      </div>

      <Chart
        options={{
          chart: {
            id: 'win-loss-count-by-period-chart',
            type: 'bar',
            stacked: true,
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: props.countByDate.labels,
            type: 'datetime',
          },
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: 'top',
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
        }}
        series={Object.keys(props.countByDate.data).reduce((sum: { data: number[]; name: string }[], key: string) => {
          return [
            ...sum,
            {
              name: key,
              data: props.countByDate.data[key as GameResult],
            },
          ];
        }, [])}
        type={'bar'}
        height={300}
      />
    </div>
  );
};

WinLossCountChart.displayName = 'CandlestickChart';
WinLossCountChart.defaultProps = {};
