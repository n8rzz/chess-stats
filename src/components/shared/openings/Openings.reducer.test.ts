import { PieceColor } from '../../../domain/game/games.constants';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { gameListForSinglePeriod } from '../../../domain/game/__mocks__/game-day-archive.mocks';
import { buildInitialState, reducer } from './Openings.reducer';
import {
  addMoveActionMock,
  changePieceColorActionMock,
  updateMoveListActionMock,
} from './__mocks__/openings.reducer.mocks';

describe('openings reducer', () => {
  describe('.buildInitialState()', () => {
    describe('when passed valid params', () => {
      test('should not throw', () => {
        const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 7);

        expect(() => buildInitialState(collection, PieceColor.White)).not.toThrow();
      });
    });
  });

  describe('AddMove action', () => {
    describe('from initialState', () => {
      test('should add #move to #moveList', () => {
        const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 7);
        const initialState = buildInitialState(collection, PieceColor.White);
        const result = reducer(initialState, addMoveActionMock);

        expect(result.selectedMoveList).toEqual([addMoveActionMock.payload?.move]);
      });

      test('should recalculate #chartData', () => {
        const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 7);
        const initialState = buildInitialState(collection, PieceColor.White);
        const originalChartData = { ...initialState.chartData };
        const result = reducer(initialState, addMoveActionMock);

        expect(result.chartData).not.toEqual(originalChartData);
      });
    });
  });

  describe('ChangePieceColor action', () => {
    test('should reset #selectedMoveList', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 7);
      const initialState = buildInitialState(collection, PieceColor.White);

      initialState.selectedMoveList = ['one', 'two', 'three'];

      const result = reducer(initialState, changePieceColorActionMock);

      expect(result.selectedMoveList.length).toEqual(0);
    });

    test('should reset #side', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 7);
      const initialState = buildInitialState(collection, PieceColor.White);
      const result = reducer(initialState, changePieceColorActionMock);

      expect(result.side).toEqual(PieceColor.Black);
    });
  });

  describe('UpdateMoveList action', () => {
    test('should reset #selectedMoveList', () => {
      const collection = new GameCollection('n8rzz', gameListForSinglePeriod, 7);
      const initialState = buildInitialState(collection, PieceColor.White);

      initialState.selectedMoveList = ['e4:e5', 'c4:c5', 'f4:f5'];

      const result = reducer(initialState, updateMoveListActionMock);

      expect(result.selectedMoveList.length).toEqual(1);
    });
  });
});
