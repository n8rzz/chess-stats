import axios, { AxiosResponse } from 'axios';
import { flatten } from 'lodash';
import { GameCollection } from './models/Game.collection';
import { IGame, IGameArchiveListResponse, IGameArchiveResponse } from './games.types';
import { ApiUrl } from '../../constants/api-url.constants';

export const getArchives = async (username: string): Promise<string[]> => {
  const url = ApiUrl.GameArchives.replace(':username', username);

  return axios
    .get<IGameArchiveListResponse>(url)
    .then((response: AxiosResponse<IGameArchiveListResponse>) => response.data.archives);
};

export const getGameArchiveForUrl = async (url: string): Promise<IGame[]> => {
  return axios
    .get<IGameArchiveResponse>(url)
    .then((response: AxiosResponse<IGameArchiveResponse>) => response.data.games);
};

export const getHistorcialGamesFromArchiveList = async (
  archiveList: string[],
  username: string,
): Promise<GameCollection> => {
  const gameArchiveForMonthRequestList = [];

  for (let i = 0; i < archiveList.length; i++) {
    const archiveUrl = archiveList[i];

    try {
      const response = await getGameArchiveForUrl(archiveUrl);

      gameArchiveForMonthRequestList.push(response);
    } catch (error) {
      console.error(error);
    }
  }

  const flatGameList = flatten(gameArchiveForMonthRequestList);

  return Promise.resolve(new GameCollection(username, flatGameList, flatGameList.length));
};
