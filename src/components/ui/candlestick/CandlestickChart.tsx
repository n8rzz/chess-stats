/* eslint-disable arrow-body-style */
import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  ICountByDateChartData,
  IDayOhlc,
} from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  countByDate: ICountByDateChartData;
  ohlcData: IDayOhlc[];
}

export const CandlestickChart: React.FC<IProps> = (props) => {
  return (
    <div>
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
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              data: props.ohlcData.map((item: IDayOhlc) => ({
                x: item.date,
                y: [item.open, item.high, item.low, item.close],
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
              id: 'game-count-by-day-chart',
            },
            xaxis: {
              categories: props.countByDate.labels,
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'top',
                },
              },
            },
          }}
          series={[
            {
              name: 'Games Played',
              data: props.countByDate.data,
            },
          ]}
          type={'bar'}
          height={150}
        />
      </div>
    </div>
  );
};
CandlestickChart.displayName = 'CandlestickChart';
CandlestickChart.defaultProps = {};
