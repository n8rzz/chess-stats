import React from 'react';
import dynamic from 'next/dynamic';
import { Card, Dropdown, DropdownProps, Menu } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { GameResultCountMap, IGamesBySide } from '../../../../domain/game/games.types';
import { GameResultFidelity } from './PeriodGameSummaryCharts.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  detailedGameResults: GameResultCountMap;
  gamesBySide: IGamesBySide;
  isLoading: boolean;
  simpleGameResults: {
    [key: string]: number;
  };
}

export const PeriodGameSummaryCharts: React.FC<IProps> = (props) => {
  const [gameResultFidelity, setGameResultFidelity] = React.useState<GameResultFidelity>('simple');

  const onChangeResultDetail = React.useCallback(
    (event: React.SyntheticEvent, data: DropdownProps) => {
      setGameResultFidelity(data.value as GameResultFidelity);
    },
    [gameResultFidelity],
  );

  const gameResultsChartData = React.useMemo(() => {
    if (gameResultFidelity === 'detailed') {
      return props.detailedGameResults;
    }

    return props.simpleGameResults;
  }, [gameResultFidelity, props.detailedGameResults, props.simpleGameResults]);

  return (
    <Card.Group itemsPerRow={2} stackable={true}>
      <Card>
        <Card.Content>
          <Card.Header as={'h3'}>Piece Color</Card.Header>
          <Card.Description>
            <Chart
              series={[props.gamesBySide.black, props.gamesBySide.white]}
              options={{
                dataLabels: {
                  enabled: false,
                },
                labels: ['black', 'white'],
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                    },
                  },
                ],
                legend: {
                  position: 'right',
                  formatter: (seriesName, opts) => `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}`,
                  horizontalAlign: 'left',
                },
              }}
              type={'donut'}
              height={175}
            />
          </Card.Description>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>
            <ul className={styles.stereo}>
              <li>
                <h3>Result</h3>
              </li>
              <li>
                <Menu compact={true}>
                  <Dropdown
                    compact={true}
                    simple={true}
                    item={true}
                    defaultValue={gameResultFidelity}
                    onChange={onChangeResultDetail}
                    options={[
                      {
                        key: 'simple',
                        text: 'Simple',
                        value: 'simple',
                      },
                      {
                        key: 'detailed',
                        text: 'Detailed',
                        value: 'detailed',
                      },
                    ]}
                  />
                </Menu>
              </li>
            </ul>
          </Card.Header>
          <Card.Description>
            {/*
              radar chart may be a better choice
              https://apexcharts.com/react-chart-demos/radar-charts/basic/
            */}
            <Chart
              series={Object.keys(gameResultsChartData).map((key: string) => gameResultsChartData[key])}
              options={{
                dataLabels: {
                  enabled: false,
                },
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200,
                      },
                      legend: {
                        position: 'bottom',
                      },
                    },
                  },
                ],
                labels: Object.keys(gameResultsChartData),
                legend: {
                  formatter: (seriesName, opts) => `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}`,
                  horizontalAlign: 'right',
                },
              }}
              type={'donut'}
              height={175}
            />
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

PeriodGameSummaryCharts.displayName = 'PeriodGameSummaryCharts';
PeriodGameSummaryCharts.defaultProps = {};
