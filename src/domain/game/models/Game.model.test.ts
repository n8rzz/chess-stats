import { gameResponseWithWhiteWinner, validGameResponse } from '../__mocks__/game.mocks';
import { IGame } from '../games.types';
import { GameModel } from './Game.model';

describe('GameModel', () => {
  const usernameMock = 'n8rzz';

  describe('when called without valid args', () => {
    test('should throw', () => {
      expect(() => new GameModel({} as IGame, usernameMock)).toThrow();
    });
  });

  describe('when called with valid args', () => {
    test('should not throw', () => {
      expect(() => new GameModel(validGameResponse, usernameMock)).not.toThrow();
    });
  });

  describe('#accuracy', () => {
    describe('when accuracy is not included in api response', () => {
      test('should not throw', () => {
        const validGameResponseWithoutAccuracies: IGame = {
          ...validGameResponse,
          accuracies: undefined as any,
        };

        expect(() => new GameModel(validGameResponseWithoutAccuracies, usernameMock)).not.toThrow();
      });

      test('should return -1', () => {
        const validGameResponseWithoutAccuracies: IGame = {
          ...validGameResponse,
          accuracies: undefined as any,
        };
        const model = new GameModel(validGameResponseWithoutAccuracies, usernameMock);

        expect(model.accuracy).toEqual(-1);
      });
    });

    describe('when player is white', () => {
      test('should return the corrct value', () => {
        const model = new GameModel(validGameResponse, usernameMock);

        expect(model.accuracy).toEqual(validGameResponse.accuracies.black);
      });
    });

    describe('when player is black', () => {
      test('should return the corrct value', () => {
        const model = new GameModel(validGameResponse, 'fafamnl');

        expect(model.accuracy).toEqual(validGameResponse.accuracies.white);
      });
    });
  });

  describe('#moveTree', () => {
    test('should be set on instantiation', () => {
      const model = new GameModel(validGameResponse, usernameMock);

      expect(model.moveTree).not.toEqual({});
    });

    test('should include a list of move pairs for a game', () => {
      const model = new GameModel(validGameResponse, usernameMock);
      const expectedResult = [
        'e4:e5',
        'Nf3:Nf6',
        'd3:Nc6',
        'Nc3:Bc5',
        'Qd2:O-O',
        'd4:exd4',
        'Nxd4:Bxd4',
        'Nb5:Re8',
        'Qf4:Nxe4',
        'Nxc7:Nxf2+',
        'Kd2:Nxh1',
        'Bc4:Re6',
        'Bxe6:dxe6',
        'Nxa8:Bxb2+',
        'Ke1:Bc3+',
        'Kf1:Qd1#',
      ];

      expect(model.moveList).toEqual(expectedResult);
    });

    test('should be a deeply nested object with move pairs as keys', () => {
      const model = new GameModel(validGameResponse, usernameMock);
      const expectedResult = {
        'e4:e5': {
          results: {
            win: 1,
          },
          'Nf3:Nf6': {
            results: {
              win: 1,
            },
            'd3:Nc6': {
              results: {
                win: 1,
              },
              'Nc3:Bc5': {
                results: {
                  win: 1,
                },
                'Qd2:O-O': {
                  results: {
                    win: 1,
                  },
                  'd4:exd4': {
                    results: {
                      win: 1,
                    },
                    'Nxd4:Bxd4': {
                      results: {
                        win: 1,
                      },
                      'Nb5:Re8': {
                        results: {
                          win: 1,
                        },
                        'Qf4:Nxe4': {
                          results: {
                            win: 1,
                          },
                          'Nxc7:Nxf2+': {
                            results: {
                              win: 1,
                            },
                            'Kd2:Nxh1': {
                              results: {
                                win: 1,
                              },
                              'Bc4:Re6': {
                                results: {
                                  win: 1,
                                },
                                'Bxe6:dxe6': {
                                  results: {
                                    win: 1,
                                  },
                                  'Nxa8:Bxb2+': {
                                    results: {
                                      win: 1,
                                    },
                                    'Ke1:Bc3+': {
                                      results: {
                                        win: 1,
                                      },
                                      'Kf1:Qd1#': {
                                        results: {
                                          win: 1,
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      expect(model.moveTree).toEqual(expectedResult);
    });
  });

  describe('.findMovesForMoveNumber()', () => {
    describe('when a move exists for both piece colors', () => {
      test('should return a list of both moves', () => {
        const model = new GameModel(validGameResponse, usernameMock);
        const result = model.findMovesForMoveNumber(1);

        expect(result.length).toEqual(2);
      });
    });

    describe('when white is the winner', () => {
      describe('and the last moveNumber is requested', () => {
        test('should return a list of just the white move', () => {
          const lastMoveNumber = 25;
          const model = new GameModel(gameResponseWithWhiteWinner, usernameMock);
          const result = model.findMovesForMoveNumber(lastMoveNumber);

          expect(result.length).toEqual(1);
        });
      });
    });
  });
});
