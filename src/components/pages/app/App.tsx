import React, { useMemo } from 'react';
import { Dimmer, Header, Loader, Segment, Tab } from 'semantic-ui-react';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { getArchives, getHistorcialGamesFromArchiveList } from '../../../domain/game/games.service';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { getPlayerStats } from '../../../domain/player/player.service';
import { IPlayerStats } from '../../../domain/player/player.types';
import { TimePeriodSection } from '../../shared/time-period-section/TimePeriodSection';
import { PlayerStats } from './player-stats/PlayerStats';
import { UserForm } from './UserForm';
import { HighLowScore } from '../../shared/high-low-score/HighLowScore';
import { Timeframe, timeframeLabel } from './app.constants';

interface IProps {}

export const App: React.FC<IProps> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [playerStatsModel, setPlayerStatsModel] = React.useState<IPlayerStats>(undefined as any);
  const [gameCollection, setGameCollection] = React.useState<GameCollection>(new GameCollection('', [], 0));
  const [defaultActiveTabIndex, setDefaultActiveTabIndex] = React.useState<number>(1);

  const onSubmit = async (provider: string, username: string, selectedTimeframe: Timeframe) => {
    setIsLoading(true);

    const nextActiveTabIndex = Object.keys(timeframeLabel).indexOf(selectedTimeframe);

    try {
      const playerStats = await getPlayerStats(username);
      const gameArchiveList = await getArchives(username);
      const collection = await getHistorcialGamesFromArchiveList(gameArchiveList, username);

      setDefaultActiveTabIndex(nextActiveTabIndex);
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

  return (
    <div>
      <div className={styles.container}>
        <Header as={'h1'}>{'Chess Stats'}</Header>
      </div>

      <div className={styles.vr4}>
        <UserForm onSubmit={onSubmit} />
      </div>

      {isLoading && (
        <Segment placeholder={true}>
          <Dimmer active={true} inverted={true}>
            <Loader content={'Loading...'} indeterminate={true} />
          </Dimmer>
        </Segment>
      )}
      {!isLoading && gameCollection.length === 0 && <div className={styles.container}>{'No Games'}</div>}
      {gameCollection.length > 0 && (
        <>
          <div className={clsx(styles.container, styles.vr3)}>
            <Tab
              defaultActiveIndex={defaultActiveTabIndex}
              menu={{ pointing: true, secondary: true }}
              panes={[
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
              ]}
            />
          </div>

          <HighLowScore isLoading={isLoading} label={'Tactics'} highLow={playerStatsModel.tactics} />
          <PlayerStats isLoading={isLoading} label={'Rapid'} stats={playerStatsModel?.chess_rapid} />
        </>
      )}
    </div>
  );
};

App.displayName = 'App';
App.defaultProps = {};
