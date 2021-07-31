import { PieceColor, WinLossDraw } from '../../../../domain/game/games.constants';
import { IAction, OpeningsAction } from '../Openings.reducer';

export const addMoveActionMock: IAction<OpeningsAction> = {
  type: OpeningsAction.AddMove,
  payload: {
    move: 'e5',
    result: WinLossDraw.Win,
    side: PieceColor.White,
  },
};
