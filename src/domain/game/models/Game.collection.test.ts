import { PieceColor } from '../games.constants';
import { gameListForDate, gameListForSinglePeriod } from '../__mocks__/game-day-archive.mocks';
import { GameCollection } from './Game.collection';

describe('GameCollection', () => {
  describe('#firstGame', () => {
    test('should return the first game in #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1);

      // eslint-disable-next-line dot-notation
      expect(collection.firstGame).toBe(collection['_items'][0]);
    });
  });

  describe('#lastGame', () => {
    test('should return the last game in #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1);

      // eslint-disable-next-line dot-notation
      expect(collection.lastGame).toBe(collection['_items'][collection.length - 1]);
    });
  });

  describe('.groupByPeriod()', () => {
    describe('when #period is 1', () => {
      test('should call .groupByHour()', () => {
        const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1);
        const groupByHourSpy = jest.spyOn(collection, 'groupByHour');

        collection.groupByHour();

        expect(groupByHourSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when #period is not 1', () => {
      test('should call .groupByDay()', () => {
        const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 2);
        const groupByDaySpy = jest.spyOn(collection, 'groupByDay');

        collection.groupByDay();

        expect(groupByDaySpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('.calculateOhlcForPeriod()', () => {
    test('returns the correct data for #period', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 2);
      const result = collection.calculateOhlcForPeriod();
      const expectedResult = [
        {
          date: '4/17/2021',
          open: 647,
          high: 661,
          low: 647,
          close: 661,
          volume: 3,
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

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

  describe('.findOpeningRating()', () => {
    test('returns the rating from the first game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);

      expect(collection.findOpeningRating()).toEqual(gameListForDate[0].white.rating);
    });
  });

  describe('.findClosingRating()', () => {
    test('returns the rating from the last game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);

      expect(collection.findClosingRating()).toEqual(gameListForDate[gameListForDate.length - 1].white.rating);
    });
  });

  describe('.countGamesBySide()', () => {
    test('returns a count of games from the collection broken down by piece color', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.countGamesBySide();
      const expectedResult = {
        black: 4,
        white: 5,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.findMaxRating()', () => {
    test('returns the highest rating found in #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.findMaxRating();

      expect(result).toEqual(668);
    });
  });

  describe('.findMinRating()', () => {
    test('returns the lowest rating found in #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.findMinRating();

      expect(result).toEqual(647);
    });
  });

  describe('.findEarliestGameDate()', () => {
    test('returns the date of the first game from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.findEarliestGameDate();
      const expectedResult = new Date('2021-04-17T05:42:24.000Z');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.findEarliestRating()', () => {
    test('returns the rating from the earliest game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.findEarliestRating();
      const expectedResult = 647;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.findLatestGameDate()', () => {
    test('returns the date of the latest game from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.findLatestGameDate();
      const expectedResult = new Date('2021-04-18T01:47:29.000Z');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.findLatestRating()', () => {
    test('returns the rating from the latest game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.findLatestRating();
      const expectedResult = 661;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.gatherGameResults()', () => {
    test('returns totals for each game result from collection', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1);
      const result = collection.gatherGameResults();
      const expectedResult = {
        checkmated: 3,
        resigned: 1,
        win: 5,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.gatherOpeningMovesForSide()', () => {
    describe('when #side is passed as `white`', () => {
      test('returns dictionary of first moves for games #player was `white`', () => {
        const collection = new GameCollection('n8rzz', gameListForDate, 1);
        const result = collection.gatherOpeningMovesForSide(PieceColor.White, 1);
        const keysFromResult = Object.keys(result);
        const expectedKeysFromResult = ['e4'];

        expect(keysFromResult).toEqual(expectedKeysFromResult);
      });
    });
  });
});
