import { PieceColor, WinLossDraw } from '../../../../domain/game/games.constants';
import { IAction, OpeningsActionName } from '../Openings.reducer';

export const addMoveActionMock: IAction<OpeningsActionName> = {
  type: OpeningsActionName.AddMove,
  payload: {
    move: 'e5',
    result: WinLossDraw.Win,
    side: PieceColor.White,
  },
};

export const changePieceColorActionMock: IAction<OpeningsActionName> = {
  type: OpeningsActionName.ChangePieceColor,
  payload: {
    move: '',
    result: null,
    side: PieceColor.Black,
  },
};
