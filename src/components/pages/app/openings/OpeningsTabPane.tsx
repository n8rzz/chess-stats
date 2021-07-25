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

  const chartData = React.useMemo(() => props.collection.buildBarchartDataForSideAtMoveNumber(props.side, moveNumber), [
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
      <StackedBarChart
        moveNumber={moveNumber}
        onClickDataItem={handleOpeningMoveChange}
        winLossDrawBySideAndOpening={chartData}
      />
    </div>
  );
};

OpeningsTabPane.displayName = 'OpeningsTabPane';
OpeningsTabPane.defaultProps = {};
