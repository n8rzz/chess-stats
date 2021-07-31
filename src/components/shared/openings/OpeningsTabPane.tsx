import React from 'react';
import type { PieceColor, WinLossDraw } from '../../../domain/game/games.constants';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { StackedBarChart } from '../../ui/stacked-bar-chart/StackedBarChart';
import { buildInitialState, OpeningsAction, reducer } from './Openings.reducer';

interface IProps {
  collection: GameCollection;
  side: PieceColor;
}

export const OpeningsTabPane: React.FC<IProps> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, buildInitialState(props.collection, props.side));
  // const [moveNumber, setMoveNumber] = React.useState<number>(1);
  // const [selectedMoveList, setSelectedMoveList] = React.useState<string[]>([]);

  // const chartData = React.useMemo(() => props.collection.buildBarchartDataForSideAtMoveNumber(props.side, moveNumber), [
  //   props.collection,
  //   props.side,
  //   moveNumber,
  // ]);

  const handleOpeningMoveChange = React.useCallback(
    (move: string, value: WinLossDraw) => {
      const payload = {
        move: move,
        side: props.side,
        result: value,
      };

      dispatch({ type: OpeningsAction.AddMove, payload });
    },
    [props.collection, state],
  );

  return (
    <div>
      <StackedBarChart
        moveList={state.selectedMoveList}
        moveNumber={state.moveNumber}
        onClickDataItem={handleOpeningMoveChange}
        side={props.side}
        title={`Playing as ${props.side}`}
        winLossDrawBySideAndOpening={state.chartData}
      />
    </div>
  );
};

OpeningsTabPane.displayName = 'OpeningsTabPane';
OpeningsTabPane.defaultProps = {};
