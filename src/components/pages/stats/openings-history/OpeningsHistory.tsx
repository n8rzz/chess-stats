import React from 'react';
import clsx from 'clsx';
import { Button, Header } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { GameCollection } from '../../../../domain/game/models/Game.collection';

interface IProps {
  collection: GameCollection;
}

export const OpeningsHistory: React.FC<IProps> = (props) => {
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
                active={true}
                // active={state.side === PieceColor.Black}
                // disabled={state.side === PieceColor.Black}
                toggle={true}
                size={'tiny'}
                // onClick={() => handleChangePieceColor(PieceColor.Black)}
              >
                Black
              </Button>
              <Button.Or />
              <Button
                // active={state.side === PieceColor.White}
                // disabled={state.side === PieceColor.White}
                toggle={true}
                size={'tiny'}
                // onClick={() => handleChangePieceColor(PieceColor.White)}
              >
                White
              </Button>
            </Button.Group>
          </li>
        </ul>
      </div>
      <div>OPENINGS LIST FOR SIDE</div>
    </div>
  );
};

OpeningsHistory.displayName = 'OpeningsHistory';
OpeningsHistory.defaultProps = {};
