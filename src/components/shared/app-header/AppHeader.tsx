import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Timeframe } from '../../pages/app/app.constants';
import { UserForm } from './UserForm';

interface IProps {
  onClickSearch: (provider: string, username: string, selectedTimeframe: Timeframe) => void;
}

export const AppHeader: React.FC<IProps> = (props) => {
  return (
    <Menu inverted={true}>
      <Container>
        <Menu.Item as="a" header={true}>
          Chess Stats
        </Menu.Item>

        <Menu.Menu position="right">
          <UserForm onSubmit={props.onClickSearch} />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

AppHeader.displayName = 'AppHeader';
AppHeader.defaultProps = {};
