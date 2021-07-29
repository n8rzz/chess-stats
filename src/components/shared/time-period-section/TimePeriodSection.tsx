import React from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Card, Dimmer, Loader, Segment, Tab } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { CandlestickChart } from '../../ui/candlestick/CandlestickChart';
import { Openings } from '../../pages/app/openings/Openings';
import { TimePeriodSummary } from './TimePeriodSummary';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  gameCollection: GameCollection;
  heading: string;
  isLoading: boolean;
}

export const TimePeriodSection: React.FC<IProps> = (props) => {
  const ohlcData = React.useMemo(() => props.gameCollection.calculateOhlcForPeriod(), [props.gameCollection.period]);
  const movingAverage = React.useMemo(() => props.gameCollection.calculateMovingAverageWithOhlcAndPeriod(ohlcData, 5), [
    props.gameCollection,
  ]);
  const gamesBySide = React.useMemo(() => props.gameCollection.countGamesBySide(), [props.gameCollection]);
  const gameResults = React.useMemo(() => props.gameCollection.gatherGameResults(), [props.gameCollection]);

  return (
    <Tab.Pane style={{ border: 0 }}>
      {props.isLoading && (
        <Segment placeholder={true}>
          <Dimmer active={true} inverted={true}>
            <Loader content={'Loading...'} indeterminate={true} />
          </Dimmer>
        </Segment>
      )}

      <section className={styles.vr2}>
        <TimePeriodSummary
          earliestGameDate={props.gameCollection.findEarliestGameDate().toLocaleDateString()}
          earliestRating={props.gameCollection.findEarliestRating()}
          gameCount={props.gameCollection.length}
          isLoading={props.isLoading}
          isOpenGreaterThanClose={props.gameCollection.isOpenGreaterThanClose}
          isOpenLessThanClose={props.gameCollection.isOpenLessThanClose}
          latestGameDate={props.gameCollection.findLatestGameDate().toLocaleDateString()}
          latestRating={props.gameCollection.findLatestRating()}
          maxRating={props.gameCollection.findMaxRating()}
          minRating={props.gameCollection.findMinRating()}
        />
      </section>

      <section className={styles.vr2}>
        <Card.Group itemsPerRow={2} stackable={true}>
          <Card>
            <Card.Content>
              <Card.Header as={'h3'}>Piece Color</Card.Header>
              <Card.Description>
                <Chart
                  series={[gamesBySide.black, gamesBySide.white]}
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
                  series={Object.keys(gameResults).map((key: string) => gameResults[key])}
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
                    labels: Object.keys(gameResults),
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
      </section>

      <section className={clsx(styles.container, styles.vr2)}>
        <CandlestickChart
          countByDate={props.gameCollection.countByDate()}
          ohlcData={ohlcData}
          movingAverage={movingAverage}
        />
      </section>

      <section>
        <Openings collection={props.gameCollection} />
      </section>
    </Tab.Pane>
  );
};

TimePeriodSection.displayName = 'TimePeriodSection';
TimePeriodSection.defaultProps = {};
