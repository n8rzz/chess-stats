import React from 'react';
import styles from '../../../../styles/App.module.css';

interface IProps {
  moveList: string[];
  onClickMove: (move: string, index: number) => void;
}

export const SelectedMoveList: React.FC<IProps> = (props) => {
  const onClickMove = React.useCallback(
    (event: React.SyntheticEvent, move: string, index: number) => {
      event.preventDefault();

      props.onClickMove(move, index);
    },
    [props.moveList],
  );

  return (
    <div className={styles.selectedMoveList}>
      <ol className={styles.hlistSpacious}>
        {props.moveList.map((move: string, index: number) => (
          <li key={move}>
            <a className={styles.selectedMoveListItem} onClick={(event) => onClickMove(event, move, index)}>
              {move}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

SelectedMoveList.displayName = 'SelectedMoveList';
SelectedMoveList.defaultProps = {};
