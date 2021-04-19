import * as React from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { CandlestickChart } from '../../ui/candlestick/CandlestickChart';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  gameCollection: GameCollection;
  isLoading: boolean;
}

/**
 * @deprecated
 */
export const GameStats: React.FC<IProps> = (props) => {
  const ohlcData = React.useMemo(
    () => props.gameCollection.calculateOhlcForPeriod(),
    [props.gameCollection],
  );

  const gamesBySide = React.useMemo(
    () => props.gameCollection.countGamesBySide(),
    [props.gameCollection],
  );

  const gameResults = React.useMemo(
    () => props.gameCollection.gatherGameResults(),
    [props.gameCollection],
  );

  if (props.isLoading) {
    return <div className={styles.container}>{'LOADING...'}</div>;
  }

  if (props.gameCollection.length === 0) {
    return <div className={styles.container}>{'No Games'}</div>;
  }

  return (
    <div>
      <section className={styles.container}>
        <ul className={styles.hlist}>
          <li>
            {'Start:'}
            <span>
              {`${props.gameCollection
                .findEarliestGameDate()
                .toLocaleDateString()}`}
            </span>
          </li>
          <li>
            {'end:'}
            <span>
              {`${props.gameCollection
                .findLatestGameDate()
                .toLocaleDateString()}`}
            </span>
          </li>
          <li>
            {'Total Games: '}
            {props.gameCollection.length}
          </li>
        </ul>
      </section>

      <section className={styles.container}>
        <ul className={clsx(styles.hlist, styles.mixHlistSpaceEvenly)}>
          <li>
            <Chart
              series={[gamesBySide.black, gamesBySide.white]}
              options={{
                title: {
                  text: 'Games by Side',
                  align: 'left',
                },
                labels: ['black', 'white'],
              }}
              type={'pie'}
              height={150}
            />
          </li>
          <li>
            <Chart
              series={Object.keys(gameResults).map(
                (key: string) => gameResults[key],
              )}
              options={{
                title: {
                  text: 'Games by Side',
                  align: 'left',
                },
                labels: Object.keys(gameResults),
              }}
              type={'pie'}
              height={150}
            />
          </li>
        </ul>
      </section>

      <section className={styles.container}>
        <CandlestickChart
          countByDate={props.gameCollection.countByDate}
          ohlcData={ohlcData}
        />
      </section>
    </div>
  );
};

GameStats.displayName = 'GameStats';
GameStats.defaultProps = {};
