import React from 'react';
import clsx from 'clsx';
import { Button, Header } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import type { GameCollection } from '../../../../domain/game/models/Game.collection';
import { PieceColor, WinLossDraw } from '../../../../domain/game/games.constants';
import { reducer, buildInitialState } from './MoveHistory.reducer';
import { StackedBarChart } from '../../../ui/stacked-bar-chart/StackedBarChart';
import { SelectedMoveList } from './selected-move-list/SelectedMoveList';
import { MoveHistoryActionName } from './MoveHistory.constants';
import { Timeframe } from '../StatsPage.constants';

interface IProps {
  collection: GameCollection;
  timeframe: Timeframe;
}

export const MoveHistory: React.FC<IProps> = (props) => {
  const [state, dispatch] = React.useReducer(
    reducer,
    buildInitialState(props.collection, PieceColor.Black, props.timeframe),
  );

  React.useEffect(() => {
    const payload = {
      collection: props.collection,
    };

    if (props.timeframe !== state.timeframe) {
      dispatch({ type: MoveHistoryActionName.ChangeTimeframe, payload });
    }
  }, [props.timeframe]);

  const handleAddMove = React.useCallback((move: string, value: WinLossDraw) => {
    const payload = {
      move: move,
      result: value,
    };

    dispatch({ type: MoveHistoryActionName.AddMove, payload });
  }, []);

  const handleChangePieceColor = React.useCallback((side: PieceColor) => {
    const payload = {
      result: null,
    };

    dispatch({ type: MoveHistoryActionName.ChangePieceColor, payload });
  }, []);

  const handleClickMoveListItem = React.useCallback((move: string, index: number) => {
    const payload = {
      index: index,
      result: null,
    };

    dispatch({ type: MoveHistoryActionName.UpdateMoveList, payload });
  }, []);

  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <div className={styles.vr1}>
        <ul className={styles.stereo}>
          <li>
            <Header as={'h2'}>{'Move History'}</Header>
          </li>
          <li>
            <Button.Group>
              <Button
                active={state.side === PieceColor.Black}
                disabled={state.side === PieceColor.Black}
                toggle={true}
                size={'tiny'}
                onClick={() => handleChangePieceColor(PieceColor.Black)}
              >
                Black
              </Button>
              <Button.Or />
              <Button
                active={state.side === PieceColor.White}
                disabled={state.side === PieceColor.White}
                toggle={true}
                size={'tiny'}
                onClick={() => handleChangePieceColor(PieceColor.White)}
              >
                White
              </Button>
            </Button.Group>
          </li>
        </ul>
      </div>

      <section className={styles.vr2}>
        <SelectedMoveList moveList={state.selectedMoveList} onClickMove={handleClickMoveListItem} />
      </section>

      <StackedBarChart
        onClickDataItem={handleAddMove}
        side={state.side}
        title={`Playing as ${state.side}`}
        winLossDrawBySideAndOpening={state.chartData}
      />
    </div>
  );
};

MoveHistory.displayName = 'MoveHistory';
MoveHistory.defaultProps = {};
