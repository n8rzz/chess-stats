import * as React from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
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

  return (
    <div>
      <section className={clsx(styles.container, styles.vr2)}>
        <div id={'rating-over-time-chart-candlestick'}>
          <div className={styles.vr2}>
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
        <div>
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
            series={[
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
            ]}
            type={'bar'}
            height={300}
          />
        </div>
      </section>

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
                  onChange={(_, data: DropdownProps) => props.onChangeMovingAverage(data?.value as MovingAveragePeriod)}
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
    </div>
  );
};

ValueOverTimeCharts.displayName = 'CandlestickChart';
ValueOverTimeCharts.defaultProps = {};
