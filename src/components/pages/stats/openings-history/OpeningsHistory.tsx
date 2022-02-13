import React from 'react';
import clsx from 'clsx';
import { Button, Header } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { GameCollection } from '../../../../domain/game/models/Game.collection';
import { PieceColor, WinLossDraw } from '../../../../domain/game/games.constants';
import { IStackedBarChartRowItem, StackedBarChartRow } from '../../../ui/stacked-bar-chart/StackedBarChartRow';

interface IProps {
  collection: GameCollection;
}

export const OpeningsHistory: React.FC<IProps> = (props) => {
  const [side, setSide] = React.useState<PieceColor>(PieceColor.Black);

  const handleAddOpening = React.useCallback((move: string, value: WinLossDraw) => {
    console.log('+++', move, value);
  }, []);

  console.log('===', props.collection);

  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <div className={styles.vr1}>
        <ul className={styles.stereo}>
          <li>
            <Header as={'h2'}>{'Openings'}</Header>
          </li>
          <li>
            <Button.Group>
              <Button
                active={side === PieceColor.Black}
                disabled={side === PieceColor.Black}
                toggle={true}
                size={'tiny'}
                onClick={() => setSide(PieceColor.Black)}
              >
                Black
              </Button>
              <Button.Or />
              <Button
                active={side === PieceColor.White}
                disabled={side === PieceColor.White}
                toggle={true}
                size={'tiny'}
                onClick={() => setSide(PieceColor.White)}
              >
                White
              </Button>
            </Button.Group>
          </li>
        </ul>
      </div>

      <section className={styles.vr2}>
        <div className={styles.stackedBarChart}>
          <div className={styles.stackedBarChartHd}>
            {/* <ul className={styles.stereo}>
              <li>{leftColumnTitle}</li>
              <li>{rightColumnTitle}</li>
            </ul> */}
          </div>
          <div className={styles.stackedBarChartBd}>
            {Object.keys(props.collection.openingsTree[side]).map((key) => {
              const barChartData = Object.keys(props.collection.openingsTree[side][key].results).map(
                (winLossDraw: string): IStackedBarChartRowItem => ({
                  label: winLossDraw as WinLossDraw,
                  value: props.collection.openingsTree[side][key].results[winLossDraw],
                }),
              );

              return (
                <StackedBarChartRow
                  data={barChartData}
                  key={key}
                  leftAxisLabel={key}
                  move={key}
                  onClickDataItem={handleAddOpening}
                  rightAxisLabel=""
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

OpeningsHistory.displayName = 'OpeningsHistory';
OpeningsHistory.defaultProps = {};
