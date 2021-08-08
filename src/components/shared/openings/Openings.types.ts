import { WinLossDraw, PieceColor } from '../../../domain/game/games.constants';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { Timeframe } from '../../pages/app/app.constants';
import { OpeningsActionName } from './Openings.constants';

export interface IAction<T> {
  payload: unknown;
  type: T;
}

export interface IAction_LEGACY<T> {
  payload: {
    collection: GameCollection | null;
    index?: number;
    move: string;
    result: WinLossDraw | null;
    side: PieceColor;
    timeframe?: Timeframe;
  };
  type: T;
}

export interface IOpeningsState {
  chartData: { [key: string]: number };
  collection: GameCollection;
  selectedMoveList: string[];
  side: PieceColor;
  timeframe: Timeframe;
}

export interface IAddMoveAction extends IAction<OpeningsActionName.AddMove> {
  payload: {
    move: string;
    result: WinLossDraw;
  };
}

export interface IChangePieceColorAction extends IAction<OpeningsActionName.ChangePieceColor> {
  payload: {
    result: WinLossDraw | null;
  };
}

export interface IChangeTimeframeAction extends IAction<OpeningsActionName.ChangeTimeframe> {
  payload: {
    collection: GameCollection;
  };
}

export interface IUpdateMoveListAction extends IAction<OpeningsActionName.UpdateMoveList> {
  payload: {
    index: number;
    result: WinLossDraw | null;
  };
}

export type OpeningActions = IAddMoveAction | IChangePieceColorAction | IChangeTimeframeAction | IUpdateMoveListAction;
