import { validGameResponse } from '../__mocks__/game.mocks';
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
});
