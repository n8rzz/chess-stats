import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  title: string;
  winLossByPeriod: { [key: string]: { draw: number; loss: number; win: number } };
}

export const WinLossMultiLineChart: React.FC<IProps> = (props) => {
  return (
    <div id={'win-loss-multi-line-chart'}>
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
            name: 'Win',
            data: Object.keys(props.winLossByPeriod).reduce((sum: { x: string; y: number }[], key: string) => {
              return [
                ...sum,
                {
                  x: key,
                  y: props.winLossByPeriod[key].win,
                },
              ];
            }, []),
          },
          {
            name: 'Loss',
            data: Object.keys(props.winLossByPeriod).reduce((sum: { x: string; y: number }[], key: string) => {
              return [
                ...sum,
                {
                  x: key,
                  y: props.winLossByPeriod[key].loss * -1,
                },
              ];
            }, []),
          },
        ]}
        type={'line'}
        height={300}
      />
    </div>
  );
};

WinLossMultiLineChart.displayName = 'CandlestickChart';
WinLossMultiLineChart.defaultProps = {};
