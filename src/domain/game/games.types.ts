import { GameResult, ChessRules, TimeClass, PgnTurn } from './games.constants';
import { GameModel } from './models/Game.model';

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
  count: Record<GameResult, number>;
  date: string;
}

export interface IDayOhlc {
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
  volume: number;
}

export interface IGamesBySide {
  black: number;
  white: number;
}

export interface IDataLabel<T = number[]> {
  data: T;
  labels: string[];
}

export interface IWinLossCount {
  losses: number[];
  wins: number[];
}

export interface IMovingAverageChartData {
  date: string;
  value: number;
}

export interface PgnItem {
  commentDiag: unknown;
  moveNumber: 1;
  nag: unknown;
  notation: {
    check: unknown;
    col: string;
    fig: unknown;
    notation: string;
    promotion: unknown;
    row: string;
    strike: unknown;
  };
  turn: PgnTurn;
  variations: string[];
}
