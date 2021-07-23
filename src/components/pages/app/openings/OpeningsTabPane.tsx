import React from 'react';
import type { PieceColor } from '../../../../domain/game/games.constants';
import { GameCollection } from '../../../../domain/game/models/Game.collection';

interface IProps {
  collection: GameCollection;
  side: PieceColor;
}

export const OpeningsTabPane: React.FC<IProps> = (props) => {
  const firstMoveList = React.useMemo(() => props.collection.gatherOpeningMovesForSide(props.side), [
    props.collection,
    props.side,
  ]);

  console.log('=== ', firstMoveList);

  return (
    <div>
      <ul>
        {Object.keys(firstMoveList).map((move: string) => (
          <li key={move}>
            {move}: {JSON.stringify(firstMoveList[move])}
          </li>
        ))}
      </ul>
    </div>
  );
};

OpeningsTabPane.displayName = 'OpeningsTabPane';
OpeningsTabPane.defaultProps = {};
