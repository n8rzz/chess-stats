/* eslint-disable arrow-body-style */
import React from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { CandlestickChart } from '../../ui/candlestick/CandlestickChart';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  heading: string;
  gameCollection: GameCollection;
}

export const TimePeriodSection: React.FC<IProps> = (props) => {
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

  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <h3>{props.heading}</h3>

      <section className={clsx(styles.container, styles.vr2)}>
        <div className={styles.vr3}>
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
        </div>
      </section>

      <ul>
        <li>
          <section className={clsx(styles.container, styles.vr2)}>
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
        </li>
      </ul>

      <section className={clsx(styles.container, styles.vr2)}>
        <CandlestickChart
          countByDate={props.gameCollection.countByDate}
          ohlcData={ohlcData}
        />
      </section>

      <section>{'openings black / white'}</section>
    </div>
  );
};

TimePeriodSection.displayName = 'TimePeriodSection';
TimePeriodSection.defaultProps = {};
