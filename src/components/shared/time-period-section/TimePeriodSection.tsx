/* eslint-disable arrow-body-style */
import React from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import styles from '../../../styles/App.module.css';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { CandlestickChart } from '../../ui/candlestick/CandlestickChart';
import { Grid, Header, List, Statistic } from 'semantic-ui-react';

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
      <section className={clsx(styles.container, styles.vr2)}>
        <List size={'large'} horizontal={true} relaxed={true}>
          <List.Item>
            <Header as={'h3'}>{props.heading}</Header>
          </List.Item>
          <List.Item>
            <Statistic size={'mini'}>
              <Statistic.Value>
                {props.gameCollection
                  .findEarliestGameDate()
                  .toLocaleDateString()}
              </Statistic.Value>
              <Statistic.Label>{'Start'}</Statistic.Label>
            </Statistic>
          </List.Item>
          <List.Item>
            <Statistic size={'mini'}>
              <Statistic.Value>
                {props.gameCollection.findLatestGameDate().toLocaleDateString()}
              </Statistic.Value>
              <Statistic.Label>{'End'}</Statistic.Label>
            </Statistic>
          </List.Item>
          <List.Item>
            <Statistic size={'mini'}>
              <Statistic.Value>{props.gameCollection.length}</Statistic.Value>
              <Statistic.Label>{'Games'}</Statistic.Label>
            </Statistic>
          </List.Item>
        </List>

        <Grid columns={2}>
          <Grid.Column>
            <Chart
              series={[gamesBySide.black, gamesBySide.white]}
              options={{
                title: {
                  text: 'Side',
                  align: 'left',
                },
                labels: ['black', 'white'],
              }}
              type={'pie'}
              height={150}
            />
          </Grid.Column>

          <Grid.Column>
            <Chart
              series={Object.keys(gameResults).map(
                (key: string) => gameResults[key],
              )}
              options={{
                title: {
                  text: 'Result',
                  align: 'left',
                },
                labels: Object.keys(gameResults),
              }}
              type={'pie'}
              height={150}
            />
          </Grid.Column>
        </Grid>
      </section>

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
