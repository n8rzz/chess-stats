import { gameListForDate, gameListForSinglePeriod } from '../__mocks__/game-day-archive.mocks';
import { GameCollection } from './Game.collection';

describe('GameCollection', () => {
  describe('.countByDate()', () => {
    test('should return IDataLabels', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1);
      const result = collection.countByDate();
      const expectedResult = {
        data: {
          agreed: [0, 0],
          checkmated: [1, 0],
          resigned: [0, 0],
          stalemate: [0, 0],
          timeout: [0, 0],
          win: [1, 1],
        },
        labels: [
          '12:00:00 AM',
          '1:00:00 AM',
          // '2:00:00 AM',
          // '3:00:00 AM',
          // '4:00:00 AM',
          // '5:00:00 AM',
          // '6:00:00 AM',
          // '7:00:00 AM',
          // '8:00:00 AM',
          // '9:00:00 AM',
          // '10:00:00 AM',
          // '11:00:00 AM',
          // '12:00:00 PM',
          // '1:00:00 PM',
          // '2:00:00 PM',
          // '3:00:00 PM',
          // '4:00:00 PM',
          // '5:00:00 PM',
          // '6:00:00 PM',
          // '7:00:00 PM',
          // '8:00:00 PM',
          // '9:00:00 PM',
          // '10:00:00 PM',
          // '11:00:00 PM',
        ],
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
