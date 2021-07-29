import React from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Dimmer, Grid, Loader, Segment, Tab } from 'semantic-ui-react';
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
        <TimePeriodSummary gameCollection={props.gameCollection} isLoading={props.isLoading} />
      </section>

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

      <section>
        <Openings collection={props.gameCollection} />
      </section>
    </Tab.Pane>
  );
};

TimePeriodSection.displayName = 'TimePeriodSection';
TimePeriodSection.defaultProps = {};
