// @ts-ignore
import * as parser from '@mliebelt/pgn-parser';
import chunk from 'lodash.chunk';
import {
  ChessRules,
  TimeClass,
  PieceColor,
  GameResult,
  pieceColorToPgnTurn,
  gameResultToWinLossDraw,
} from '../games.constants';
import { IGame, IGamePlayer, PgnItem } from '../games.types';

export class GameModel implements IGame {
  public readonly black: IGamePlayer = {} as IGamePlayer;
  public readonly end_time: number = -1;
  public readonly fen: string = '';
  public moveList: string[] = [];
  public moveTree: any = {};
  public readonly pgn: string = '';
  public pgn_json: PgnItem[] = [];
  public readonly rated: boolean = false;
  public readonly rules: ChessRules = ChessRules.Chess;
  public readonly time_class: TimeClass = TimeClass.Rapid;
  public readonly time_control: string = '';
  public readonly url: string = '';
  public readonly white: IGamePlayer = {} as IGamePlayer;

  private _username: string = '';

  get endDate(): Date {
    const end = new Date(0);

    end.setUTCSeconds(this.end_time);

    return end;
  }

  constructor(json: IGame, username: string) {
    this.black = json.black;
    this.end_time = json.end_time;
    this.fen = json.fen;
    this.pgn = json.pgn;
    this.rated = json.rated;
    this.rules = json.rules;
    this.time_class = json.time_class;
    this.time_control = json.time_control;
    this.url = json.url;
    this.white = json.white;
    this._username = username ?? this._username;

    this._parsePgn(json.pgn);
    this._buildMoveList();
    this._buildMoveTree();
  }

  public buildWhiteBlackMoveKeyForMoveNumber(moveNumber: number): string {
    const moves = this.findMovesForMoveNumber(moveNumber);
    const key = moves[0].notation.notation;

    if (moves.length === 1) {
      return key;
    }

    return `${key}:${moves[1].notation.notation}`;
  }

  public findMovesForMoveNumber(moveNumber: number): PgnItem[] {
    return this.pgn_json.filter((move: PgnItem) => move.moveNumber === moveNumber);
  }

  public getPlayerMovesForGame(side: PieceColor): string[] {
    return this.pgn_json.reduce((sum: string[], move: PgnItem) => {
      if (move.notation == null || move.turn !== pieceColorToPgnTurn[side]) {
        return sum;
      }

      return [...sum, move.notation.notation];
    }, []);
  }

  public getMoveForNumberAndPieceColor(side: PieceColor, number: number): string {
    const move = this.pgn_json.find(
      (move: PgnItem) => move.moveNumber === number && move.turn === pieceColorToPgnTurn[side],
    );

    return move?.notation.notation ?? '';
  }

  public getResult(username: string): GameResult {
    const side = this.getSideForUsername(username);

    return side.result;
  }

  public getSideForOpponent(username: string): IGamePlayer {
    return this.black.username === username ? this.white : this.black;
  }

  public getSideForUsername(username: string): IGamePlayer {
    return this.black.username === username ? this.black : this.white;
  }

  public toJson(): IGame {
    return {
      black: this.black,
      end_time: this.end_time,
      fen: this.fen,
      pgn: this.pgn,
      pgn_json: this.pgn_json,
      rated: this.rated,
      rules: this.rules,
      time_class: this.time_class,
      time_control: this.time_control,
      url: this.url,
      white: this.white,
    };
  }

  private buildMoveKey(moveGroup: PgnItem[]): string {
    let key = moveGroup[0].notation.notation;

    if (moveGroup.length > 1) {
      key = `${key}:${moveGroup[1].notation.notation}`;
    }

    return key;
  }

  private _buildMoveList(): void {
    const chunkedMoves = chunk(this.pgn_json, 2);

    this.moveList = chunkedMoves.map((moveGroup: PgnItem[]) => this.buildMoveKey(moveGroup));
  }

  private _buildMoveTree(): void {
    const chunkedMoves = chunk(this.pgn_json, 2);
    const result = this.getResult(this._username);
    const ratingEffect = gameResultToWinLossDraw[result];

    this.moveTree = chunkedMoves.reverse().reduce((acc: any, moveGroup: PgnItem[], index: number) => {
      const key = this.buildMoveKey(moveGroup);

      return {
        [key]: {
          ...acc,
          results: {
            [ratingEffect]: 1,
          },
        },
      };
    }, {});
  }

  private _parsePgn(rawPgn: string): void {
    const splitPgn = rawPgn.split('\n');
    const pgnWithResult = parser.parse(splitPgn[splitPgn.length - 2]);

    this.pgn_json = pgnWithResult.slice(0, pgnWithResult.length - 1);
  }
}
