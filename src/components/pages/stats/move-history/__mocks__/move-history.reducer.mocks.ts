import { ChessEngineServiceFixture } from '../../../../../domain/chess-engine/__mocks__/ChessEngine.service.fixture';
import { WinLossDraw } from '../../../../../domain/game/games.constants';
import { GameCollection } from '../../../../../domain/game/models/Game.collection';
import { gameListForSinglePeriod } from '../../../../../domain/game/__mocks__/game-day-archive.mocks';
import { MoveHistoryActionName } from '../MoveHistory.constants';
import {
  IAddMoveAction,
  IChangePieceColorAction,
  IChangeTimeframeAction,
  IUpdateMoveListAction,
} from '../MoveHistory.types';

export const addMoveActionMock: IAddMoveAction = {
  type: MoveHistoryActionName.AddMove,
  payload: {
    move: 'e5',
    result: WinLossDraw.Win,
  },
};

export const changePieceColorActionMock: IChangePieceColorAction = {
  type: MoveHistoryActionName.ChangePieceColor,
  payload: {
    result: null,
  },
};

export const changeTimeframeActionMock: IChangeTimeframeAction = {
  type: MoveHistoryActionName.ChangeTimeframe,
  payload: {
    collection: new GameCollection('n8rzz', gameListForSinglePeriod, 1, new ChessEngineServiceFixture()),
  },
};

export const updateMoveListActionMock: IUpdateMoveListAction = {
  type: MoveHistoryActionName.UpdateMoveList,
  payload: {
    index: 1,
    result: null,
  },
};
