import { compact, orderBy } from 'lodash';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import { sma } from 'technicalindicators';
import {
  IDayOhlc,
  IGame,
  IGameCountByDate,
  IGamesBySide,
  IGamesGroupedByDate,
  IMovingAverageChartData,
  IOhlcChartData,
} from '../games.types';
import { GameModel } from './Game.model';
import { setDateFromUtcSeconds } from '../../../util/date.utils';
import { GameResult, gameResultToWinLossDraw, MovingAveragePeriod, PieceColor, WinLossDraw } from '../games.constants';

export class GameCollection {
  public moveTree: any = {};
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

  get isOpenLessThanClose(): boolean {
    return this.findEarliestRating() < this.findLatestRating();
  }

  get isOpenGreaterThanClose(): boolean {
    return this.findEarliestRating() > this.findLatestRating();
  }

  constructor(username: string, json: IGame[], period: number) {
    this.period = period;
    this.username = username;

    if (json.length === 0) {
      return;
    }

    this.addItems(json);
    this._buildMoveTree();
  }

  public addItems(items: IGame[]): void {
    items.forEach((gameJson: IGame) => {
      const model = new GameModel(gameJson, this.username);

      this.addItem(model);
    });
  }

  public addItem(model: GameModel): void {
    this._items.push(model);

    this._orderItemsByEndDate();
  }

  public buildMoveTreeForSideMoveListAndResult(side: PieceColor, moveList: string[], result: WinLossDraw | null): any {
    const moveTreeForSide = { ...this.moveTree[side] };

    if (moveList.length === 0) {
      return moveTreeForSide;
    }

    return moveList.reduce((sum: any, move: string) => {
      return sum[move];

      // FIXME: still working on this
      // if (!result) {
      //   return sum[move];
      // }

      // return Object.keys(sum).reduce((acc, key: string) => {
      //   if (key === 'results') {
      //     return acc;
      //   }

      //   const moveTree = sum[key];
      //   const resultKeys = Object.keys(moveTree.results);

      //   if (!resultKeys.includes(result)) {
      //     return acc;
      //   }

      //   return {
      //     ...acc,
      //     ...moveTree,
      //   };
      // }, {});
    }, moveTreeForSide);
  }

