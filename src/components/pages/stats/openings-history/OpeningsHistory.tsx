import React from 'react';
import clsx from 'clsx';
import { Button, Header } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { GameCollection } from '../../../../domain/game/models/Game.collection';
import { PieceColor, WinLossDraw } from '../../../../domain/game/games.constants';
import { IStackedBarChartRowItem, StackedBarChartRow } from '../../../ui/stacked-bar-chart/StackedBarChartRow';
import { SelectedMoveList } from '../move-history/selected-move-list/SelectedMoveList';

interface IProps {
  collection: GameCollection;
}

export const OpeningsHistory: React.FC<IProps> = (props) => {
  const [side, setSide] = React.useState<PieceColor>(PieceColor.Black);
  const [selectedOpeningsList, setSelectedOpeningsList] = React.useState<string[]>([]);
  const [selectedOpeningsTree, setSelectedOpeningsTree] = React.useState(props.collection.openingsTree[side]);

  const handleChangeSide = React.useCallback(
    (nextSide: PieceColor) => {
      setSide(nextSide);
      setSelectedOpeningsList([]);
      setSelectedOpeningsTree(props.collection.openingsTree[nextSide]);
    },
    [selectedOpeningsList, props.collection],
  );

  const handleClicOpeningListItem = React.useCallback(
    (move: string, index: number) => {
      console.log('+++ handleClicOpeningListItem', move, index);
    },
    [selectedOpeningsTree],
  );

  const handleAddOpening = React.useCallback(
    (move: string, value: WinLossDraw) => {
      setSelectedOpeningsList([...selectedOpeningsList, move]);
      setSelectedOpeningsTree(selectedOpeningsTree[move]);
    },
    [selectedOpeningsList, selectedOpeningsTree],
  );

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
                onClick={() => handleChangeSide(PieceColor.Black)}
              >
                Black
              </Button>
              <Button.Or />
              <Button
                active={side === PieceColor.White}
                disabled={side === PieceColor.White}
                toggle={true}
                size={'tiny'}
                onClick={() => handleChangeSide(PieceColor.White)}
              >
                White
              </Button>
            </Button.Group>
          </li>
        </ul>
      </div>

      <section className={styles.vr2}>
        <SelectedMoveList moveList={selectedOpeningsList} onClickMove={handleClicOpeningListItem} />
      </section>

      <section className={styles.vr2}>
        <div className={styles.stackedBarChart}>
          <div className={styles.stackedBarChartBd}>
            {Object.keys(selectedOpeningsTree)
              .filter((key: string) => key !== 'opening' && key !== 'results')
              .map((key) => {
                const chartData = Object.keys(selectedOpeningsTree[key].results).map(
                  (winLossDraw: string): IStackedBarChartRowItem => ({
                    label: winLossDraw as WinLossDraw,
                    value: selectedOpeningsTree[key].results[winLossDraw],
                  }),
                );

                return (
                  <StackedBarChartRow
                    data={chartData}
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
