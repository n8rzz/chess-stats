/* eslint-disable arrow-body-style */
import axios, { AxiosResponse } from 'axios';
import { flatten } from 'lodash';
import { GameCollection } from './models/Game.collection';
import {
  IGame,
  IGameArchiveListResponse,
  IGameArchiveResponse,
} from './games.types';

export const getArchives = async (username: string): Promise<string[]> => {
  return axios
    .get<IGameArchiveListResponse>(
      `https://api.chess.com/pub/player/${username}/games/archives`,
    )
    .then(
      (response: AxiosResponse<IGameArchiveListResponse>) =>
        response.data.archives,
    );
};

export const getGameArchiveForUrl = async (url: string): Promise<IGame[]> => {
  return axios
    .get<IGameArchiveResponse>(url)
    .then(
      (response: AxiosResponse<IGameArchiveResponse>) => response.data.games,
    );
};

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

      return new GameCollection(username, flatGamesResponse, 0);
    },
  );
};
