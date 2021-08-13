import React from 'react';
import clsx from 'clsx';
import { Card, Icon } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';

interface IProps {
  earliestGameDate: string;
  earliestRating: number;
  gameCount: number;
  isLoading: boolean;
  isOpenGreaterThanClose: boolean;
  isOpenLessThanClose: boolean;
  latestGameDate: string;
  latestRating: number;
  maxRating: number;
  minRating: number;
}

export const TimePeriodSummary: React.FC<IProps> = (props) => {
  const ratingDifference = React.useMemo(() => props.latestRating - props.earliestRating, [
    props.latestRating,
    props.earliestRating,
  ]);

  return (
    <Card.Group itemsPerRow={5}>
      <Card>
        <Card.Content>
          <Card.Header>{props.earliestRating}</Card.Header>
          <Card.Meta>{'Open'}</Card.Meta>
        </Card.Content>
        <Card.Content extra={true}>
          <Icon name={'hourglass start'} />
          <span>{props.earliestGameDate}</span>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>{props.minRating}</Card.Header>
          <Card.Meta>{'Low'}</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>{props.gameCount}</Card.Header>
          <Card.Meta>{'Total Games'}</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>{props.maxRating}</Card.Header>
          <Card.Meta>{'High'}</Card.Meta>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>
            <ul className={styles.stereo}>
              <li>
                <span
                  className={clsx({
                    [styles.mixIsGreenText]: props.isOpenLessThanClose,
                    [styles.mixIsRedText]: props.isOpenGreaterThanClose,
                  })}
                >
                  {props.latestRating}
                </span>
              </li>
              <li>
                <span
                  className={clsx({
                    [styles.mixIsGreenText]: ratingDifference > 0,
                    [styles.mixIsRedText]: ratingDifference < 0,
                  })}
                >
                  {ratingDifference > 0 && <Icon name={'angle up'} />}
                  {ratingDifference < 0 && <Icon name={'angle down'} />}
                  {ratingDifference}
                </span>
              </li>
            </ul>
          </Card.Header>
          <Card.Meta>{'Close'}</Card.Meta>
        </Card.Content>
        <Card.Content extra={true}>
          <Icon name={'stopwatch'} />
          <span>{props.latestGameDate}</span>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

TimePeriodSummary.displayName = 'TimePeriodSummary';
TimePeriodSummary.defaultProps = {};
