import * as React from 'react';
import dynamic from 'next/dynamic';
import { IWinLossDrawByPeriod } from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  winLossByPeriod: IWinLossDrawByPeriod;
}

export const WinLossMultiLineChart: React.FC<IProps> = (props) => {
  return (
    <div id={'win-loss-multi-line-chart'}>
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
