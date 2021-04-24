import * as React from 'react';
import clsx from 'clsx';
import { Header } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { IPlayerStats } from '../../../../domain/player/player.types';
import { GameTypeStats } from './game-type-stats/GameTypeStats';

interface IProps {
  isLoading: boolean;
  player: IPlayerStats;
  username: string;
}

export const PlayerStats: React.FC<IProps> = (props) => {
  if (props.isLoading) {
    return <div className={styles.container}>{'LOADING...'}</div>;
  }

  if (props.player == null) {
    return <div className={styles.container}>{'No Player'}</div>;
  }

  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <Header as={'h2'}>{'All-Time Records'}</Header>

      <GameTypeStats label={'Rapid'} stats={props.player.chess_rapid} />
      <GameTypeStats label={'Rapid'} stats={props.player.chess_rapid} />
    </div>
  );
};

PlayerStats.displayName = 'PlayerStats';
PlayerStats.defaultProps = {};
