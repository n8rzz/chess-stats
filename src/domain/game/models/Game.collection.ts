/* eslint-disable operator-assignment */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { orderBy } from 'lodash';
import {
  ICountByDateChartData,
  IDayOhlc,
  IGame,
  IGameCountByDate,
  IGamesBySide,
  IGamesGroupedByDate,
} from '../games.types';
import { GameModel } from './Game.model';

export class GameCollection {
  public username: string = '';

  private _items: GameModel[] = [];

  get length(): number {
    return this._items.length;
  }

  get countByDate(): ICountByDateChartData {
    const gameCountsByDate = this._countGamesByDate();

    return {
      data: gameCountsByDate.map((c) => c.count),
      labels: gameCountsByDate.map((l) => l.date),
    };
  }

  constructor(username: string, json: IGame[]) {
    this.username = username;

    if (json.length === 0) {
      return;
    }

    this.addItems(json);
  }

  public addItems(items: IGame[]): void {
    items.forEach((gameJson: IGame) => {
      const model = new GameModel(gameJson);

      this.addItem(model);
    });
  }

  public addItem(model: GameModel): void {
    this._items.push(model);

    this._orderItemsByEndDate();
  }

  public calculateOhlcForPeriod(): IDayOhlc[] {
    const gamesByDate = this.groupByDay();
    const unsortedOhlcData = Object.keys(gamesByDate).reduce(
      (sum: IDayOhlc[], dateKey: string) => {
        const period = new GameCollection(this.username, gamesByDate[dateKey]);

        return [
          ...sum,
          {
            date: dateKey,
            open: period.findOpeningRating(),
            high: period.calculateMaxRating(),
            low: period.calculateMinRating(),
            close: period.findClosingRating(),
            volumn: period.length,
          },
        ];
      },
      [],
    );

    return unsortedOhlcData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }

  public findOpeningRating(): number {
    const game = this._items[0];
    const gamePlayer = game.getSideForUsername(this.username);

    return gamePlayer.rating;
  }

  public findClosingRating(): number {
    const lastIndex = this.length - 1;
    const game = this._items[lastIndex];
    const gamePlayer = game.getSideForUsername(this.username);

    return gamePlayer.rating;
  }

  public countGamesBySide(): IGamesBySide {
    return this._items.reduce(
      (sum: IGamesBySide, item: GameModel) => {
        if (item.black.username === this.username) {
          sum.black += 1;

          return sum;
        }

        sum.white += 1;

        return sum;
      },
      {
        black: 0,
        white: 0,
      },
    );
  }

  public calculateMaxRating(): number {
    return this._items.reduce((sum: number, game: GameModel) => {
      const gamePlayer = game.getSideForUsername(this.username);

      if (sum !== -1 || sum > gamePlayer.rating) {
        return sum;
      }

      sum = gamePlayer.rating;

      return sum;
    }, -1);
  }

  public calculateMinRating(): number {
    return this._items.reduce((sum: number, game: GameModel) => {
      const gamePlayer = game.getSideForUsername(this.username);

      if (sum !== -1 && sum < gamePlayer.rating) {
        return sum;
      }

      sum = gamePlayer.rating;

      return sum;
    }, -1);
  }

  public findEarliestGameDate(): Date {
    const earliestGame = this._items[0];
    const earliestDate = new Date(0);

    earliestDate.setUTCSeconds(earliestGame.end_time);

    return earliestDate;
  }

  public findLatestGameDate(): Date {
    const latestGame = this._items[this.length - 1];
    const lateestDate = new Date(0);

    lateestDate.setUTCSeconds(latestGame.end_time);

    return lateestDate;
  }

  public gatherGameResults(): any {
    return this._items.reduce((sum: any, item: GameModel) => {
      const result = item.getResult(this.username);

      if (typeof sum[result] === 'undefined') {
        sum[result] = 0;
      }

      sum[result] = sum[result] + 1;

      return sum;
    }, {});
  }

  public groupByDay(): IGamesGroupedByDate {
    return this._items.reduce(
      (sum: { [key: string]: GameModel[] }, game: GameModel) => {
        const gameEndDate = new Date(0);
        gameEndDate.setUTCSeconds(game.end_time);

        const dateKey = gameEndDate.toLocaleDateString();

        if (typeof sum[dateKey] !== 'undefined') {
          sum[dateKey].push(game);

          return sum;
        }

        sum[dateKey] = [game];

        return sum;
      },
      {},
    );
  }

  public toJson(): IGame[] {
    return this._items.map((model: GameModel): IGame => model.toJson());
  }

  private _countGamesByDate(): IGameCountByDate[] {
    const gamesByDate = this.groupByDay();
    const unsortedGameCountsByDate = Object.keys(gamesByDate).reduce(
      (sum: IGameCountByDate[], gameDate: string) => {
        const entry: IGameCountByDate = {
          date: gameDate,
          count: gamesByDate[gameDate].length,
        };

        sum.push(entry);

        return sum;
      },
      [],
    );

    return unsortedGameCountsByDate.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }

  private _orderItemsByEndDate(): void {
    this._items = orderBy(this._items, ['end_date'], 'asc');
  }
}
