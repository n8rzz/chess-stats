import { PieceColor } from '../../../domain/game/games.constants';
import type { GameCollection } from '../../../domain/game/models/Game.collection';
import { Timeframe } from '../../pages/app/app.constants';
import { OpeningsActionName } from './Openings.constants';
import {
  IOpeningsState,
  OpeningActions,
  IAddMoveAction,
  IChangePieceColorAction,
  IChangeTimeframeAction,
  IUpdateMoveListAction,
} from './Openings.types';

const initialState: Omit<IOpeningsState, 'collection'> = {
  chartData: {},
  selectedMoveList: [],
  side: PieceColor.White,
  timeframe: Timeframe.SevenDays,
};

export const buildInitialState = (
  collection: GameCollection,
  side: PieceColor,
  timeframe: Timeframe,
): IOpeningsState => {
  const chartData = collection.moveTree[side];

  return {
    ...initialState,
    collection,
    chartData,
    side,
    timeframe,
  };
};

const _addMove = (state: IOpeningsState, action: IAddMoveAction): IOpeningsState => {
  const moveList = [...state.selectedMoveList, action.payload.move];
  const chartData = state.collection.buildMoveTreeForSideMoveListAndResult(state.side, moveList, action.payload.result);

  return {
    ...state,
    chartData: chartData,
    selectedMoveList: moveList,
  };
};

const _changePieceColor = (state: IOpeningsState, action: IChangePieceColorAction): IOpeningsState => {
  const nextSide = state.side === PieceColor.Black ? PieceColor.White : PieceColor.Black;
  const chartData = state.collection.buildMoveTreeForSideMoveListAndResult(nextSide, [], action.payload.result);

  return {
    ...state,
    chartData: chartData,
    selectedMoveList: [],
    side: nextSide,
  };
};

const _changeTimeframe = (state: IOpeningsState, action: IChangeTimeframeAction): IOpeningsState => {
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
const _updateMoveList = (state: IOpeningsState, action: IUpdateMoveListAction): IOpeningsState => {
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

export const reducer = (state: IOpeningsState, action: OpeningActions): IOpeningsState => {
  switch (action.type) {
    case OpeningsActionName.AddMove:
      return _addMove(state, action);
    case OpeningsActionName.ChangePieceColor:
      return _changePieceColor(state, action);
    case OpeningsActionName.ChangeTimeframe:
      return _changeTimeframe(state, action);
    case OpeningsActionName.UpdateMoveList:
      return _updateMoveList(state, action);
    default:
      return state;
  }
};
