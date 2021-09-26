import React from 'react';
import Link from 'next/link';
import { Menu, Container } from 'semantic-ui-react';

interface IProps {
  isLoading: boolean;
  username: string;
}

export const AppHeader: React.FC<IProps> = (props) => {
  return (
    <Menu inverted={true} style={{ borderRadius: 0 }} size={'large'}>
      <Container>
        <Menu.Item header={true}>
          <Link href={'/'}>
            <a>Chess Stats</a>
          </Link>
        </Menu.Item>
        {!props.isLoading && (
          <Menu.Menu position={'right'}>
            <Menu.Item>Stats for: {props.username}</Menu.Item>
          </Menu.Menu>
        )}
      </Container>
    </Menu>
  );
};

AppHeader.displayName = 'AppHeader';
AppHeader.defaultProps = {};
