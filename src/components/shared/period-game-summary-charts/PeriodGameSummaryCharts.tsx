import React from 'react';
import dynamic from 'next/dynamic';
import { Card } from 'semantic-ui-react';
import { IGamesBySide } from '../../../domain/game/games.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  gameResults: {
    [key: string]: number;
  };
  gamesBySide: IGamesBySide;
  isLoading: boolean;
}

export const PeriodGameSummaryCharts: React.FC<IProps> = (props) => {
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
          <Card.Header as={'h3'}>Result</Card.Header>
          <Card.Description>
            {/*
                  radar chart may be a better choice
                  https://apexcharts.com/react-chart-demos/radar-charts/basic/
                */}
            <Chart
              series={Object.keys(props.gameResults).map((key: string) => props.gameResults[key])}
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
                labels: Object.keys(props.gameResults),
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
