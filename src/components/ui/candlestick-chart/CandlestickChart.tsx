import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { IOhlcChartData } from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  ohlcData: IOhlcChartData[];
  title: string;
}

export const CandlestickChart: React.FC<IProps> = (props) => {
  return (
    <div id={'rating-over-time-chart-candlestick'}>
      <div className={styles.vr2}>
        <div className={styles.vr1}>
          <h3>{props.title}</h3>
        </div>

        <Chart
          options={{
            chart: {
              toolbar: {
                show: false,
              },
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
          series={[{ data: props.ohlcData }]}
          type={'candlestick'}
          height={300}
        />
      </div>
    </div>
  );
};

CandlestickChart.displayName = 'CandlestickChart';
CandlestickChart.defaultProps = {};
