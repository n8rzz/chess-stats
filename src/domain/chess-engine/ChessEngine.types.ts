export interface IChessEngineService {
  clear: () => void;
  fen: () => string;
  init: () => void;
  move: (nextMove: string) => void;
}
