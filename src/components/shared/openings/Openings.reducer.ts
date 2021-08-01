import { PieceColor, WinLossDraw } from '../../../domain/game/games.constants';
import type { GameCollection } from '../../../domain/game/models/Game.collection';

export enum OpeningsActionName {
  AddMove = 'ADD_MOVE',
  ChangePieceColor = 'CHANGE_PIECE_COLOR',
}

export interface IAction<T> {
  payload: {
    move: string;
    result: WinLossDraw | null;
    side: PieceColor;
  };
  type: T;
}

export interface IOpeningsState {
  chartData: { [key: string]: number };
  collection: GameCollection;
  selectedMoveList: string[];
  side: PieceColor;
}

const initialState: Omit<IOpeningsState, 'collection'> = {
  chartData: {},
  selectedMoveList: [],
  side: PieceColor.White,
};

export const buildInitialState = (collection: GameCollection, side: PieceColor): IOpeningsState => {
  const chartData = collection.moveTree[side];

  return {
    ...initialState,
    collection: collection,
    chartData: chartData,
    side: side,
  };
};

const _addMove = (state: IOpeningsState, action: IAction<OpeningsActionName>): IOpeningsState => {
  const moveList = [...state.selectedMoveList, action.payload.move];
  const chartData = state.collection.buildBarchartDataForSideAtMoveNumber(state.side, moveList);

  return {
    ...state,
    chartData: chartData,
    selectedMoveList: moveList,
  };
};

const _changePieceColor = (state: IOpeningsState, action: IAction<OpeningsActionName>): IOpeningsState => {
  const nextSide = state.side === PieceColor.Black ? PieceColor.White : PieceColor.Black;
  const chartData = state.collection.buildBarchartDataForSideAtMoveNumber(nextSide, []);

  return {
    ...state,
    chartData: chartData,
    selectedMoveList: [],
    side: nextSide,
  };
};

export const reducer = (state: IOpeningsState, action: IAction<OpeningsActionName>): IOpeningsState => {
  switch (action.type) {
    case OpeningsActionName.AddMove:
      return _addMove(state, action);
    case OpeningsActionName.ChangePieceColor:
      return _changePieceColor(state, action);
    default:
      return state;
  }
};
