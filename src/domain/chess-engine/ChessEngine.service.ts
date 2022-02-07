import * as Chess from 'chess.js';
import { ChessInstance } from 'chess.js';
import { IChessEngineService } from './ChessEngine.types';

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

    // @ts-ignore
    this._game = Chess();
  }

  fen(): string {
    return this._game.fen();
  }

  clear(): void {
    this._game.clear();
  }
}
