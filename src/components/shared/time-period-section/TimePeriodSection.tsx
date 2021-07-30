import React from 'react';
import clsx from 'clsx';
import { Dimmer, Loader, Segment, Tab } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { CandlestickChart } from '../../ui/candlestick/CandlestickChart';
import { Openings } from '../../pages/app/openings/Openings';
import { TimePeriodSummary } from './TimePeriodSummary';
import { PeriodGameSummaryCharts } from '../period-game-summary-charts/PeriodGameSummaryCharts';

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
        <PeriodGameSummaryCharts
          gameResults={props.gameCollection.gatherGameResults()}
          gamesBySide={props.gameCollection.countGamesBySide()}
          isLoading={props.isLoading}
        />
      </section>
      <section className={clsx(styles.container, styles.vr2)}>
        <CandlestickChart
          countByDate={props.gameCollection.countByDate()}
          ohlcData={props.gameCollection.buildOhlcChartData()}
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
