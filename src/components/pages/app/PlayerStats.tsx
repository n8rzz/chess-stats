import * as React from 'react';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { IPlayerStats } from '../../../domain/player/player.types';

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
    <div className={styles.container}>
      <b>{props.username}</b>
      <ul className={clsx(styles.hlist, styles.mixHlistSpaceEvenly)}>
        <li>
          <h3>{'Blitz'}</h3>
          <ul>
            <li>
              {'last: '}
              {props.player.chess_blitz.last.rating}{' '}
              <span>
                {new Date(props.player.chess_blitz.last.date).toLocaleString()}
              </span>
            </li>
            <li>
              {'Best: '}
              {props.player.chess_blitz.best.rating}{' '}
              <span>
                {new Date(props.player.chess_blitz.best.date).toLocaleString()}
              </span>
            </li>
          </ul>
        </li>
        <li>
          <h3>{'Rapid'}</h3>
          <ul>
            <li>
              {'last: '}
              {props.player.chess_rapid.last.rating}{' '}
              <span>
                {new Date(props.player.chess_rapid.last.date).toLocaleString()}
              </span>
            </li>
            <li>
              {'Best: '}
              {props.player.chess_rapid.best.rating}{' '}
              <span>
                {new Date(props.player.chess_rapid.best.date).toLocaleString()}
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

PlayerStats.displayName = 'PlayerStats';
PlayerStats.defaultProps = {};
