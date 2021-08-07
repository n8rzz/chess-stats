import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { IDataLabel, IMovingAverageChartData, IOhlcChartData } from '../../../domain/game/games.types';
import { GameResult, MovingAveragePeriod } from '../../../domain/game/games.constants';
import { Menu, Dropdown, DropdownProps } from 'semantic-ui-react';
import { Timeframe } from '../../pages/app/app.constants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  countByDate: IDataLabel<Record<GameResult, number[]>>;
  movingAverage: IMovingAverageChartData[];
  movingAveragePeriod: MovingAveragePeriod;
  ohlcData: IOhlcChartData[];
  onChangeMovingAverage: (nextPeriod: MovingAveragePeriod) => void;
  timeframe: Timeframe;
  winLossByPeriod: { [key: string]: { draw: number; loss: number; win: number } };
}

export const ValueOverTimeCharts: React.FC<IProps> = (props) => {
  const averageTimeframeOptionList = React.useMemo(() => {
    return [
      {
        key: '5-days',
        text: '5 Days',
        value: MovingAveragePeriod.FiveDays,
      },
      {
        key: '10-days',
        text: '10 Days',
        value: MovingAveragePeriod.TenDays,
      },
      {
        key: '15-days',
        text: '15 Days',
        value: MovingAveragePeriod.FifteenDays,
      },
      {
        key: '30-days',
        text: '30 Days',
        value: MovingAveragePeriod.ThirtyDays,
      },
    ];
  }, [props.timeframe]);

  const movingAverageChartData = React.useMemo(() => {
    return props.movingAverage.map((item: IMovingAverageChartData) => ({
      x: item.date,
      y: item.value,
    }));
  }, [props.movingAverage, props.movingAveragePeriod]);

  console.log('===', props);

  return (
    <div>
      <section className={styles.vr2}>
        <div id={'rating-over-time-chart-candlestick'}>
          <div className={styles.vr2}>
            <div className={styles.vr1}>
              <h3>Rating</h3>
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

        <div id={'win-loss-count-by-period-chart'} className={styles.vr2}>
          <div className={styles.vr1}>
            <h3>Result</h3>
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
            series={Object.keys(props.countByDate.data).reduce(
              (sum: { data: number[]; name: string }[], key: string) => {
                return [
                  ...sum,
                  {
                    name: key,
                    data: props.countByDate.data[key as GameResult],
                  },
                ];
              },
              [],
            )}
            type={'bar'}
            height={300}
          />
        </div>

        <div id={'win-loss-multi-line-chart'}>
          <div className={styles.vr2}>
            <h3>Win/Loss</h3>
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

        <div id={'rating-average-chart'}>
          <div className={styles.vr2}>
            <ul className={styles.stereo}>
              <li>
                <h3>Average Rating</h3>
              </li>
              <li>
                <Menu compact={true}>
                  <Dropdown
                    compact={true}
                    simple={true}
                    item={true}
                    defaultValue={props.movingAveragePeriod}
                    onChange={(_, data: DropdownProps) =>
                      props.onChangeMovingAverage(data?.value as MovingAveragePeriod)
                    }
                    options={averageTimeframeOptionList}
                  />
                </Menu>
              </li>
            </ul>
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
                name: 'Average Rating',
                data: movingAverageChartData,
              },
            ]}
            type={'line'}
            height={300}
          />
        </div>
      </section>
    </div>
  );
};

ValueOverTimeCharts.displayName = 'CandlestickChart';
ValueOverTimeCharts.defaultProps = {};
