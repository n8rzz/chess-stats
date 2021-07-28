import { gameResponseWithWhiteWinner, validGameResponse } from '../__mocks__/game.mocks';
import { IGame } from '../games.types';
import { GameModel } from './Game.model';

describe('GameModel', () => {
  describe('when called without valid args', () => {
    test('should throw', () => {
      expect(() => new GameModel({} as IGame)).toThrow();
    });
  });

  describe('when called with valid args', () => {
    test('should not throw', () => {
      expect(() => new GameModel(validGameResponse)).not.toThrow();
    });
  });

  describe('.findMovesForMoveNumber()', () => {
    describe('when a move exists for both piece colors', () => {
      test('should return a list of both moves', () => {
        const model = new GameModel(validGameResponse);
        const result = model.findMovesForMoveNumber(1);

        expect(result.length).toEqual(2);
      });
    });

    describe('when white is the winner', () => {
      describe('and the last moveNumber is requested', () => {
        test('should return a list of just the white move', () => {
          const lastMoveNumber = 25;
          const model = new GameModel(gameResponseWithWhiteWinner);
          const result = model.findMovesForMoveNumber(lastMoveNumber);

          expect(result.length).toEqual(1);
        });
      });
    });
  });
});
