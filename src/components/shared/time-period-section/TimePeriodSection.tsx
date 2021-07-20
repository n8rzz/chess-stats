import React from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Container, Grid, List, Statistic } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { CandlestickChart } from '../../ui/candlestick/CandlestickChart';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  gameCollection: GameCollection;
  heading: string;
}

export const TimePeriodSection: React.FC<IProps> = (props) => {
  const ohlcData = React.useMemo(() => props.gameCollection.calculateOhlcForPeriod(), [props.gameCollection]);
  const movingAverage = React.useMemo(() => props.gameCollection.calculateMovingAverageWithOhlcAndPeriod(ohlcData, 5), [
    props.gameCollection,
  ]);
  const gamesBySide = React.useMemo(() => props.gameCollection.countGamesBySide(), [props.gameCollection]);
  const gameResults = React.useMemo(() => props.gameCollection.gatherGameResults(), [props.gameCollection]);

  return (
    <div className={styles.container}>
      <Container className={clsx(styles.container)} textAlign={'center'}>
        <List className={styles.mixContainerCenter} size={'mini'} horizontal={true} relaxed={true}>
          <List.Item>
            <Statistic size={'mini'}>
              <Statistic.Value>{props.gameCollection.findEarliestGameDate().toLocaleDateString()}</Statistic.Value>
              <Statistic.Label>{`Start - ${props.gameCollection.findEarliestRating()}`}</Statistic.Label>
            </Statistic>
          </List.Item>
          <List.Item>
            <Statistic size={'tiny'}>
              <Statistic.Value>{props.gameCollection.findMinRating()}</Statistic.Value>
              <Statistic.Label>{'Period Low'}</Statistic.Label>
            </Statistic>
          </List.Item>
          <List.Item>
            <Statistic size={'small'}>
              <Statistic.Value>{props.gameCollection.length}</Statistic.Value>
              <Statistic.Label>{'Games'}</Statistic.Label>
            </Statistic>
          </List.Item>
          <List.Item>
            <Statistic size={'tiny'}>
              <Statistic.Value>{props.gameCollection.findMaxRating()}</Statistic.Value>
              <Statistic.Label>{'Period High'}</Statistic.Label>
            </Statistic>
          </List.Item>
          <List.Item>
            <Statistic size={'mini'}>
              <Statistic.Value>{props.gameCollection.findLatestGameDate().toLocaleDateString()}</Statistic.Value>
              <Statistic.Label>{`End ${props.gameCollection.findLatestRating()}`}</Statistic.Label>
            </Statistic>
          </List.Item>
        </List>
      </Container>

      <section className={clsx(styles.container, styles.vr2)}>
        <Grid columns={2}>
          <Grid.Column>
            <Chart
              series={[gamesBySide.black, gamesBySide.white]}
              options={{
                dataLabels: {
                  enabled: false,
                },
                title: {
                  text: 'Side',
                  align: 'left',
                },
                labels: ['black', 'white'],
                legend: {
                  position: 'left',
                  formatter: (seriesName, opts) => `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}`,
                  horizontalAlign: 'left',
                },
              }}
              type={'pie'}
              height={175}
            />
          </Grid.Column>

          <Grid.Column>
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
                title: {
                  text: 'Result',
                  align: 'right',
                },
                labels: Object.keys(gameResults),
                legend: {
                  formatter: (seriesName, opts) => `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}`,
                  horizontalAlign: 'right',
                },
              }}
              type={'pie'}
              height={175}
            />
          </Grid.Column>
        </Grid>
      </section>

      <section className={clsx(styles.container, styles.vr2)}>
        <CandlestickChart
          countByDate={props.gameCollection.countByDate()}
          ohlcData={ohlcData}
          movingAverage={movingAverage}
        />
      </section>

      <section>{'openings black / white'}</section>
    </div>
  );
};

TimePeriodSection.displayName = 'TimePeriodSection';
TimePeriodSection.defaultProps = {};
