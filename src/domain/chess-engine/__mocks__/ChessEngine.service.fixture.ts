import { IChessEngineService } from '../ChessEngine.types';

export class ChessEngineServiceFixture implements IChessEngineService {
  clear(): void {
    return;
  }

  fen(): string {
    return '';
  }

  init(): void {
    return;
  }

  move(nextMove: string): void {
    return;
  }
}
