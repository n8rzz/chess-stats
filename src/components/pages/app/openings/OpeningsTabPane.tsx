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

  console.log('=== openings', chartData);

  return (
    <div>
      <StackedBarChart
        moveList={['e5:d4', 'c4:Nf6']}
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
