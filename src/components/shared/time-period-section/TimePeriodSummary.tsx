import React from 'react';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { Card } from 'semantic-ui-react';
import type { GameCollection } from '../../../domain/game/models/Game.collection';

interface IProps {
  gameCollection: GameCollection;
  isLoading: boolean;
}

export const TimePeriodSummary: React.FC<IProps> = (props) => {
  const cardItems = React.useMemo(() => {
    return [
      {
        header: props.gameCollection.findEarliestRating(),
        meta: `Open - ${props.gameCollection.findEarliestGameDate().toLocaleDateString()}`,
      },
      {
        header: props.gameCollection.findMinRating(),
        meta: 'Low',
      },
      {
        header: props.gameCollection.length,
        meta: 'Total Games',
      },
      {
        header: props.gameCollection.findMaxRating(),
        meta: 'High',
      },
      {
        header: (
          <span
            className={clsx({
              [styles.mixIsGreenText]: props.gameCollection.isOpenLessThanClose,
              [styles.mixIsRedText]: props.gameCollection.isOpenGreaterThanClose,
            })}
          >
            {props.gameCollection.findLatestRating()}
          </span>
        ),
        meta: `Close - ${props.gameCollection.findLatestGameDate().toLocaleDateString()}`,
      },
    ];
  }, [props.isLoading, props.gameCollection]);

  return <Card.Group items={cardItems} itemsPerRow={5} />;
};

TimePeriodSummary.displayName = 'TimePeriodSummary';
TimePeriodSummary.defaultProps = {};
