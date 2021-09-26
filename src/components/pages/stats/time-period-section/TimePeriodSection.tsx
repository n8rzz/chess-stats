import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { GameCollection } from '../../../../domain/game/models/Game.collection';
import { TimePeriodSummary } from './TimePeriodSummary';
import { PeriodGameSummaryCharts } from '../period-game-summary-charts/PeriodGameSummaryCharts';
import { Openings } from '../openings/Openings';
import { MovingAveragePeriod, TimeClass } from '../../../../domain/game/games.constants';
import { CandlestickChart } from '../../../ui/candlestick-chart/CandlestickChart';
import { AverageRatingChart } from '../../../ui/average-rating-chart/AverageRatingChart';
import { OpponentRatingsScatterChart } from '../../../ui/opponent-ratings-scatter-chart/OpponentRatingsScatterChart';
import { OpponentAccuracyScatterChart } from '../../../ui/accuracy-scatter-chart/AccuracyScatterChart';
import { GameResultsOverTime } from '../game-results-over-time/GameResultsOverTime';
import { Timeframe } from '../StatsPage.constants';

interface IProps {
  gameCollection: GameCollection;
  isLoading: boolean;
  timeClass: TimeClass;
  timeframe: Timeframe;
}

export const TimePeriodSection: React.FC<IProps> = (props) => {
  const [movingAveragePeriod, setMovingAveragePeriod] = React.useState<MovingAveragePeriod>(
    MovingAveragePeriod.FiveDays,
  );

  const ohlcData = React.useMemo(() => props.gameCollection.calculateOhlcForPeriod(), [
    props.gameCollection.period,
    props.timeClass,
    props.timeframe,
    props.isLoading,
  ]);
  const movingAverage = React.useMemo(() => {
    return props.gameCollection.calculateMovingAverageWithOhlcAndPeriod(ohlcData, movingAveragePeriod);
  }, [movingAveragePeriod, props.gameCollection, props.timeClass, props.timeframe, props.isLoading]);

  if (props.gameCollection.length === 0) {
    return null;
  }

  if (props.isLoading) {
    return (
      <Segment placeholder={true}>
        <Dimmer active={true} inverted={true}>
          <Loader content={'Loading...'} indeterminate={true} />
        </Dimmer>
      </Segment>
    );
  }

  return (
    <div>
      <section className={styles.vr2}>
        <TimePeriodSummary
          earliestGameDate={props.gameCollection.findEarliestGameDate()?.toLocaleDateString()}
          earliestRating={props.gameCollection.findEarliestRating()}
          gameCount={props.gameCollection.length}
          isLoading={props.isLoading}
          isOpenGreaterThanClose={props.gameCollection.isOpenGreaterThanClose}
          isOpenLessThanClose={props.gameCollection.isOpenLessThanClose}
          latestGameDate={props.gameCollection.findLatestGameDate()?.toLocaleDateString()}
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
        <GameResultsOverTime
          countResultsByDate={props.gameCollection.countResultsByDate()}
          countWinLossByPeriod={props.gameCollection.countWinLossByPeriodWithAverage()}
        />
        <OpponentAccuracyScatterChart
          title={'Accuracy'}
          opponentAndUserAccuracyByDate={props.gameCollection.gatherOpponentAndUserAccuracyByDate()}
        />
        <OpponentRatingsScatterChart
          title={'Ratings'}
          opponentAndUserRatingsByDate={props.gameCollection.gatherOpponentAndUserRatingsByDate()}
        />
      </section>
      <Openings collection={props.gameCollection} timeframe={props.timeframe} />
    </div>
  );
};

TimePeriodSection.displayName = 'TimePeriodSection';
TimePeriodSection.defaultProps = {};
