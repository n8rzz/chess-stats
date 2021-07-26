import * as React from 'react';
import clsx from 'clsx';
import { Dimmer, Header, Loader, Segment } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { IChessStats } from '../../../../domain/player/player.types';
import { GameTypeStats } from '../../../shared/game-type-stats/GameTypeStats';

interface IProps {
  isLoading: boolean;
  label: string;
  stats: IChessStats;
}

export const PlayerStats: React.FC<IProps> = (props) => {
  if (props.isLoading) {
    return (
      <Segment placeholder={true}>
        <Dimmer active={true} inverted={true}>
          <Loader content={'Loading...'} indeterminate={true} />
        </Dimmer>
      </Segment>
    );
  }

  if (props?.stats == null) {
    return <div className={styles.container}>{'No Player'}</div>;
  }

  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <Header as={'h2'}>{props.label}</Header>

      <GameTypeStats isLoading={props.isLoading} label={'Rapid'} stats={props.stats} />
    </div>
  );
};

PlayerStats.displayName = 'PlayerStats';
PlayerStats.defaultProps = {};
