import { gameListForDate } from '../__mocks__/game-day-archive.mocks';
import { GameCollection } from './Game.collection';

describe('GameCollection', () => {
  describe('.countByDate()', () => {
    test('should return IDataLabels', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.countByDate();
      const expectedResult = {
        data: [2, 1, 4, 2],
        labels: ['12:00:00 AM', '1:00:00 AM', '12:00:00 PM', '8:00:00 PM'],
      };

      expect(result.data).toEqual(expectedResult.data);
      expect(result.labels).toEqual(expectedResult.labels);
    });
  });

  describe('.calculateMinRating()', () => {
    test('should return the lowest rating from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);

      expect(collection.findMaxRating()).toEqual(668);
    });
  });

  describe('.calculateMaxRating()', () => {
    test('should return the highest rating from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);

      expect(collection.findMaxRating()).toEqual(668);
    });
  });
});
