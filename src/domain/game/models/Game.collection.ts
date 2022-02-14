import { compact, max, min, orderBy } from 'lodash';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';
import { sma } from 'technicalindicators';
import {
  GameResultCountMap,
  ICountByDate,
  IDayOhlc,
  IGame,
  IGameCountByDate,
  IGamesBySide,
  IGamesByPeriodInterval,
  IMovingAverageChartData,
  IOhlcChartData,
  IWinLossDrawByPeriod,
  SimpleGameResultCountMap,
  IOpponentRatingScatterChartData,
  IOpponentAccuracyScatterChartData,
  IWinLossDrawSumByPeriod,
} from '../games.types';
import { GameModel } from './Game.model';
import { setDateFromUtcSeconds } from '../../../util/date.utils';
import {
  GameResult,
  gameResultToWinLossDraw,
  MovingAveragePeriod,
  PieceColor,
  TimeClass,
  WinLossDraw,
} from '../games.constants';
import { IChessEngineService } from '../../chess-engine/ChessEngine.types';

export class GameCollection {
  public moveTree: any = {};
  public openingsTree: any = {};
  public period: number = 0;
  public username: string = '';

  private _chessEngineService: IChessEngineService = null as any;
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

  constructor(username: string, json: IGame[], period: number, chessEngineService: IChessEngineService) {
    this.period = period;
    this.username = username;
    this._chessEngineService = chessEngineService;

    if (json.length === 0) {
      return;
    }

    this.addItems(json);
    this._buildMoveTree();
    this._buildOpeningsTree();
  }

