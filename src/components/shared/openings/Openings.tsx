import React from 'react';
import clsx from 'clsx';
import { Header, Tab } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import type { GameCollection } from '../../../domain/game/models/Game.collection';
import { OpeningsTabPane } from './OpeningsTabPane';
import { PieceColor } from '../../../domain/game/games.constants';

interface IProps {
  collection: GameCollection;
}

export const Openings: React.FC<IProps> = (props) => {
  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <Header as={'h2'}>{'Openings'}</Header>

      <Tab
        menu={{ pointing: true, secondary: true }}
        panes={[
          {
            menuItem: 'Black',
            // eslint-disable-next-line react/display-name
            render: () => <OpeningsTabPane collection={props.collection} side={PieceColor.Black} />,
          },
          {
            menuItem: 'White',
            // eslint-disable-next-line react/display-name
            render: () => <OpeningsTabPane collection={props.collection} side={PieceColor.White} />,
          },
        ]}
      />
    </div>
  );
};

Openings.displayName = 'Openings';
Openings.defaultProps = {};
