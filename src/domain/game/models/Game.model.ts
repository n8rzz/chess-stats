// @ts-ignore
import * as parser from '@mliebelt/pgn-parser';
import { ChessRules, TimeClass, PieceColor, GameResult, pieceColorToPgnTurn } from '../games.constants';
import { IGame, IGamePlayer, PgnItem } from '../games.types';

export class GameModel implements IGame {
  public readonly black: IGamePlayer = {} as IGamePlayer;
  public readonly end_time: number = -1;
  public readonly fen: string = '';
  public readonly pgn: string = '';
  public pgn_json: PgnItem[] = [];
  public readonly rated: boolean = false;
  public readonly rules: ChessRules = ChessRules.Chess;
  public readonly time_class: TimeClass = TimeClass.Rapid;
  public readonly time_control: string = '';
  public readonly url: string = '';
  public readonly white: IGamePlayer = {} as IGamePlayer;

  get endDate(): Date {
    const end = new Date(0);

    end.setUTCSeconds(this.end_time);

    return end;
  }

  constructor(json: IGame) {
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

    this._parsePgn(json.pgn);
  }

  public getFirstMoveForPieceColor(side: PieceColor): string {
    const firstMoveIndex = side === PieceColor.White ? 0 : 1;

    return this.pgn_json[firstMoveIndex].notation.notation;
  }

  public getMovesForGame(side: PieceColor, moveCount: number = 10): string[] {
    return this.pgn_json.reduce((sum: string[], move: any) => {
      if (move.notation == null) {
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

  private _parsePgn(rawPgn: string): void {
    const splitPgn = rawPgn.split('\n');
    const pgnWithResult = parser.parse(splitPgn[splitPgn.length - 2]);

    this.pgn_json = pgnWithResult.slice(0, pgnWithResult.length);
  }
}
