import { makeAutoObservable, runInAction } from 'mobx';
import Router from 'next/router';
import { TimeClass } from '../../../domain/game/games.constants';
import { getArchives, getHistorcialGamesFromArchiveList } from '../../../domain/game/games.service';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { getPlayerStats } from '../../../domain/player/player.service';
import { IPlayerStats } from '../../../domain/player/player.types';
import { initialResponseStatus } from '../../../util/mobx/mobx.utils';
import { Timeframe, timeframeToPeriod } from './StatsPage.constants';

export class StatsPageStore {
  public isStoreReady: boolean = false;
  public activeTimeclass: TimeClass = TimeClass.Rapid;
  public activeTimeframe: Timeframe = Timeframe.SevenDays;
  public playerStatsModel = initialResponseStatus<IPlayerStats | null>(null);

  private _gameCollection = initialResponseStatus<GameCollection | null>(null);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get collectionForTimeframeAndTimeClass(): GameCollection {
    return this.gameCollection.createCollectionForPeriodAndTimeClass(
      timeframeToPeriod[this.activeTimeframe],
      this.activeTimeclass,
    );
  }

  get gameCollection(): GameCollection {
    return this._gameCollection.data ?? new GameCollection('', [], -1);
  }

  get username(): string {
    return this._gameCollection.data?.username ?? '';
  }

  setActiveTimeclass(timeclass: TimeClass): void {
    this.activeTimeclass = timeclass;
  }

  setActiveTimeframe(timeframe: Timeframe): void {
    this.activeTimeframe = timeframe;
  }

  *init(): any {
    const username = Router.router?.query?.username as string;
    const timeframe = Router.router?.query?.timeframe as Timeframe;
    const timeclass = Router.router?.query?.timeClass as TimeClass;

    runInAction(() => {
      this.setActiveTimeclass(timeclass);
      this.setActiveTimeframe(timeframe);
    });

    yield Promise.all([this.loadPlayerStats(username), this.loadGameArchives(username)]);

    this.isStoreReady = true;
  }

  async loadPlayerStats(username: string): Promise<void> {
    const res = await getPlayerStats(username);

    runInAction(async () => {
      this.playerStatsModel = {
        isRequesting: false,
        data: res,
      };
    });
  }

  async loadGameArchives(username: string): Promise<void> {
    const gameList = await getArchives(username);
    const collection = await getHistorcialGamesFromArchiveList(gameList, username);

    runInAction(async () => {
      this._gameCollection = {
        isRequesting: false,
        data: collection,
      };
    });
  }
}
