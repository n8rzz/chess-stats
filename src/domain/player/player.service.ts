import axios, { AxiosResponse } from 'axios';
import { IPlayerStats } from './player.types';

export const getPlayerStats = async (username: string): Promise<IPlayerStats> => {
  return axios
    .get<IPlayerStats>(`https://api.chess.com/pub/player/${username}/stats`)
    .then((response: AxiosResponse<IPlayerStats>) => response.data);
};
