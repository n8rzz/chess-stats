export interface IDateRating {
  date: number;
  rating: number;
}

export interface IHighLow {
  highest: IDateRating;
  lowest: IDateRating;
}

export interface IChessStats {
  best: {
    date: number;
    game: string;
    rating: number;
  };
  last: {
    date: number;
    rating: number;
    rd: number;
  };
  record: {
    draw: number;
    loss: number;
    win: number;
  };
}

export interface IPlayerStats {
  chess_blitz: IChessStats;
  chess_rapid: IChessStats;
  fide: number;
  lessons: IHighLow;
  puzzle_rush: {
    best: {
      score: number;
      total_attempts: number;
    };
    daily: {
      score: number;
      total_attempts: number;
    };
  };
  tactics: IHighLow;
}
