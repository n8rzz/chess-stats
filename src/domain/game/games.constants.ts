export enum GameResult {
  Abandoned = 'abandoned',
  Agreed = 'agreed',
  BughousePartnerLose = 'bughousepartnerlose',
  Checkmated = 'checkmated',
  FiftyMove = 'fiftymove',
  Insufficient = 'insufficient',
  KingOfTheHill = 'kingofthehill',
  Lose = 'lose',
  Repetition = 'repetition',
  Resigned = 'resigned',
  Stalemate = 'stalemate',
  ThreeCheck = 'threecheck',
  TimeVsInsufficient = 'timevsinsufficient',
  Timeout = 'timeout',
  Win = 'win',
}

export enum MovingAveragePeriod {
  FifteenDays = 15,
  FiveDays = 5,
  TenDays = 10,
  ThirtyDays = 30,
}

export enum WinLossDraw {
  Draw = 'draw',
  Loss = 'loss',
  Win = 'win',
}

export const gameResultToWinLossDraw: Record<GameResult, WinLossDraw> = {
  [GameResult.Abandoned]: WinLossDraw.Draw,
  [GameResult.Agreed]: WinLossDraw.Draw,
  [GameResult.BughousePartnerLose]: WinLossDraw.Loss,
  [GameResult.Checkmated]: WinLossDraw.Loss,
  [GameResult.FiftyMove]: WinLossDraw.Draw,
  [GameResult.Insufficient]: WinLossDraw.Draw,
  [GameResult.KingOfTheHill]: WinLossDraw.Loss,
  [GameResult.Lose]: WinLossDraw.Loss,
  [GameResult.Repetition]: WinLossDraw.Draw,
  [GameResult.Resigned]: WinLossDraw.Loss,
  [GameResult.Stalemate]: WinLossDraw.Draw,
  [GameResult.ThreeCheck]: WinLossDraw.Loss,
  [GameResult.TimeVsInsufficient]: WinLossDraw.Draw,
  [GameResult.Timeout]: WinLossDraw.Loss,
  [GameResult.Win]: WinLossDraw.Win,
};

export enum TimeClass {
  Blitz = 'blitz',
  Daily = 'daily',
  Rapid = 'rapid',
}

export const timeClassLabel: Record<TimeClass, string> = {
  [TimeClass.Blitz]: 'Blitz',
  [TimeClass.Daily]: 'Daily',
  [TimeClass.Rapid]: 'Rapid',
};

export enum ChessRules {
  Chess = 'chess',
}

export enum PieceColor {
  Black = 'black',
  White = 'white',
}

export enum PgnTurn {
  Black = 'b',
  White = 'w',
}

export const pieceColorToPgnTurn: Record<PieceColor, PgnTurn> = {
  [PieceColor.Black]: PgnTurn.Black,
  [PieceColor.White]: PgnTurn.White,
};
