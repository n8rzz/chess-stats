import React from 'react';
import { GameCollection } from '../../../domain/game/models/Game.collection';

interface IProps {
  heading: string;
  gameCollection: GameCollection;
}

export const TimePeriodSection: React.FC<IProps> = (props) => {
  return (
    <div>
      <h3>{props.heading}</h3>

      <ul>
        <li>{'games black / white'}</li>
        <li>{'openings black / white'}</li>
        <li>{'line chart rating'}</li>
      </ul>
    </div>
  );
};

TimePeriodSection.displayName = 'TimePeriodSection';
TimePeriodSection.defaultProps = {};
