import React from 'react';
import { Dimmer, Loader, Segment, Tab } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { TimePeriodSummary } from './TimePeriodSummary';
import { PeriodGameSummaryCharts } from '../period-game-summary-charts/PeriodGameSummaryCharts';
import { Openings } from '../openings/Openings';
import { Timeframe } from '../../pages/app/app.constants';
import { MovingAveragePeriod } from '../../../domain/game/games.constants';
import { CandlestickChart } from '../../ui/candlestick-chart/CandlestickChart';
import { AverageRatingChart } from '../../ui/average-rating-chart/AverageRatingChart';
import { WinLossCountChart } from '../../ui/win-loss-count-chart/WinLossCountChart';
import { WinLossMultiLineChart } from '../../ui/win-loss-multi-line-chart/WinLossMultiLineChart';

interface IProps {
  gameCollection: GameCollection;
  heading: string;
  isLoading: boolean;
  timeframe: Timeframe;
}

export const TimePeriodSection: React.FC<IProps> = (props) => {
  const [movingAveragePeriod, setMovingAveragePeriod] = React.useState<MovingAveragePeriod>(
    MovingAveragePeriod.FiveDays,
  );

  const ohlcData = React.useMemo(() => props.gameCollection.calculateOhlcForPeriod(), [props.gameCollection.period]);
  const movingAverage = React.useMemo(() => {
    return props.gameCollection.calculateMovingAverageWithOhlcAndPeriod(ohlcData, movingAveragePeriod);
  }, [movingAveragePeriod, props.gameCollection]);

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
          detailedGameResults={props.gameCollection.gatherDetailedGameResults()}
          gamesBySide={props.gameCollection.countGamesBySide()}
          isLoading={props.isLoading}
          simpleGameResults={props.gameCollection.gatherSimpleGameResults()}
        />
      </section>
      <section className={styles.vr2}>
        <CandlestickChart ohlcData={props.gameCollection.buildOhlcChartData()} title={'Rating'} />
        <AverageRatingChart
          movingAverage={movingAverage}
          movingAveragePeriod={movingAveragePeriod}
          onChangeMovingAverage={setMovingAveragePeriod}
          title={'Average Rating'}
          timeframe={props.timeframe}
        />
        <WinLossCountChart
          countByDate={props.gameCollection.countByDate()}
          onChangeMovingAverage={setMovingAveragePeriod}
          title={'Detailed Results'}
        />
        <WinLossMultiLineChart
          title={'Wins and Losses'}
          winLossByPeriod={props.gameCollection.countWinLossByPeriod()}
        />
      </section>
      <section>
        <Openings collection={props.gameCollection} timeframe={props.timeframe} />
      </section>
    </Tab.Pane>
  );
};

TimePeriodSection.displayName = 'TimePeriodSection';
TimePeriodSection.defaultProps = {};
