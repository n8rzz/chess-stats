import axios, { AxiosResponse } from 'axios';
import { ApiUrl } from '../../constants/api-url.constants';
import { IPlayerStats } from './player.types';

export const getPlayerStats = async (username: string): Promise<IPlayerStats> => {
  const url = ApiUrl.PlayerStats.replace(':username', username);

  return axios.get<IPlayerStats>(url).then((response: AxiosResponse<IPlayerStats>) => response.data);
};
