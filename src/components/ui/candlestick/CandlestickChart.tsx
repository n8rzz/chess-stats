import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { IDayOhlc, GameResult, IDataLabel, IMovingAverageChartData } from '../../../domain/game/games.types';
import clsx from 'clsx';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  countByDate: IDataLabel<Record<GameResult, number[]>>;
  movingAverage: IMovingAverageChartData[];
  ohlcData: IDayOhlc[];
}

export const CandlestickChart: React.FC<IProps> = (props) => {
  const seriesData = React.useMemo(() => {
    return [
      {
        name: 'agreed',
        data: props.countByDate.data.agreed,
      },
      {
        name: 'checkmated',
        data: props.countByDate.data.checkmated,
      },
      {
        name: 'resigned',
        data: props.countByDate.data.resigned,
      },
      {
        name: 'stalemate',
        data: props.countByDate.data.stalemate,
      },
      {
        name: 'timeout',
        data: props.countByDate.data.timeout,
      },
      {
        name: 'win',
        data: props.countByDate.data.win,
      },
    ];
  }, [props.countByDate]);

  return (
    <div>
      <section className={clsx(styles.container, styles.vr2)}>
        <div id={'chart-candlestick'}>
          <Chart
            options={{
              title: {
                text: 'Rating over time',
                align: 'left',
              },
              xaxis: {
                type: 'datetime',
              },
              yaxis: [
                {
                  tooltip: {
                    enabled: true,
                  },
                },
              ],
            }}
            series={[
              {
                data: props.ohlcData.map((item: IDayOhlc) => ({
                  x: item.date,
                  y: [item.open, item.high, item.low, item.close],
                })),
              },
              {
                data: props.movingAverage.map((item: IMovingAverageChartData) => ({
                  x: item.date,
                  y: item.value,
                })),
              },
            ]}
            type={'candlestick'}
            height={300}
          />
        </div>
        <div>
          <Chart
            options={{
              chart: {
                id: 'win-loss-count-by-period-chart',
                type: 'bar',
                stacked: true,
              },
              xaxis: {
                categories: props.countByDate.labels,
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
            series={seriesData}
            type={'bar'}
            height={150}
          />
        </div>
      </section>

      <div id={'rating-average-chart'}>
        <Chart
          options={{
            title: {
              text: 'Average Rating over time',
              align: 'left',
            },
            stroke: {
              width: 3,
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              name: 'Average Rating',
              data: props.movingAverage.map((item: IMovingAverageChartData) => ({
                x: item.date,
                y: item.value,
              })),
            },
          ]}
          type={'line'}
          height={300}
        />
      </div>
    </div>
  );
};

CandlestickChart.displayName = 'CandlestickChart';
CandlestickChart.defaultProps = {};
