import * as React from 'react';
import dynamic from 'next/dynamic';
import { IWinLossDrawSumByPeriod } from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  shouldShowWinLossSumSeries: boolean;
  winLossByPeriod: IWinLossDrawSumByPeriod;
}

export const WinLossMultiLineChart: React.FC<IProps> = (props) => {
  const series = React.useMemo(() => {
    const winLossSeries = [
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
    ];

    if (!props.shouldShowWinLossSumSeries) {
      return winLossSeries;
    }

    return [
      ...winLossSeries,
      {
        name: 'Win/Loss Sum',
        data: Object.keys(props.winLossByPeriod).reduce((sum: { x: string; y: number }[], key: string) => {
          return [
            ...sum,
            {
              x: key,
              y: props.winLossByPeriod[key].sum,
            },
          ];
        }, []),
      },
    ];
  }, [props.winLossByPeriod, props.shouldShowWinLossSumSeries]);

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
          tooltip: {
            shared: true,
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
        series={series}
        type={'line'}
        height={300}
      />
    </div>
  );
};

WinLossMultiLineChart.displayName = 'WinLossMultiLineChart';
WinLossMultiLineChart.defaultProps = {};
