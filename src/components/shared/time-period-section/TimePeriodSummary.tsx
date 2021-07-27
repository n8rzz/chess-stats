import clsx from 'clsx';
import React from 'react';
import styles from '../../../styles/App.module.css';
import { Container, List, Statistic } from 'semantic-ui-react';
import type { GameCollection } from '../../../domain/game/models/Game.collection';

interface IProps {
  gameCollection: GameCollection;
  isLoading: boolean;
}

export const TimePeriodSummary: React.FC<IProps> = (props) => {
  return (
    <Container className={clsx(styles.container)} textAlign={'center'}>
      <List className={styles.mixContainerCenter} size={'mini'} horizontal={true} relaxed={true}>
        <List.Item>
          <Statistic size={'mini'}>
            <Statistic.Value>{props.gameCollection.findEarliestGameDate().toLocaleDateString()}</Statistic.Value>
            <Statistic.Label>{props.gameCollection.findEarliestRating()}</Statistic.Label>
          </Statistic>
        </List.Item>
        <List.Item>
          <Statistic size={'tiny'}>
            <Statistic.Value>{props.gameCollection.findMinRating()}</Statistic.Value>
            <Statistic.Label>{'Period Low'}</Statistic.Label>
          </Statistic>
        </List.Item>
        <List.Item>
          <Statistic size={'small'}>
            <Statistic.Value>{props.gameCollection.length}</Statistic.Value>
            <Statistic.Label>{'Games'}</Statistic.Label>
          </Statistic>
        </List.Item>
        <List.Item>
          <Statistic size={'tiny'}>
            <Statistic.Value>{props.gameCollection.findMaxRating()}</Statistic.Value>
            <Statistic.Label>{'Period High'}</Statistic.Label>
          </Statistic>
        </List.Item>
        <List.Item>
          <Statistic size={'mini'}>
            <Statistic.Value>{props.gameCollection.findLatestGameDate().toLocaleDateString()}</Statistic.Value>
            <Statistic.Label>
              <span
                className={clsx({
                  [styles.mixIsGreenText]: props.gameCollection.isOpenLessThanClose,
                  [styles.mixIsRedText]: props.gameCollection.isOpenGreaterThanClose,
                })}
              >
                {props.gameCollection.findLatestRating()}
              </span>
            </Statistic.Label>
          </Statistic>
        </List.Item>
      </List>
    </Container>
  );
};

TimePeriodSummary.displayName = 'TimePeriodSummary';
TimePeriodSummary.defaultProps = {};
