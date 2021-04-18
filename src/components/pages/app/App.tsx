import React from 'react';
import {
  getArchives,
  getHistorcialGamesFromArchiveList,
} from '../../../domain/game/games.service';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { getPlayerStats } from '../../../domain/player/player.service';
import { IPlayerStats } from '../../../domain/player/player.types';
import { GameStats } from './GameStats';
import { PlayerStats } from './PlayerStats';
import { UserForm } from './UserForm';

interface IProps {}

export const App: React.FC<IProps> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [playerStatsModel, setPlayerStatsModel] = React.useState<IPlayerStats>(
    undefined as any,
  );
  const [gameCollection, setGameCollection] = React.useState<GameCollection>(
    new GameCollection('', []),
  );

  const onSubmit = async (
    provider: string,
    username: string,
    period: number,
  ) => {
    setIsLoading(true);

    try {
      const playerStats = await getPlayerStats(username);
      const gameArchiveList = await getArchives(username, period);
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

  console.log('+++', gameCollection);

  return (
    <div>
      <h1>{'Chess Stats'}</h1>

      <UserForm onSubmit={onSubmit} />
      <PlayerStats
        isLoading={isLoading}
        player={playerStatsModel}
        username={gameCollection.username}
      />
      <GameStats isLoading={isLoading} gameCollection={gameCollection} />
    </div>
  );
};

App.displayName = 'App';
App.defaultProps = {};
