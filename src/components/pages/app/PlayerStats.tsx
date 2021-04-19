import * as React from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { IPlayerStats } from '../../../domain/player/player.types';
import { setDateFromUtcSeconds } from '../../../util/date.utils';

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
      <b>{props.username}</b>

      <ul>
        <li>
          <h3>{'Rapid'}</h3>
          <ul className={clsx(styles.hlist, styles.mixHlistSpaceEvenly)}>
            <li>
              <Chart
                series={[
                  props.player.chess_rapid.record.win,
                  props.player.chess_rapid.record.loss,
                  props.player.chess_rapid.record.draw,
                ]}
                options={{
                  title: {
                    text: 'Record',
                    align: 'left',
                  },
                  labels: ['win', 'loss', 'draw'],
                }}
                type={'pie'}
                height={150}
              />
            </li>
            <li>
              <ul>
                <li>
                  {'last: '}
                  {props.player.chess_rapid.last.rating}{' '}
                  <span>
                    {setDateFromUtcSeconds(
                      props.player.chess_rapid.last.date,
                    ).toLocaleString()}
                  </span>
                </li>
                <li>
                  {'Best: '}
                  {props.player.chess_rapid.best.rating}{' '}
                  <span>
                    {setDateFromUtcSeconds(
                      props.player.chess_rapid.best.date,
                    ).toLocaleString()}
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <h3>{'Blitz'}</h3>
          <ul className={clsx(styles.hlist, styles.mixHlistSpaceEvenly)}>
            <li>
              <Chart
                series={[
                  props.player.chess_blitz.record.win,
                  props.player.chess_blitz.record.loss,
                  props.player.chess_blitz.record.draw,
                ]}
                options={{
                  title: {
                    text: 'Record',
                    align: 'left',
                  },
                  labels: ['win', 'loss', 'draw'],
                }}
                type={'pie'}
                height={150}
              />
            </li>
            <li>
              <ul>
                <li>
                  {'last: '}
                  {props.player.chess_blitz.last.rating}{' '}
                  <span>
                    {setDateFromUtcSeconds(
                      props.player.chess_blitz.last.date,
                    ).toLocaleString()}
                  </span>
                </li>
                <li>
                  {'Best: '}
                  {props.player.chess_blitz.best.rating}{' '}
                  <span>
                    {setDateFromUtcSeconds(
                      props.player.chess_blitz.best.date,
                    ).toLocaleString()}
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

PlayerStats.displayName = 'PlayerStats';
PlayerStats.defaultProps = {};
