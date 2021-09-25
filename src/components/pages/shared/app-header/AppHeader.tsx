import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

interface IProps {}

export const AppHeader: React.FC<IProps> = (props) => {
  return (
    <Menu inverted={true} style={{ borderRadius: 0 }}>
      <Container>
        <Menu.Item as="a" header={true}>
          Chess Stats
        </Menu.Item>
      </Container>
    </Menu>
  );
};

AppHeader.displayName = 'AppHeader';
AppHeader.defaultProps = {};
