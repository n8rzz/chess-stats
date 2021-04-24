import * as React from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { Segment, Grid, Divider, Statistic, Header } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { IPlayerStats } from '../../../domain/player/player.types';
import { setDateFromUtcSeconds } from '../../../util/date.utils';
import { GameTypeStats } from './player-stats/game-type-stats/GameTypeStats';

// eslint-disable-next-line arrow-body-style
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

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
