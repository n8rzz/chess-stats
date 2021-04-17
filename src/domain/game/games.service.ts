import axios, { AxiosResponse } from 'axios';
import { flatten } from 'lodash';
import { GameCollection } from './models/Game.collection';
import {
  IGame,
  IGameArchiveListResponse,
  IGameArchiveResponse,
} from './games.types';

export const getArchives = async (
  username: string,
  period: number,
): Promise<string[]> =>
  axios
    .get<IGameArchiveListResponse>(
      `https://api.chess.com/pub/player/${username}/games/archives`,
    )
    .then((response: AxiosResponse<IGameArchiveListResponse>) => {
      const archivesResponse = response.data.archives;

      return archivesResponse.slice(
        Math.max(archivesResponse.length - period, 0),
      );
    });

export const getGameArchiveForUrl = async (url: string): Promise<IGame[]> =>
  axios
    .get<IGameArchiveResponse>(url)
    .then(
      (response: AxiosResponse<IGameArchiveResponse>) => response.data.games,
    );

export const getHistorcialGamesFromArchiveList = async (
  archiveList: string[],
  username: string,
): Promise<GameCollection> => {
  const gameArchiveForMonthRequestList = archiveList.map(
    (archiveUrl: string) => () => getGameArchiveForUrl(archiveUrl),
  );

  return Promise.all([...gameArchiveForMonthRequestList.map((c) => c())]).then(
    (response: IGame[][]) => {
      const flatGamesResponse = flatten(response);

      return new GameCollection(username, flatGamesResponse);
    },
  );
};
