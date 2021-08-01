import { PieceColor, WinLossDraw } from '../../../../domain/game/games.constants';
import { Timeframe } from '../../../pages/app/app.constants';
import { IAction, OpeningsActionName } from '../Openings.reducer';

export const addMoveActionMock: IAction<OpeningsActionName> = {
  type: OpeningsActionName.AddMove,
  payload: {
    collection: null,
    move: 'e5',
    result: WinLossDraw.Win,
    side: PieceColor.White,
  },
};

export const changeTimeframeActionMock: IAction<OpeningsActionName> = {
  type: OpeningsActionName.ChangeTimeframe,
  payload: {
    collection: null,
    move: '',
    result: null,
    side: PieceColor.Black,
    timeframe: Timeframe.ThirtyDays,
  },
};

export const changePieceColorActionMock: IAction<OpeningsActionName> = {
  type: OpeningsActionName.ChangePieceColor,
  payload: {
    collection: null,
    move: '',
    result: null,
    side: PieceColor.Black,
  },
};

export const updateMoveListActionMock: IAction<OpeningsActionName> = {
  type: OpeningsActionName.UpdateMoveList,
  payload: {
    collection: null,
    index: 1,
    move: 'c4:c5',
    result: null,
    side: PieceColor.Black,
  },
};
