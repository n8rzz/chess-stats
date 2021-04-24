import { gameListForDate } from '../__mocks__/game-day-archive.mocks';
import { GameCollection } from './Game.collection';

describe('GameCollection', () => {
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('.calculateMinRating()', () => {
    test('should return the lowest rating from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);

      expect(collection.findMaxRating()).toEqual(647);
    });
  });

  describe('.calculateMaxRating()', () => {
    test('should return the highest rating from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);

      expect(collection.findMaxRating()).toEqual(668);
    });
  });
});
