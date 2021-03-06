import * as React from 'react';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { IMovingAverageChartData } from '../../../domain/game/games.types';
import { Menu, Dropdown, DropdownProps } from 'semantic-ui-react';
import { MovingAveragePeriod } from '../../../domain/game/games.constants';
import { Timeframe } from '../../pages/stats/StatsPage.constants';
import { averageTimeframeOptionList } from './AverageRatingChart.constants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  movingAverage: IMovingAverageChartData[];
  movingAveragePeriod: MovingAveragePeriod;
  onChangeMovingAverage: (nextPeriod: MovingAveragePeriod) => void;
  timeframe: Timeframe;
  title: string;
}

export const AverageRatingChart: React.FC<IProps> = (props) => {
  const movingAverageChartData = React.useMemo(() => {
    return props.movingAverage.map((item: IMovingAverageChartData) => ({
      x: item.date,
      y: item.value,
    }));
  }, [props.movingAverage, props.movingAveragePeriod]);

  return (
    <div id={'rating-average-chart'}>
      <div className={styles.vr2}>
        <ul className={styles.stereo}>
          <li>
            <h3>{props.title}</h3>
          </li>
          <li>
            <Menu compact={true}>
              <Dropdown
                compact={true}
                simple={true}
                item={true}
                defaultValue={props.movingAveragePeriod}
                onChange={(_, data: DropdownProps) => props.onChangeMovingAverage(data?.value as MovingAveragePeriod)}
                options={averageTimeframeOptionList[props.timeframe]}
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
  );
};

AverageRatingChart.displayName = 'AverageRatingChart';
AverageRatingChart.defaultProps = {};
