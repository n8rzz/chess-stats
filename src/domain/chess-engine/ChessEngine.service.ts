import { Chess } from 'chess.js';
import { ChessInstance } from 'chess.js';

export interface IChessEngineService {
  clear: () => void;
  fen: () => string;
  init: () => void;
  move: (nextMove: string) => void;
}

export class ChessEngineService implements IChessEngineService {
  private _game!: ChessInstance;

  constructor() {
    this.init();
  }

  move(nextMove: string): void {
    if (!this._game) {
      this.init();
    }

    this._game.move(nextMove);
  }

  init(): void {
    if (this._game) {
      this._game.clear();
    }

    this._game = new Chess();
  }

  fen(): string {
    return this._game.fen();
  }

  clear(): void {
    this._game.clear();
  }
}