  public buildOhlcChartData(): IOhlcChartData[] {
    const ohlcData = this.calculateOhlcForPeriod();

    return ohlcData.map((item: IDayOhlc) => ({
      x: item.date,
      y: [item.open, item.high, item.low, item.close],
    }));
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

  public calculateMovingAverageWithOhlcAndPeriod(
    ohlcData: IDayOhlc[],
    period: MovingAveragePeriod,
  ): IMovingAverageChartData[] {
    const closeValues = ohlcData.map((entry) => entry.close);
    const smaResult = sma({
      period,
      values: closeValues,
    });

    return ohlcData.reduce((sum: IMovingAverageChartData[], entry: IDayOhlc, i: number) => {
      if (smaResult[i] == null) {
        return sum;
      }

      return [
        ...sum,
        {
          date: entry.date,
          value: Math.floor(smaResult[i]),
        },
      ];
    }, []);
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
    const rawCountsByDate = {
      [GameResult.Abandoned]: resultCounts.map((c) => c.abandoned),
      [GameResult.Agreed]: resultCounts.map((c) => c.agreed),
      [GameResult.BughousePartnerLose]: resultCounts.map((c) => c.bughousepartnerlose),
      [GameResult.Checkmated]: resultCounts.map((c) => c.checkmated),
      [GameResult.FiftyMove]: resultCounts.map((c) => c.fiftymove),
      [GameResult.Insufficient]: resultCounts.map((c) => c.insufficient),
      [GameResult.KingOfTheHill]: resultCounts.map((c) => c.kingofthehill),
      [GameResult.Lose]: resultCounts.map((c) => c.lose),
      [GameResult.Repetition]: resultCounts.map((c) => c.repetition),
      [GameResult.Resigned]: resultCounts.map((c) => c.resigned),
      [GameResult.Stalemate]: resultCounts.map((c) => c.stalemate),
      [GameResult.ThreeCheck]: resultCounts.map((c) => c.threecheck),
      [GameResult.Timeout]: resultCounts.map((c) => c.timeout),
      [GameResult.TimeVsInsufficient]: resultCounts.map((c) => c.timevsinsufficient),
      [GameResult.Win]: resultCounts.map((c) => c.win),
    };

    return {
      labels,
      data: Object.keys(rawCountsByDate).reduce((sum: any, key: string) => {
        const data = rawCountsByDate[key as GameResult];
        const compactedData = compact(data);

        if (compactedData.length === 0) {
          return sum;
        }

        return {
          ...sum,
          [key]: data,
        };
      }, {}),
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
    const gamePlayer = this.firstGame.getSideForUsername(this.username);

    return gamePlayer.rating;
  }

  public findClosingRating(): number {
    const gamePlayer = this.lastGame.getSideForUsername(this.username);

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

  /**
   * Collects results directly from API, which may result in several different
   * types of result, even though the effect is the same
   */
  public gatherDetailedGameResults(): { [key: string]: number } {
    return this._items.reduce((sum: { [key: string]: number }, item: GameModel) => {
      const result = item.getResult(this.username);

      if (typeof sum[result] === 'undefined') {
        sum[result] = 0;
      }

      sum[result] = sum[result] + 1;

      return sum;
    }, {});
  }

  /**
   * Collects results in a simplified `win/draw/loss` format
   */
  public gatherSimpleGameResults(): { [key: string]: number } {
    return this._items.reduce((sum: { [key: string]: number }, item: GameModel) => {
      const result = item.getResult(this.username);
      const ratingEffect = gameResultToWinLossDraw[result];

      if (typeof sum[ratingEffect] === 'undefined') {
        sum[ratingEffect] = 0;
      }

      sum[ratingEffect] = sum[ratingEffect] + 1;

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

  private _merge(sumObj: any, sourceObj: any): any {
    if (typeof sourceObj === 'undefined') {
      return sumObj;
    }

    for (const key in sourceObj) {
      try {
        // Property in destination object set; update its value.
        if (sourceObj[key].constructor == Object) {
          sumObj[key] = this._merge(sumObj[key], sourceObj[key]);

          continue;
        }

        if (typeof sumObj[key] !== 'undefined') {
          sumObj[key] = sumObj[key] + 1;

          continue;
        }

        sumObj[key] = sourceObj[key];
      } catch (e) {
        sumObj[key] = sourceObj[key];
      }
    }

    return sumObj;
  }

  private _buildMoveTree(): void {
    const moveTreesForBlack = this._gatherGamesForSide(PieceColor.Black).map((game: GameModel) => game.moveTree);
    const moveTreesForWhite = this._gatherGamesForSide(PieceColor.White).map((game: GameModel) => game.moveTree);

    this.moveTree = {
      [PieceColor.Black]: moveTreesForBlack.reduce((sum: any, moveTree: any[]) => this._merge(sum, moveTree), {}),
      [PieceColor.White]: moveTreesForWhite.reduce((sum: any, moveTree: any[]) => this._merge(sum, moveTree), {}),
    };
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
          [GameResult.Abandoned]: this._countGameListByResult(gamesForDate, GameResult.Abandoned),
          [GameResult.Agreed]: this._countGameListByResult(gamesForDate, GameResult.Agreed),
          [GameResult.BughousePartnerLose]: this._countGameListByResult(gamesForDate, GameResult.BughousePartnerLose),
          [GameResult.Checkmated]: this._countGameListByResult(gamesForDate, GameResult.Checkmated),
          [GameResult.FiftyMove]: this._countGameListByResult(gamesForDate, GameResult.FiftyMove),
          [GameResult.Insufficient]: this._countGameListByResult(gamesForDate, GameResult.Insufficient),
          [GameResult.KingOfTheHill]: this._countGameListByResult(gamesForDate, GameResult.KingOfTheHill),
          [GameResult.Lose]: this._countGameListByResult(gamesForDate, GameResult.Lose),
          [GameResult.Repetition]: this._countGameListByResult(gamesForDate, GameResult.Repetition),
          [GameResult.Resigned]: this._countGameListByResult(gamesForDate, GameResult.Resigned),
          [GameResult.Stalemate]: this._countGameListByResult(gamesForDate, GameResult.Stalemate),
          [GameResult.ThreeCheck]: this._countGameListByResult(gamesForDate, GameResult.ThreeCheck),
          [GameResult.Timeout]: this._countGameListByResult(gamesForDate, GameResult.Timeout),
          [GameResult.TimeVsInsufficient]: this._countGameListByResult(gamesForDate, GameResult.TimeVsInsufficient),
          [GameResult.Win]: this._countGameListByResult(gamesForDate, GameResult.Win),
        },
      };

      sum.push(entry);

      return sum;
    }, []);
  }

  private _gatherGamesForSide(side: PieceColor): GameModel[] {
    const foundGamesForSide = this._items.reduce((sum: GameModel[], item: GameModel) => {
      if (item[side].username !== this.username) {
        return sum;
      }

      return [...sum, item];
    }, []);

    return foundGamesForSide;
  }

  private _orderItemsByEndDate(): void {
    this._items = orderBy(this._items, ['end_date'], 'asc');
  }
}
