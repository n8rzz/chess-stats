import { GameResult, ChessRules, TimeClass, PgnTurn, WinLossDraw } from './games.constants';
import { GameModel } from './models/Game.model';

export interface IGameAccuracies {
  black: number;
  white: number;
}

export interface IGamePlayer {
  '@id': string;
  rating: number;
  result: GameResult;
  username: string;
}
export interface IGame {
  accuracies: IGameAccuracies;
  black: IGamePlayer;
  end_time: number;
  fen: string;
  initial_setup: string;
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

/**
 * Where `key` is a date
 */
export interface IGamesByPeriodInterval {
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

export interface IOhlcChartData {
  x: string;
  y: number[];
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
  moveNumber: number;
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

export interface IOpeningMoveMap {
  [key: string]: {
    [key in WinLossDraw]: number;
  };
}

export interface ICountByDate {
  data: Record<GameResult, number[]>;
  labels: string[];
}

export interface IWinLossDrawByPeriod {
  [key: string]: {
    [WinLossDraw.Draw]: number;
    [WinLossDraw.Loss]: number;
    [WinLossDraw.Win]: number;
  };
}

export interface IWinLossDrawSumByPeriod {
  [key: string]: {
    [WinLossDraw.Draw]: number;
    [WinLossDraw.Loss]: number;
    [WinLossDraw.Win]: number;
    sum: number;
  };
}

export type GameResultCountMap = Record<Partial<GameResult>, number>;

export type SimpleGameResultCountMap = Record<Partial<WinLossDraw>, number>;

export interface IOpponentRatingScatterChartData {
  maxRating: number;
  minRating: number;
  opponent: [Date, number][];
  user: [Date, number][];
}

export interface IOpponentAccuracyScatterChartData {
  opponent: [Date, number][];
  user: [Date, number][];
}

export interface IBookOpening {
  eco: string;
  moves: string;
  name: string;
}
