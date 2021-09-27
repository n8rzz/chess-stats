import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { getArchives, getHistorcialGamesFromArchiveList } from '../../../domain/game/games.service';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { getPlayerStats } from '../../../domain/player/player.service';
import { IPlayerStats } from '../../../domain/player/player.types';
import { TimePeriodSection } from './time-period-section/TimePeriodSection';
import { PlayerStats } from './player-stats/PlayerStats';
import { Timeframe, timeframeToPeriod } from './StatsPage.constants';
import { TimeClass } from '../../../domain/game/games.constants';
import { appInsights, reactPlugin } from '../../context/AppInsightsContextProvider';
import { AppHeader } from '../shared/app-header/AppHeader';
import { useRouter } from 'next/router';
import { PageLoader } from '../shared/page-loader/PageLoader';
import { TimeOptions } from './time-options/TimeOptions';

interface IProps {}

export const StatsPage: React.FC<IProps> = (props) => {
  const router = useRouter();
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(false);
  const [playerStatsModel, setPlayerStatsModel] = React.useState<IPlayerStats>(undefined as any);
  const [activeTimeClass, setActiveTimeClass] = React.useState<TimeClass>(TimeClass.Rapid);
  const [activeTimeframe, setActiveTimeframe] = React.useState<Timeframe>(Timeframe.SevenDays);
  const [gameCollection, setGameCollection] = React.useState<GameCollection>(new GameCollection('', [], 0));

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    onPageLoad(
      router.query?.provider as string,
      router.query?.username as string,
      router.query?.timeframe as Timeframe,
      router.query?.timeClass as TimeClass,
    );
  }, [router.query]);

  const isLoading = React.useMemo(() => {
    return isDataLoading || !playerStatsModel || gameCollection.length === 0;
  }, [isDataLoading, playerStatsModel, gameCollection]);

  const collectionForTimeframeAndTimeClass = React.useMemo(() => {
    return gameCollection.createCollectionForPeriodAndTimeClass(timeframeToPeriod[activeTimeframe], activeTimeClass);
  }, [gameCollection, activeTimeframe, activeTimeClass]);

  const onPageLoad = async (
    provider: string,
    username: string,
    selectedTimeframe: Timeframe,
    selectedTimeClass: TimeClass,
  ) => {
    setIsDataLoading(true);

    try {
      appInsights?.setAuthenticatedUserContext(username, provider, true);
      appInsights?.startTrackEvent('DataLoad');

      const playerStats = await getPlayerStats(username);
      const gameArchiveList = await getArchives(username);
      const collection = await getHistorcialGamesFromArchiveList(gameArchiveList, username);

      appInsights?.stopTrackEvent(
        'DataLoad',
        {
          timeClass: selectedTimeClass,
          timeframe: selectedTimeframe,
        },
        {
          monthCount: gameArchiveList.length,
        },
      );
      reactPlugin?.trackEvent(
        {
          name: 'FirstDataLoad',
        },
        {
          timeClass: selectedTimeClass,
          timeframe: selectedTimeframe,
        },
      );

      setActiveTimeClass(selectedTimeClass);
      setActiveTimeframe(selectedTimeframe);
      setPlayerStatsModel(playerStats);
      setGameCollection(collection);
      setIsDataLoading(false);
    } catch (error) {
      console.log(error);

      setIsDataLoading(false);
      router.push({
        pathname: '/',
        query: {
          message: encodeURIComponent('Something went wrong'),
        },
      });
    }
  };

  const onClickPeriodButton = React.useCallback(
    (nextTimeframe: Timeframe) => {
      setIsDataLoading(true);
      reactPlugin?.trackEvent({ name: 'ChangeTimePeriod' }, { timeframe: nextTimeframe });
      setActiveTimeframe(nextTimeframe);
      setIsDataLoading(false);
    },
    [isDataLoading, activeTimeframe],
  );

  return (
    <React.Fragment>
      <AppHeader isLoading={isLoading} username={gameCollection?.username} />

      {isLoading && <PageLoader isActive={isLoading} />}
      {!isLoading && (
        <React.Fragment>
          <div className={clsx(styles.container, styles.vr3)}>
            <div className={styles.vr2}>
              <TimeOptions
                activeTimeClass={activeTimeClass}
                activeTimeframe={activeTimeframe}
                onChangeActiveTimeClass={setActiveTimeClass}
                onClickPeriodButton={onClickPeriodButton}
              />
            </div>

            <TimePeriodSection
              gameCollection={collectionForTimeframeAndTimeClass}
              isLoading={isLoading}
              timeClass={activeTimeClass}
              timeframe={activeTimeframe}
            />
          </div>

          <PlayerStats
            highLow={playerStatsModel?.tactics}
            isLoading={isLoading}
            label={'Rapid'}
            stats={playerStatsModel?.chess_rapid}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

StatsPage.displayName = 'StatsPage';
StatsPage.defaultProps = {};
