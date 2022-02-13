import React from 'react';
import clsx from 'clsx';
import { Button, Header } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { GameCollection } from '../../../../domain/game/models/Game.collection';
import { PieceColor } from '../../../../domain/game/games.constants';

interface IProps {
  collection: GameCollection;
}

export const OpeningsHistory: React.FC<IProps> = (props) => {
  const [side, setSide] = React.useState<PieceColor>(PieceColor.Black);

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
      <div>OPENINGS LIST FOR {side}</div>
    </div>
  );
};

OpeningsHistory.displayName = 'OpeningsHistory';
OpeningsHistory.defaultProps = {};
