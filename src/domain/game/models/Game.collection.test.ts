import { ChessEngineServiceFixture } from '../../chess-engine/__mocks__/ChessEngine.service.fixture';
import { TimeClass } from '../games.constants';
import {
  gameListForDate,
  gameListForSinglePeriod,
  gameListWithMixedTimeClass,
} from '../__mocks__/game-day-archive.mocks';
import { GameCollection } from './Game.collection';

describe('GameCollection', () => {
  const chessEngineServiceFixture = new ChessEngineServiceFixture();

  describe('#firstGame', () => {
    test('should return the first game in #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1, chessEngineServiceFixture);

      // eslint-disable-next-line dot-notation
      expect(collection.firstGame).toBe(collection['_items'][0]);
    });
  });

  describe('#lastGame', () => {
    test('should return the last game in #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1, chessEngineServiceFixture);

      // eslint-disable-next-line dot-notation
      expect(collection.lastGame).toBe(collection['_items'][collection.length - 1]);
    });
  });

  describe('#moveTree', () => {
    test('should be set on instantiation', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1, chessEngineServiceFixture);

      // eslint-disable-next-line dot-notation
      expect(collection.moveTree).not.toEqual({});
    });
  });

  describe('.groupByPeriod()', () => {
    describe('when #period is 1', () => {
      test('should call .groupByHour()', () => {
        const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1, chessEngineServiceFixture);
        const groupByHourSpy = jest.spyOn(collection, 'groupByHour');

        collection.groupByHour();

        expect(groupByHourSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when #period is not 1', () => {
      test('should call .groupByDay()', () => {
        const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 2, chessEngineServiceFixture);
        const groupByDaySpy = jest.spyOn(collection, 'groupByDay');

        collection.groupByDay();

        expect(groupByDaySpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('.calculateOhlcForPeriod()', () => {
    test('returns the correct data for #period', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 2, chessEngineServiceFixture);
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

  describe('.createCollectionForPeriodAndTimeClass()', () => {
    describe('when games with TimeClass are present', () => {
      test('returns a new collection instance', () => {
        const collection = new GameCollection('n8rzz', gameListWithMixedTimeClass, 2, chessEngineServiceFixture);
        const result = collection.createCollectionForPeriodAndTimeClass(7, TimeClass.Rapid);

        expect(result instanceof GameCollection).toEqual(true);
      });

      test('returns only games with passed `TimeClass`', () => {
        const collection = new GameCollection('n8rzz', gameListWithMixedTimeClass, 2, chessEngineServiceFixture);
        const result = collection.createCollectionForPeriodAndTimeClass(7, TimeClass.Daily);
        // eslint-disable-next-line dot-notation
        const itemsWithExpectedTimeClass = result['_items'].filter((item) => item.time_class === TimeClass.Daily);

        expect(result.length).toEqual(itemsWithExpectedTimeClass.length);
      });
    });

    describe('when games with TimeClass are not present', () => {
      test('does not throw', () => {
        const collection = new GameCollection('n8rzz', gameListWithMixedTimeClass, 2, chessEngineServiceFixture);

        expect(() => collection.createCollectionForPeriodAndTimeClass(7, TimeClass.Blitz)).not.toThrow();
      });

      test('returns an empty collection', () => {
        const collection = new GameCollection('n8rzz', gameListWithMixedTimeClass, 2, chessEngineServiceFixture);
        const result = collection.createCollectionForPeriodAndTimeClass(7, TimeClass.Blitz);

        expect(result.length).toEqual(0);
      });
    });
  });

  describe('.countGamesByDate()', () => {
    test('should return a dictionary of dates and numbers', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 2, chessEngineServiceFixture);
      const result = collection.countGamesByDate();
      const expectedResult = {
        '4/17/2021': 9,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.countResultsByDate()', () => {
    test('should return IDataLabels', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 1, chessEngineServiceFixture);
      const result = collection.countResultsByDate();
      const expectedResult = {
        data: {
          checkmated: [1, 0],
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
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);

      expect(collection.findMaxRating()).toEqual(668);
    });
  });

  describe('.calculateMaxRating()', () => {
    test('should return the highest rating from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);

      expect(collection.findMaxRating()).toEqual(668);
    });
  });

  describe('.findOpeningRating()', () => {
    test('returns the rating from the first game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);

      expect(collection.findOpeningRating()).toEqual(gameListForDate[0].white.rating);
    });
  });

  describe('.findClosingRating()', () => {
    test('returns the rating from the last game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);

      expect(collection.findClosingRating()).toEqual(gameListForDate[gameListForDate.length - 1].white.rating);
    });
  });

  describe('.countGamesBySide()', () => {
    test('returns a count of games from the collection broken down by piece color', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
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
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.findMaxRating();

      expect(result).toEqual(668);
    });
  });

  describe('.findMinRating()', () => {
    test('returns the lowest rating found in #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.findMinRating();

      expect(result).toEqual(647);
    });
  });

  describe('.findEarliestGameDate()', () => {
    test('returns the date of the first game from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.findEarliestGameDate();
      const expectedResult = new Date('2021-04-17T05:42:24.000Z');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.findEarliestRating()', () => {
    test('returns the rating from the earliest game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.findEarliestRating();
      const expectedResult = 647;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.findLatestGameDate()', () => {
    test('returns the date of the latest game from #_items', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.findLatestGameDate();
      const expectedResult = new Date('2021-04-18T01:47:29.000Z');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.findLatestRating()', () => {
    test('returns the rating from the latest game', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.findLatestRating();
      const expectedResult = 661;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.gatherDetailedGameResults()', () => {
    test('returns totals for each game result from collection', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.gatherDetailedGameResults();
      const expectedResult = {
        checkmated: 3,
        resigned: 1,
        win: 5,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.gatherSimpleGameResults()', () => {
    test('returns totals for each game result from collection', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.gatherSimpleGameResults();
      const expectedResult = {
        loss: 4,
        win: 5,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('.gatherOpponentAndUserRatingsByDate()', () => {
    test('returns correct #maxRating from both series', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.gatherOpponentAndUserRatingsByDate();
      const expectedResult = 715;

      expect(result.maxRating).toEqual(expectedResult);
    });

    test('returns correct #minRating from both series', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.gatherOpponentAndUserRatingsByDate();
      const expectedResult = 604;

      expect(result.minRating).toEqual(expectedResult);
    });

    test('returns equal length arrays for #opponent and #user', () => {
      const collection = new GameCollection('n8rzz', gameListForDate, 1, chessEngineServiceFixture);
      const result = collection.gatherOpponentAndUserRatingsByDate();
      const expectedResult = 9;

      expect(result.opponent.length).toEqual(expectedResult);
      expect(result.user.length).toEqual(expectedResult);
    });
  });
});
