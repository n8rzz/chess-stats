import { gameListForDate, gameListForSinglePeriod } from '../__mocks__/game-day-archive.mocks';
import { GameCollection } from './Game.collection';

describe('GameCollection', () => {
  describe('.countByDate()', () => {
    test('should return IDataLabels', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1);
      const result = collection.countByDate();
      const expectedResult = {
        data: {
          abandoned: [0, 0],
          agreed: [0, 0],
          bughousepartnerlose: [0, 0],
          checkmated: [1, 0],
          fiftymove: [0, 0],
          insufficient: [0, 0],
          kingofthehill: [0, 0],
          lose: [0, 0],
          repetition: [0, 0],
          resigned: [0, 0],
          stalemate: [0, 0],
          threecheck: [0, 0],
          timeout: [0, 0],
          timevsinsufficient: [0, 0],
          win: [1, 1],
        },
        labels: ['12:00:00 AM', '1:00:00 AM'],
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
