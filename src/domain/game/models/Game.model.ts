// @ts-ignore
import * as parser from '@mliebelt/pgn-parser';
import { ChessRules, GameResult, IGame, IGamePlayer, TimeClass } from '../games.types';

export class GameModel implements IGame {
  public readonly black: IGamePlayer = {} as IGamePlayer;
  public readonly end_time: number = -1;
  public readonly fen: string = '';
  public readonly pgn: string = '';
  public pgn_json: any = {};
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

    this.pgn_json = parser.parse(splitPgn[splitPgn.length - 2]);
  }
}
