import { WinLossDraw } from '../../../../../domain/game/games.constants';
import { GameCollection } from '../../../../../domain/game/models/Game.collection';
import { gameListForSinglePeriod } from '../../../../../domain/game/__mocks__/game-day-archive.mocks';
import { OpeningsActionName } from '../Openings.constants';
import {
  IAddMoveAction,
  IChangePieceColorAction,
  IChangeTimeframeAction,
  IUpdateMoveListAction,
} from '../Openings.types';

export const addMoveActionMock: IAddMoveAction = {
  type: OpeningsActionName.AddMove,
  payload: {
    move: 'e5',
    result: WinLossDraw.Win,
  },
};

export const changePieceColorActionMock: IChangePieceColorAction = {
  type: OpeningsActionName.ChangePieceColor,
  payload: {
    result: null,
  },
};

export const changeTimeframeActionMock: IChangeTimeframeAction = {
  type: OpeningsActionName.ChangeTimeframe,
  payload: {
    collection: new GameCollection('n8rzz', gameListForSinglePeriod, 1),
  },
};

export const updateMoveListActionMock: IUpdateMoveListAction = {
  type: OpeningsActionName.UpdateMoveList,
  payload: {
    index: 1,
    result: null,
  },
};
