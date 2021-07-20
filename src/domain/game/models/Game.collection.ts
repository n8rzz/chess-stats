import { orderBy } from 'lodash';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import { sma } from 'technicalindicators';
import {
  GameResult,
  IDayOhlc,
  IGame,
  IGameCountByDate,
  IGamesBySide,
  IGamesGroupedByDate,
  IMovingAverageChartData,
} from '../games.types';
import { GameModel } from './Game.model';
import { setDateFromUtcSeconds } from '../../../util/date.utils';

export class GameCollection {
  public period: number = 0;
  public username: string = '';

  private _items: GameModel[] = [];

  get firstGame(): GameModel {
    return this._items[0];
  }

  get lastGame(): GameModel {
    return this._items[this.length - 1];
  }

  get length(): number {
    return this._items.length;
  }

  constructor(username: string, json: IGame[], period: number) {
    this.period = period;
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

  public groupByPeriod(): IGamesGroupedByDate {
    return this.period === 1 ? this.groupByHour() : this.groupByDay();
  }

  public calculateOhlcForPeriod(): IDayOhlc[] {
    const gamesByDate = this.groupByPeriod();
    const unsortedOhlcData = Object.keys(gamesByDate).reduce((sum: IDayOhlc[], dateKey: string) => {
      const period = new GameCollection(this.username, gamesByDate[dateKey], 1);

      return [
        ...sum,
        {
          date: dateKey,
          open: period.findOpeningRating(),
          high: period.findMaxRating(),
          low: period.findMinRating(),
          close: period.findClosingRating(),
          volume: period.length,
        },
      ];
    }, []);

    return unsortedOhlcData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  public calculateMovingAverageWithOhlcAndPeriod(ohlcData: IDayOhlc[], period: number): IMovingAverageChartData[] {
    const closeValues = ohlcData.map((entry) => entry.close);
    const smaResult = sma({
      period,
      values: closeValues,
    });

    const movingAverageChartData = ohlcData.reduce((sum: IMovingAverageChartData[], entry: IDayOhlc, i: number) => {
      if (smaResult[i] == null) {
        return sum;
      }

      return [
        ...sum,
        {
          date: entry.date,
          value: smaResult[i],
        },
      ];
    }, []);

    return movingAverageChartData.reverse();
  }

  public countByDate(): { data: Record<GameResult, number[]>; labels: string[] } {
    const gameCountsByDate = this._countGameResultsByPeriod();
    const labels = gameCountsByDate.map((l) => {
      if (this.period === 1) {
        return format(new Date(l.date), 'h:mm:ss aa');
      }

      return l.date;
    });

    const resultCounts = gameCountsByDate.map((d) => d.count);

    return {
      labels,
      data: {
        [GameResult.Agreed]: resultCounts.map((c) => c.agreed),
        [GameResult.Checkmated]: resultCounts.map((c) => c.checkmated),
        [GameResult.Resigned]: resultCounts.map((c) => c.resigned),
        [GameResult.Stalemate]: resultCounts.map((c) => c.stalemate),
        [GameResult.Timeout]: resultCounts.map((c) => c.timeout),
        [GameResult.Win]: resultCounts.map((c) => c.win),
      },
    };
  }

  public createCollectionForPeriod(period: number): GameCollection {
    const today = new Date();
    const periodStartDate = subDays(today, period);
    const itemsWithinPeriod = this._items.filter(
      (item: GameModel) => item.endDate.getTime() > periodStartDate.getTime(),
    );

    return new GameCollection(this.username, itemsWithinPeriod, period);
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

  public findMaxRating(): number {
    return this._items.reduce((sum: number, game: GameModel) => {
      const gamePlayer = game.getSideForUsername(this.username);

      if (sum !== -1 && gamePlayer.rating <= sum) {
        return sum;
      }

      // eslint-disable-next-line no-param-reassign
      sum = gamePlayer.rating;

      return sum;
    }, -1);
  }

  public findMinRating(): number {
    return this._items.reduce((sum: number, game: GameModel) => {
      const gamePlayer = game.getSideForUsername(this.username);

      if (sum !== -1 && sum < gamePlayer.rating) {
        return sum;
      }

      // eslint-disable-next-line no-param-reassign
      sum = gamePlayer.rating;

      return sum;
    }, -1);
  }

  public findEarliestGameDate(): Date {
    const earliestDate = new Date(0);

    earliestDate.setUTCSeconds(this.firstGame.end_time);

    return earliestDate;
  }

  public findEarliestRating(): number {
    const gamePlayer = this.firstGame.getSideForUsername(this.username);

    return gamePlayer.rating;
  }

  public findLatestGameDate(): Date {
    const latestDate = new Date(0);

    latestDate.setUTCSeconds(this.lastGame.end_time);

    return latestDate;
  }

  public findLatestRating(): number {
    const gamePlayer = this.lastGame.getSideForUsername(this.username);

    return gamePlayer.rating;
  }

  public gatherGameResults(): { [key: string]: number } {
    return this._items.reduce((sum: { [key: string]: number }, item: GameModel) => {
      const result = item.getResult(this.username);

      if (typeof sum[result] === 'undefined') {
        sum[result] = 0;
      }

      sum[result] = sum[result] + 1;

      return sum;
    }, {});
  }

  public groupByHour(): IGamesGroupedByDate {
    return this._items.reduce((sum: { [key: string]: GameModel[] }, game: GameModel) => {
      const gameEndDate = setDateFromUtcSeconds(game.end_time);
      const hours = gameEndDate.getHours();
      const endDateWithHours = new Date(gameEndDate.toLocaleDateString());

      endDateWithHours.setHours(hours);

      const dateKey = endDateWithHours.toISOString();

      if (typeof sum[dateKey] !== 'undefined') {
        sum[dateKey].push(game);

        return sum;
      }

      sum[dateKey] = [game];

      return sum;
    }, {});
  }

  public groupByDay(): IGamesGroupedByDate {
    return this._items.reduce((sum: { [key: string]: GameModel[] }, game: GameModel) => {
      const gameEndDate = setDateFromUtcSeconds(game.end_time);
      const dateKey = gameEndDate.toLocaleDateString();

      if (typeof sum[dateKey] !== 'undefined') {
        sum[dateKey].push(game);

        return sum;
      }

      sum[dateKey] = [game];

      return sum;
    }, {});
  }

  public toJson(): IGame[] {
    return this._items.map((model: GameModel): IGame => model.toJson());
  }

  private _countGameListByResult = (gameList: GameModel[], result: GameResult): number => {
    const gamesListForResult = gameList.filter((game: GameModel) => game.getResult(this.username) === result);

    return gamesListForResult.length;
  };

  private _countGameResultsByPeriod(): IGameCountByDate[] {
    const gamesByDate = this.groupByPeriod();
    const sortedKeys = Object.keys(gamesByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return sortedKeys.reduce((sum: IGameCountByDate[], gameDate: string) => {
      const gamesForDate = gamesByDate[gameDate];

      const entry: IGameCountByDate = {
        date: gameDate,
        count: {
          [GameResult.Agreed]: this._countGameListByResult(gamesForDate, GameResult.Agreed),
          [GameResult.Checkmated]: this._countGameListByResult(gamesForDate, GameResult.Checkmated),
          [GameResult.Resigned]: this._countGameListByResult(gamesForDate, GameResult.Resigned),
          [GameResult.Stalemate]: this._countGameListByResult(gamesForDate, GameResult.Stalemate),
          [GameResult.Timeout]: this._countGameListByResult(gamesForDate, GameResult.Timeout),
          [GameResult.Win]: this._countGameListByResult(gamesForDate, GameResult.Win),
        },
      };

      sum.push(entry);

      return sum;
    }, []);
  }

  private _orderItemsByEndDate(): void {
    this._items = orderBy(this._items, ['end_date'], 'asc');
  }
}
