import { PieceColor, WinLossDraw } from '../../../domain/game/games.constants';
import type { GameCollection } from '../../../domain/game/models/Game.collection';

export enum OpeningsAction {
  AddMove = 'ADD_MOVE',
  Reset = 'RESET',
}

export interface IAction<T, P> {
  payload?: P;
  type: T;
}

export interface IState {
  chartData: { [key: string]: number };
  collection: GameCollection;
  moveNumber: number;
  selectedMoveList: string[];
}

const initialState: Omit<IState, 'collection'> = {
  chartData: {},
  moveNumber: 0,
  selectedMoveList: [],
};

export const buildInitialState = (collection: GameCollection, side: PieceColor): IState => {
  return {
    ...initialState,
    collection: collection,
    chartData: collection.buildBarchartDataForSideAtMoveNumber(side, 1),
  };
};

const _onAddMove = (state: IState): IState => {
  return state;
};

export const reducer = (state: IState, action: IAction<string, { move: string; value: WinLossDraw }>): IState => {
  console.log('=== ', action, state);

  switch (action.type) {
    case OpeningsAction.AddMove:
      return _onAddMove(state);
    case OpeningsAction.Reset:
      return _onAddMove(state);
    default:
      return state;
  }
};

// {
//   "type": "ADD_MOVE",
//   "payload": {
//       "move": "e5",
//       "value": "win"
//   }
// }
