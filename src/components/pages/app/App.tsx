import React, { useMemo } from 'react';
import { Dimmer, Loader, Segment, Tab, TabProps, Image } from 'semantic-ui-react';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { getArchives, getHistorcialGamesFromArchiveList } from '../../../domain/game/games.service';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { getPlayerStats } from '../../../domain/player/player.service';
import { IPlayerStats } from '../../../domain/player/player.types';
import { TimePeriodSection } from '../../shared/time-period-section/TimePeriodSection';
import { PlayerStats } from './player-stats/PlayerStats';
import { HighLowScore } from '../../shared/high-low-score/HighLowScore';
import { Timeframe, timeframeLabel } from './app.constants';
import { AppHeader } from '../../shared/app-header/AppHeader';
import { EmptyView } from './EmptyView';

interface IProps {}

export const App: React.FC<IProps> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [playerStatsModel, setPlayerStatsModel] = React.useState<IPlayerStats>(undefined as any);
  const [gameCollection, setGameCollection] = React.useState<GameCollection>(new GameCollection('', [], 0));
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(1);

  const onActiveTabChange = React.useCallback(
    (event: React.SyntheticEvent<HTMLDivElement>, data: TabProps) => {
      setIsLoading(true);
      setActiveTabIndex(data.activeTabIndex);
      setIsLoading(false);
    },
    [isLoading, activeTabIndex],
  );

  const onSubmit = async (provider: string, username: string, selectedTimeframe: Timeframe) => {
    setIsLoading(true);

    const nextActiveTabIndex = Object.keys(timeframeLabel).indexOf(selectedTimeframe);

    try {
      const playerStats = await getPlayerStats(username);
      const gameArchiveList = await getArchives(username);
      const collection = await getHistorcialGamesFromArchiveList(gameArchiveList, username);

      setActiveTabIndex(nextActiveTabIndex);
      setPlayerStatsModel(playerStats);
      setGameCollection(collection);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const todayCollection = useMemo(() => gameCollection.createCollectionForPeriod(1), [gameCollection]);
  const sevenDaysCollection = useMemo(() => gameCollection.createCollectionForPeriod(7), [gameCollection]);
  const thirtyDaysCollection = useMemo(() => gameCollection.createCollectionForPeriod(30), [gameCollection]);
  const ninetyDaysCollection = useMemo(() => gameCollection.createCollectionForPeriod(90), [gameCollection]);
  const sixMonthsCollection = useMemo(() => gameCollection.createCollectionForPeriod(180), [gameCollection]);
  const oneYearCollection = useMemo(() => gameCollection.createCollectionForPeriod(365), [gameCollection]);
  const isEmpty = useMemo(() => !isLoading && gameCollection.length === 0, [isLoading, gameCollection.length]);

  const tabPanes = useMemo(() => {
    return [
      {
        menuItem: timeframeLabel[Timeframe.Today],
        // eslint-disable-next-line react/display-name
        render: () => (
          <TimePeriodSection
            heading={timeframeLabel[Timeframe.Today]}
            gameCollection={todayCollection}
            isLoading={isLoading}
          />
        ),
      },
      {
        menuItem: timeframeLabel[Timeframe.SevenDays],
        // eslint-disable-next-line react/display-name
        render: () => (
          <TimePeriodSection
            heading={timeframeLabel[Timeframe.SevenDays]}
            gameCollection={sevenDaysCollection}
            isLoading={isLoading}
          />
        ),
      },
      {
        menuItem: timeframeLabel[Timeframe.ThirtyDays],
        // eslint-disable-next-line react/display-name
        render: () => (
          <TimePeriodSection
            heading={timeframeLabel[Timeframe.ThirtyDays]}
            gameCollection={thirtyDaysCollection}
            isLoading={isLoading}
          />
        ),
      },
      {
        menuItem: timeframeLabel[Timeframe.NinetyDays],
        // eslint-disable-next-line react/display-name
        render: () => (
          <TimePeriodSection
            heading={timeframeLabel[Timeframe.NinetyDays]}
            gameCollection={ninetyDaysCollection}
            isLoading={isLoading}
          />
        ),
      },
      {
        menuItem: timeframeLabel[Timeframe.SixMonths],
        // eslint-disable-next-line react/display-name
        render: () => (
          <TimePeriodSection
            heading={timeframeLabel[Timeframe.SixMonths]}
            gameCollection={sixMonthsCollection}
            isLoading={isLoading}
          />
        ),
      },
      {
        menuItem: timeframeLabel[Timeframe.OneYear],
        // eslint-disable-next-line react/display-name
        render: () => (
          <TimePeriodSection
            heading={timeframeLabel[Timeframe.OneYear]}
            gameCollection={oneYearCollection}
            isLoading={isLoading}
          />
        ),
      },
    ];
  }, [isLoading, gameCollection]);

  return (
    <div>
      <AppHeader onClickSearch={onSubmit} />

      {isEmpty && <EmptyView />}
      {isLoading && (
        <Segment style={{ border: 0, height: '80vh' }}>
          <Dimmer active={true} inverted={true}>
            <Loader size="large">{'Loading'}</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      )}
      {gameCollection.length > 0 && (
        <React.Fragment>
          <div className={clsx(styles.container, styles.vr3)}>
            <PlayerStats isLoading={isLoading} label={'Rapid'} stats={playerStatsModel?.chess_rapid} />
            <Tab
              activeIndex={activeTabIndex}
              onTabChange={onActiveTabChange}
              menu={{ attached: false, tabular: false, pointing: false }}
              panes={tabPanes}
            />
          </div>

          <HighLowScore isLoading={isLoading} label={'Tactics'} highLow={playerStatsModel.tactics} />
        </React.Fragment>
      )}
    </div>
  );
};

App.displayName = 'App';
App.defaultProps = {};
