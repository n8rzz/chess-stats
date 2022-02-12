import { PieceColor } from '../../../../domain/game/games.constants';
import type { GameCollection } from '../../../../domain/game/models/Game.collection';
import { Timeframe } from '../StatsPage.constants';
import { MoveHistoryActionName } from './MoveHistory.constants';
import {
  IMoveHistoryState,
  OpeningActions,
  IAddMoveAction,
  IChangePieceColorAction,
  IChangeTimeframeAction,
  IUpdateMoveListAction,
} from './MoveHistory.types';

const initialState: Omit<IMoveHistoryState, 'collection'> = {
  chartData: {},
  selectedMoveList: [],
  side: PieceColor.White,
  timeframe: Timeframe.SevenDays,
};

export const buildInitialState = (
  collection: GameCollection,
  side: PieceColor,
  timeframe: Timeframe,
): IMoveHistoryState => {
  const chartData = collection.moveTree[side];

  return {
    ...initialState,
    collection,
    chartData,
    side,
    timeframe,
  };
};

const _addMove = (state: IMoveHistoryState, action: IAddMoveAction): IMoveHistoryState => {
  const moveList = [...state.selectedMoveList, action.payload.move];
  const chartData = state.collection.buildMoveTreeForSideMoveListAndResult(state.side, moveList, action.payload.result);

  return {
    ...state,
    chartData: chartData,
    selectedMoveList: moveList,
  };
};

const _changePieceColor = (state: IMoveHistoryState, action: IChangePieceColorAction): IMoveHistoryState => {
  const nextSide = state.side === PieceColor.Black ? PieceColor.White : PieceColor.Black;
  const chartData = state.collection.buildMoveTreeForSideMoveListAndResult(nextSide, [], action.payload.result);

  return {
    ...state,
    chartData: chartData,
    selectedMoveList: [],
    side: nextSide,
  };
};

const _changeTimeframe = (state: IMoveHistoryState, action: IChangeTimeframeAction): IMoveHistoryState => {
  const chartData = action.payload.collection.buildMoveTreeForSideMoveListAndResult(state.side, [], null);

  return {
    ...state,
    chartData: chartData,
    collection: action.payload.collection,
    selectedMoveList: [],
  };
};

/**
 * TODO: rename to something more accurate
 */
const _updateMoveList = (state: IMoveHistoryState, action: IUpdateMoveListAction): IMoveHistoryState => {
  const nextMoveList = state.selectedMoveList.slice(0, action.payload.index);
  const chartData = state.collection.buildMoveTreeForSideMoveListAndResult(
    state.side,
    nextMoveList,
    action.payload.result,
  );

  return {
    ...state,
    chartData: chartData,
    selectedMoveList: nextMoveList,
  };
};

export const reducer = (state: IMoveHistoryState, action: OpeningActions): IMoveHistoryState => {
  switch (action.type) {
    case MoveHistoryActionName.AddMove:
      return _addMove(state, action);
    case MoveHistoryActionName.ChangePieceColor:
      return _changePieceColor(state, action);
    case MoveHistoryActionName.ChangeTimeframe:
      return _changeTimeframe(state, action);
    case MoveHistoryActionName.UpdateMoveList:
      return _updateMoveList(state, action);
    default:
      return state;
  }
};
