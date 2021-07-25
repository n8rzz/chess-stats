import React from 'react';
import type { PieceColor, WinLossDraw } from '../../../../domain/game/games.constants';
import { GameCollection } from '../../../../domain/game/models/Game.collection';
import { StackedBarChart } from '../../../ui/stacked-bar-chart/StackedBarChart';

interface IProps {
  collection: GameCollection;
  side: PieceColor;
}

export const OpeningsTabPane: React.FC<IProps> = (props) => {
  const [moveNumber, setMoveNumber] = React.useState<number>(1);

  const firstMoveList = React.useMemo(() => props.collection.gatherOpeningMovesForSide(props.side, moveNumber), [
    props.collection,
    props.side,
  ]);

  const handleOpeningMoveChange = React.useCallback(
    (move: string, value: WinLossDraw) => {
      console.log('+++ handleOpeningMoveChange', moveNumber, move, value);

      setMoveNumber(moveNumber + 1);
    },
    [props.collection, moveNumber],
  );

  return (
    <div>
      <ul>
        {Object.keys(firstMoveList).map((move: string) => (
          <li key={move}>
            {move}: {JSON.stringify(firstMoveList[move])}
          </li>
        ))}
      </ul>
      <StackedBarChart
        moveNumber={moveNumber}
        winLossDrawBySideAndOpening={null}
        onClickDataItem={handleOpeningMoveChange}
      />
    </div>
  );
};

OpeningsTabPane.displayName = 'OpeningsTabPane';
OpeningsTabPane.defaultProps = {};
