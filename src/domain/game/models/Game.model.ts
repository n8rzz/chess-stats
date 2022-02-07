import * as parser from '@mliebelt/pgn-parser';
import ChessEcoCodes from 'chess-eco-codes';
import chunk from 'lodash.chunk';
import { IChessEngineService } from '../../chess-engine/ChessEngine.types';
import {
  ChessRules,
  TimeClass,
  PieceColor,
  GameResult,
  pieceColorToPgnTurn,
  gameResultToWinLossDraw,
} from '../games.constants';
import { IGame, IGameAccuracies, IGamePlayer, PgnItem } from '../games.types';

export class GameModel implements IGame {
  public readonly accuracies: IGameAccuracies = { black: -1, white: -1 };
  public readonly black: IGamePlayer = {} as IGamePlayer;
  public readonly end_time: number = -1;
  public readonly fen: string = '';
  public readonly initial_setup: string = '';
  public readonly pgn: string = '';
  public readonly rated: boolean = false;
  public readonly rules: ChessRules = ChessRules.Chess;
  public readonly time_class: TimeClass = TimeClass.Rapid;
  public readonly time_control: string = '';
  public readonly url: string = '';
  public readonly white: IGamePlayer = {} as IGamePlayer;

  public moveList: string[] = [];
  public moveTree: any = {};
  public openingTree: any = {};
  public pgn_json: PgnItem[] = [];

  private _chessEngineService: IChessEngineService = null as any;
  private _username: string = '';

  /**
   * Since this appears to be a new addition to the chess.com api, this
   * will return api value or a default
   *
   * @returns {number}  #accuracy value for player or `-1`
   */
  get accuracy(): number {
    if (this.black.username === this._username) {
      return this.accuracies.black;
    }

    return this.accuracies.white;
  }

  get opponentAccuracy(): number {
    if (this.black.username === this._username) {
      return this.accuracies.white;
    }

    return this.accuracies.black;
  }

  get endDate(): Date {
    const end = new Date(0);

    end.setUTCSeconds(this.end_time);

    return end;
  }

  get moves(): string[] {
    return this.pgn_json.map((pgn: PgnItem) => pgn.notation.notation);
  }

  constructor(json: IGame, username: string, chessEngineService: IChessEngineService) {
    this.black = json.black;
    this.end_time = json.end_time;
    this.fen = json.fen;
    this.initial_setup = json.initial_setup;
    this.pgn = json.pgn;
    this.rated = json.rated;
    this.rules = json.rules;
    this.time_class = json.time_class;
    this.time_control = json.time_control;
    this.url = json.url;
    this.white = json.white;
    this._chessEngineService = chessEngineService;
    this._username = username ?? this._username;

    this._setAccuracies(json.accuracies);
    this._parsePgn(json.pgn);
    this._buildMoveList();
    this._buildMoveTree();
    this._buildOpeningTree();
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
      accuracies: this.accuracies,
      black: this.black,
      end_time: this.end_time,
      fen: this.fen,
      initial_setup: this.initial_setup,
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

  /**
   * Generates a move key for a pair of moves separated by a `:`
   *
   * when only one move exists (white won), will return only that move
   */
  private buildMoveKey(movePair: PgnItem[]): string {
    let key = movePair[0].notation.notation;

    if (movePair.length > 1) {
      key = `${key}:${movePair[1].notation.notation}`;
    }

    return key;
  }

  /**
   * Builds a list of white:black moves for an entire game.
   *
   * Given a game of:
   *
   * ```
   * 1. e4 e5 2. Bc4 Nc6 3. Qf3 Bc5 4. Qxf7#
   * ```
   *
   * This will result in a #moveList of:
   *
   * ```js
   * ['e4:e5', 'Bc4:Nc6', 'Qf3:Bc5', 'Qxf7#']
   * ```
   *
   */
  private _buildMoveList(): void {
    const chunkedMoves = this._chunkPgnMoveList();

    this.moveList = chunkedMoves.map((moveGroup: PgnItem[]) => this.buildMoveKey(moveGroup));
  }

  /**
   * Starts from the last move in a game and builds up a tree of moves and result for an entire game.
   *
   * Given a game of:
   *
   * ```
   * 1. e4 e5 2. Bc4 Nc6 3. Qf3 Bc5 4. Qxf7#
   * ```
   *
   * This will result in a #moveTree of:
   *
   * ```json
   * {
   *   "e4:e5": {
   *       "Bc4:Nc6": {
   *           "Qf3:Bc5": {
   *               "Qxf7#": {
   *                   "results": {
   *                       "win": 1
   *                   }
   *               },
   *               "results": {
   *                   "win": 1
   *               }
   *           },
   *           "results": {
   *               "win": 1
   *           }
   *       },
   *       "results": {
   *           "win": 1
   *       }
   *   }
   * }
   * ```
   *
   * This structure will later be used by the `GameCollection`, where each `GameModel.moveTree` is merged
   * to build a tree of all moves for every game and result. This later supports the `Openings`
   * section of the app, and allows users to drill into each move for every game and see results
   * for each move.
   */
  private _buildMoveTree(): void {
    const chunkedMoves = this._chunkPgnMoveList();
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

  private _buildOpeningTree(): void {
    const result = this.getResult(this._username);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ratingEffect = gameResultToWinLossDraw[result];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const openingsList = this._findOpeningsForMoveList();

    // console.log('+++ _buildOpeningTree', result, ratingEffect, openingsList);

    // loop through openings in reverse order
    // build object with openeing name as key and value as meta + result
  }

  /**
   * Groups a game's pgn move list into a 2D array of moves. Each interior
   * array represents one move for white and one move for black.
   */
  private _chunkPgnMoveList(size = 2): PgnItem[][] {
    return chunk(this.pgn_json, size);
  }

  private _findOpeningsForMoveList(): any[] {
    const openingList = [];

    this._chessEngineService.init();

    for (let i = 0; i < this.moves.length; i++) {
      const move = this.moves[i];

      this._chessEngineService.move(move);
      const openingMeta = ChessEcoCodes(this._chessEngineService.fen());

      if (!openingMeta && i > 1) {
        break;
      }

      if (!openingMeta) {
        continue;
      }

      openingList.push(openingMeta);
    }

    return openingList;
  }

  private _parsePgn(rawPgn: string): void {
    const splitPgn = rawPgn.split('\n');
    const pgnWithResult = parser.parse(splitPgn[splitPgn.length - 2]);

    this.pgn_json = pgnWithResult.slice(0, pgnWithResult.length - 1);
  }

  private _setAccuracies(accuracies: IGameAccuracies): void {
    if (!accuracies) {
      return;
    }

    this.accuracies.black = accuracies.black;
    this.accuracies.white = accuracies.white;
  }
}
