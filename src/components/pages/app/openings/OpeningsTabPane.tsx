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
  const [selectedMoveList, setSelectedMoveList] = React.useState<string[]>([]);

  const chartData = React.useMemo(() => props.collection.buildBarchartDataForSideAtMoveNumber(props.side, moveNumber), [
    props.collection,
    props.side,
    moveNumber,
  ]);

  const handleOpeningMoveChange = React.useCallback(
    (move: string, value: WinLossDraw) => {
      console.log('+++ handleOpeningMoveChange', moveNumber, move, value, selectedMoveList);

      setMoveNumber(moveNumber + 1);
      setSelectedMoveList([...selectedMoveList, move]);
    },
    [props.collection, moveNumber],
  );

  console.log('=== openings', chartData);

  return (
    <div>
      <StackedBarChart
        moveList={selectedMoveList}
        moveNumber={moveNumber}
        onClickDataItem={handleOpeningMoveChange}
        side={props.side}
        title={`Playing as ${props.side}`}
        winLossDrawBySideAndOpening={chartData}
      />
    </div>
  );
};

OpeningsTabPane.displayName = 'OpeningsTabPane';
OpeningsTabPane.defaultProps = {};