  public addItems(items: IGame[]): void {
    items.forEach((gameJson: IGame) => {
      const model = new GameModel(gameJson, this.username, this._chessEngineService);

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

  public groupByPeriod(): IGamesByPeriodInterval {
    return this.period === 1 ? this.groupByHour() : this.groupByDay();
  }

  public calculateOhlcForPeriod(): IDayOhlc[] {
    const gamesByDate = this.groupByPeriod();
    const unsortedOhlcData = Object.keys(gamesByDate).reduce((sum: IDayOhlc[], dateKey: string) => {
      const period = new GameCollection(this.username, gamesByDate[dateKey], 1, this._chessEngineService);

      return [
        ...sum,
        {
          close: period.findClosingRating(),
          date: dateKey,
          high: period.findMaxRating(),
          low: period.findMinRating(),
          open: period.findOpeningRating(),
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

  /**
   * Used to drive the [future] heatmap
   */
  public countGamesByDate(): { [key: string]: number } {
    const gamesByPeriod = this.groupByPeriod();

    return Object.keys(gamesByPeriod).reduce((sum: { [key: string]: number }, key: string) => {
      if (typeof gamesByPeriod[key] === 'undefined') {
        sum[key] = 0;
      }

      return {
        ...sum,
        [key]: gamesByPeriod[key].length,
      };
    }, {});
  }

  public countResultsByDate(): ICountByDate {
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

  public createCollectionForPeriodAndTimeClass(period: number, timeClass: TimeClass): GameCollection {
    const today = new Date();
    const periodStartDate = subDays(today, period);
    const itemsWithinPeriod: GameModel[] = this._items.reduce((sum: GameModel[], item: GameModel): GameModel[] => {
      if (item.endDate.getTime() <= periodStartDate.getTime()) {
        return sum;
      }

      if (item.time_class !== timeClass) {
        return sum;
      }

      return [...sum, item];
    }, []);

    return new GameCollection(this.username, itemsWithinPeriod, period, this._chessEngineService);
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

  public countWinLossByPeriodWithAverage(): IWinLossDrawSumByPeriod {
    const winLossDrawByPeriod = this._countWinLossByPeriod();

    return Object.keys(winLossDrawByPeriod).reduce((sum: any, key: string) => {
      const period = winLossDrawByPeriod[key];
      const periodSum = period.win + period.loss * -1;

      return {
        ...sum,
        [key]: {
          ...period,
          sum: periodSum,
        },
      };
    }, {});
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
  public gatherDetailedGameResults(): GameResultCountMap {
    return this._items.reduce((sum: GameResultCountMap, item: GameModel) => {
      const result = item.getResult(this.username);

      if (typeof sum[result] === 'undefined') {
        sum[result] = 0;
      }

      sum[result] = sum[result] + 1;

      return sum;
    }, {} as GameResultCountMap);
  }

  /**
   * Collects results in a simplified `win/draw/loss` format
   */
  public gatherSimpleGameResults(): SimpleGameResultCountMap {
    return this._items.reduce((sum: SimpleGameResultCountMap, item: GameModel) => {
      const result = item.getResult(this.username);
      const ratingEffect = gameResultToWinLossDraw[result];

      if (typeof sum[ratingEffect] === 'undefined') {
        sum[ratingEffect] = 0;
      }

      sum[ratingEffect] = sum[ratingEffect] + 1;

      return sum;
    }, {} as SimpleGameResultCountMap);
  }

  public gatherOpponentAndUserAccuracyByDate(): IOpponentAccuracyScatterChartData {
    return this._items.reduce(
      (sum: IOpponentAccuracyScatterChartData, game: GameModel) => {
        if (game.accuracy === -1) {
          return sum;
        }

        sum.opponent.push([game.endDate, game.opponentAccuracy]);
        sum.user.push([game.endDate, game.accuracy]);

        return sum;
      },
      {
        opponent: [],
        user: [],
      },
    );
  }

  public gatherOpponentAndUserRatingsByDate(): IOpponentRatingScatterChartData {
    return this._items.reduce(
      (sum: IOpponentRatingScatterChartData, game: GameModel) => {
        const { rating: opponentRating } = game.getSideForOpponent(this.username);
        const { rating: userRating } = game.getSideForUsername(this.username);

        sum.opponent.push([game.endDate, opponentRating]);
        sum.user.push([game.endDate, userRating]);
        sum.maxRating = max([sum.maxRating, opponentRating, userRating]) as number;
        sum.minRating = min([sum.minRating, opponentRating, userRating]) as number;

        return sum;
      },
      {
        // out of range default is not a valid rating
        maxRating: -1,
        // out of range default is not a valid rating
        minRating: 5000,
        opponent: [],
        user: [],
      },
    );
  }

  public groupByHour(): IGamesByPeriodInterval {
    return this._items.reduce((sum: IGamesByPeriodInterval, game: GameModel) => {
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

  public groupByDay(): IGamesByPeriodInterval {
    return this._items.reduce((sum: IGamesByPeriodInterval, game: GameModel) => {
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

  private _isNotUndefinedAndIsWinLossDraw(key: string): boolean {
    const isGameResult = key === WinLossDraw.Draw || key === WinLossDraw.Loss || key === WinLossDraw.Win;

    return typeof key !== 'undefined' && isGameResult;
  }

  // TODO: define type
  // `sumObj` is a recursive type { [key: string]: { recursive } }
  private _mergeMoveTrees(sumObj: any, sourceObj: any): any {
    if (typeof sourceObj === 'undefined') {
      return sumObj;
    }

    for (const key in sourceObj) {
      try {
        if (sourceObj[key].constructor == Object) {
          sumObj[key] = this._mergeMoveTrees(sumObj[key], sourceObj[key]);

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

  private _mergeOpeningsTrees(sum: any, opening: any): any {
    if (typeof opening === 'undefined') {
      return sum;
    }

    for (const key in opening) {
      try {
        const isOpeningKey = key !== 'results' && key !== 'opening';
        // const focusedOpening = opening[key];

        if (isOpeningKey && opening[key].constructor == Object) {
          sum[key] = this._mergeOpeningsTrees(sum[key], opening[key]);

          continue;
        }

        if (key === 'opening') {
          sum[key] = opening[key];

          continue;
        }

        if (key === 'results') {
          const sumResults = sum[key];
          const focusedOpeningResults = opening[key];

          sum.results = {
            [WinLossDraw.Win]: sumResults[WinLossDraw.Win] + focusedOpeningResults[WinLossDraw.Win],
            [WinLossDraw.Draw]: sumResults[WinLossDraw.Draw] + focusedOpeningResults[WinLossDraw.Draw],
            [WinLossDraw.Loss]: sumResults[WinLossDraw.Loss] + focusedOpeningResults[WinLossDraw.Loss],
          };

          continue;
        }

        sum[key] = opening[key];
      } catch (e) {
        sum[key] = opening[key];
      }
    }

    return sum;
  }

  private _buildMoveTree(): void {
    const moveTreesForBlack = this._gatherGamesForSide(PieceColor.Black).map((game: GameModel) => game.moveTree);
    const moveTreesForWhite = this._gatherGamesForSide(PieceColor.White).map((game: GameModel) => game.moveTree);

    this.moveTree = {
      [PieceColor.Black]: moveTreesForBlack.reduce(
        (sum: any, moveTree: any[]) => this._mergeMoveTrees(sum, moveTree),
        {},
      ),
      [PieceColor.White]: moveTreesForWhite.reduce(
        (sum: any, moveTree: any[]) => this._mergeMoveTrees(sum, moveTree),
        {},
      ),
    };
  }

  private _buildOpeningsTree(): void {
    const openingsTreeForBlack = this._gatherGamesForSide(PieceColor.Black).map((game: GameModel) => game.openingTree);
    const openingsTreeForWhite = this._gatherGamesForSide(PieceColor.White).map((game: GameModel) => game.openingTree);

    this.openingsTree = {
      [PieceColor.Black]: openingsTreeForBlack.reduce((sum, opening) => this._mergeOpeningsTrees(sum, opening), {}),
      [PieceColor.White]: openingsTreeForWhite.reduce((sum, opening) => this._mergeOpeningsTrees(sum, opening), {}),
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

  private _countWinLossByPeriod(): IWinLossDrawByPeriod {
    const itemsForPeriod = this.groupByPeriod();

    return Object.keys(itemsForPeriod).reduce((sum: any, key: string) => {
      const gamesForSinglePeriod = itemsForPeriod[key];
      const winLossAndDrawCounts = gamesForSinglePeriod.reduce(
        (sum: any, game: GameModel) => {
          const result = game.getResult(this.username);
          const ratingEffect = gameResultToWinLossDraw[result];

          if (typeof sum[ratingEffect] === 'undefined') {
            return {
              ...sum,
              [ratingEffect]: 1,
            };
          }

          return {
            ...sum,
            [ratingEffect]: sum[ratingEffect] + 1,
          };
        },
        { [WinLossDraw.Draw]: 0, [WinLossDraw.Loss]: 0, [WinLossDraw.Win]: 0 },
      );

      return {
        ...sum,
        [key]: winLossAndDrawCounts,
      };
    }, {});
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
