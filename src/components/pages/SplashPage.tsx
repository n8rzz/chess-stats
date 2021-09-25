import React from 'react';
import { Container, Header } from 'semantic-ui-react';

interface IProps {}

export const SplashPage: React.FC<IProps> = (props) => {
  return (
    <Container text={true}>
      <Header
        as={'h1'}
        content={'No Data'}
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '3em',
        }}
      />
      <Header
        as={'h2'}
        content={'Enter your chess.com username above and click search.'}
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
        }}
      />
    </Container>
  );
};

SplashPage.displayName = 'SplashPage';
SplashPage.defaultProps = {};
