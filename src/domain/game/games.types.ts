/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import { GameModel } from './models/Game.model';

export enum GameResult {
  Agreed = 'agreed',
  Checkmated = 'checkmated',
  Resigned = 'resigned',
  Stalemate = 'stalemate',
  Timeout = 'timeout',
  Win = 'win',
}

export enum TimeClass {
  Blitz = 'blitz',
  Rapid = 'rapid',
}

export enum ChessRules {
  Chess = 'chess',
}

export interface IGamePlayer {
  '@id': string;
  rating: number;
  result: GameResult;
  username: string;
}

export interface IGame {
  black: IGamePlayer;
  end_time: number;
  fen: string;
  pgn: string;
  pgn_json: any;
  rated: boolean;
  rules: ChessRules;
  time_class: TimeClass;
  time_control: string;
  url: string;
  white: IGamePlayer;
}

export interface IGameArchiveListResponse {
  archives: string[];
}

export interface IGameArchiveResponse {
  games: IGame[];
}

export interface IGamesGroupedByDate {
  [key: string]: GameModel[];
}

export interface IGameCountByDate {
  date: string;
  count: number;
}

export interface IDayOhlc {
  date: string;
  close: number;
  high: number;
  low: number;
  open: number;
  volumn: number;
}

export interface IGamesBySide {
  black: number;
  white: number;
}

export interface ICountByDateChartData {
  data: number[];
  labels: string[];
}
