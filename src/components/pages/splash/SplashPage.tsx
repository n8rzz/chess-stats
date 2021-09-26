import React from 'react';
import Router, { useRouter } from 'next/router';
import { Container, Header, Segment, Card, Icon } from 'semantic-ui-react';
import { TimeClass } from '../../../domain/game/games.constants';
import { Timeframe } from '../stats/StatsPage.constants';
import { UserForm } from './user-form/UserForm';

interface IProps {
  appVersion: string;
}

export const SplashPage: React.FC<IProps> = (props) => {
  const router = useRouter();

  const errorMessage = React.useMemo(() => {
    if (!router.isReady || !router.query?.message) {
      return '';
    }

    return decodeURIComponent(router.query?.message as string);
  }, [router.query]);

  const handleSubmit = (
    provider: string,
    username: string,
    selectedTimeframe: Timeframe,
    selectedTimeClass: TimeClass,
  ) => {
    Router.push({
      pathname: '/stats',
      query: {
        provider,
        username,
        timeframe: selectedTimeframe,
        timeClass: selectedTimeClass,
      },
    });
  };

  return (
    <Container text={true} style={{ marginTop: '100px' }}>
      <Header>chessstats.co</Header>
      <Segment
        color={'green'}
        compact={true}
        padded={'very'}
        secondary={true}
        stacked={true}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Card>
          <Card.Content header={'Chess.com extended stats'} />
          {errorMessage !== '' && <Card.Content style={{ color: '#f42000' }}>{errorMessage}</Card.Content>}
          <Card.Content fluid={'true'}>
            <UserForm onSubmit={handleSubmit} />
          </Card.Content>
          <Card.Content extra={true} style={{ alignItems: 'center', display: 'flex' }}>
            <Icon name="cogs" size={'large'} />
            <span style={{ fontSize: '12px', fontStyle: 'italic', marginLeft: '5px' }}>{props.appVersion}</span>
          </Card.Content>
        </Card>
      </Segment>
    </Container>
  );
};

SplashPage.displayName = 'SplashPage';
SplashPage.defaultProps = {};
