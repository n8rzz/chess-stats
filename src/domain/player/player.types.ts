/* eslint-disable camelcase */
export interface IDateRating {
  date: number;
  rating: number;
}

export interface IChessStats {
  last: {
    rating: number;
    date: number;
    rd: number;
  };
  best: {
    rating: number;
    date: number;
    game: string;
  };
  record: {
    win: number;
    loss: number;
    draw: number;
  };
}

export interface IPlayerStats {
  chess_blitz: IChessStats;
  chess_rapid: IChessStats;
  fide: number;
  tactics: {
    highest: IDateRating;
    lowest: IDateRating;
  };
  lessons: {
    highest: IDateRating;
    lowest: IDateRating;
  };
  puzzle_rush: {
    daily: {
      total_attempts: number;
      score: number;
    };
    best: {
      total_attempts: number;
      score: number;
    };
  };
}
