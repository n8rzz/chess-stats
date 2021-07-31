import { PieceColor, WinLossDraw } from '../../../domain/game/games.constants';
import type { GameCollection } from '../../../domain/game/models/Game.collection';

export enum OpeningsAction {
  AddMove = 'ADD_MOVE',
  Reset = 'RESET',
}

export interface IAction<T> {
  payload: {
    move: string;
    result: WinLossDraw;
    side: PieceColor;
  };
  type: T;
}

export interface IState {
  chartData: { [key: string]: number };
  collection: GameCollection;
  moveNumber: number;
  selectedMoveList: string[];
  side: PieceColor;
}

const initialState: Omit<IState, 'collection'> = {
  chartData: {},
  moveNumber: 0,
  selectedMoveList: [],
  side: PieceColor.White,
};

export const buildInitialState = (collection: GameCollection, side: PieceColor): IState => {
  const chartData = collection.buildBarchartDataForSideAtMoveNumber(side, []);

  return {
    ...initialState,
    collection: collection,
    chartData: chartData,
    side: side,
  };
};

const _onAddMove = (state: IState, action: IAction<OpeningsAction>): IState => {
  const moveList = [...state.selectedMoveList, action.payload.move];
  const chartData = state.collection.buildBarchartDataForSideAtMoveNumber(state.side, moveList);

  return {
    ...state,
    chartData: chartData,
    moveNumber: moveList.length,
    selectedMoveList: moveList,
  };
};

export const reducer = (state: IState, action: IAction<OpeningsAction>): IState => {
  switch (action.type) {
    case OpeningsAction.AddMove:
      return _onAddMove(state, action);
    case OpeningsAction.Reset:
      return state;
    default:
      return state;
  }
};
