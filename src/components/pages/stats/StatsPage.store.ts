import { makeAutoObservable } from 'mobx';

export class StatsPageStore {
  public isStoreReady: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  *init(): any {
    this.isStoreReady = true;
  }
}
