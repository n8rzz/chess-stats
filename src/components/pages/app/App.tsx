import React, { useMemo } from 'react';
import { Header, Tab } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import {
  getArchives,
  getHistorcialGamesFromArchiveList,
} from '../../../domain/game/games.service';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { getPlayerStats } from '../../../domain/player/player.service';
import { IPlayerStats } from '../../../domain/player/player.types';
import { TimePeriodSection } from '../../shared/time-period-section/TimePeriodSection';
import { PlayerStats } from './player-stats/PlayerStats';
import { UserForm } from './UserForm';

interface IProps {}

export const App: React.FC<IProps> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [playerStatsModel, setPlayerStatsModel] = React.useState<IPlayerStats>(
    undefined as any,
  );
  const [gameCollection, setGameCollection] = React.useState<GameCollection>(
    new GameCollection('', [], 0),
  );

  const onSubmit = async (provider: string, username: string) => {
    setIsLoading(true);

    try {
      const playerStats = await getPlayerStats(username);
      const gameArchiveList = await getArchives(username);
      const collection = await getHistorcialGamesFromArchiveList(
        gameArchiveList,
        username,
      );

      setPlayerStatsModel(playerStats);
      setGameCollection(collection);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const todayCollection = useMemo(
    // eslint-disable-next-line arrow-body-style
    () => gameCollection.createCollectionForPeriod(1),
    [gameCollection],
  );

  const sevenDaysCollection = useMemo(
    // eslint-disable-next-line arrow-body-style
    () => gameCollection.createCollectionForPeriod(7),
    [gameCollection],
  );

  const thirtyDaysCollection = useMemo(
    // eslint-disable-next-line arrow-body-style
    () => gameCollection.createCollectionForPeriod(30),
    [gameCollection],
  );

  const oneYearCollection = useMemo(
    // eslint-disable-next-line arrow-body-style
    () => gameCollection.createCollectionForPeriod(365),
    [gameCollection],
  );

  return (
    <div>
      <div className={styles.container}>
        <Header as={'h1'}>{'Chess Stats'}</Header>
      </div>

      <div className={styles.vr4}>
        <UserForm onSubmit={onSubmit} />
      </div>

      {isLoading && <div className={styles.container}>{'LOADING ...'}</div>}
      {!isLoading && gameCollection.length === 0 && (
        <div className={styles.container}>{'No Games'}</div>
      )}
      {gameCollection.length > 0 && (
        <>
          <PlayerStats
            isLoading={isLoading}
            player={playerStatsModel}
            username={gameCollection.username}
          />

          <div className={styles.container}>
            <Tab
              menu={{ pointing: true, secondary: true }}
              panes={[
                {
                  menuItem: 'Today',
                  render: () => (
                    <TimePeriodSection
                      heading={'Today'}
                      gameCollection={todayCollection}
                    />
                  ),
                },
                {
                  menuItem: '7 Days',
                  render: () => (
                    <TimePeriodSection
                      heading={'7 Days'}
                      gameCollection={sevenDaysCollection}
                    />
                  ),
                },
                {
                  menuItem: '30 Days',
                  render: () => (
                    <TimePeriodSection
                      heading={'30 Days'}
                      gameCollection={thirtyDaysCollection}
                    />
                  ),
                },
                {
                  menuItem: '1 Year',
                  render: () => (
                    <TimePeriodSection
                      heading={'1 Year'}
                      gameCollection={oneYearCollection}
                    />
                  ),
                },
              ]}
            />
          </div>
        </>
      )}
    </div>
  );
};

App.displayName = 'App';
App.defaultProps = {};
