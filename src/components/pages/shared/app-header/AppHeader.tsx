import React from 'react';
import { Menu, Container, Button, Input, Select } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { TimeClass } from '../../../../domain/game/games.constants';
import { timeClassOptionList, Timeframe, timeframeOptionList } from '../../stats/StatsPage.constants';

interface IProps {
  onClickSearch: (
    provider: string,
    username: string,
    selectedTimeframe: Timeframe,
    selectedTimeClass: TimeClass,
  ) => void;
}

export const AppHeader: React.FC<IProps> = (props) => {
  const [username, setUsername] = React.useState<string>('');
  const [selectedTimeClass, setSelectedTimeClass] = React.useState<TimeClass>(TimeClass.Rapid);
  const [isUsernameValid, setIsUsernameValid] = React.useState<boolean>(true);
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<Timeframe>(Timeframe.SevenDays);
  const [provider] = React.useState<string>('chess.com');

  const onClickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username) {
      setIsUsernameValid(false);

      return;
    }

    props.onClickSearch(provider, username, selectedTimeframe, selectedTimeClass);
  };

  return (
    <Menu inverted={true}>
      <Container>
        <Menu.Item as="a" header={true}>
          Chess Stats
          <span className={styles.uIsVisuallyHidden}>{process.env.NEXT_PUBLIC_APP_VERSION}</span>
        </Menu.Item>

        <Menu.Menu position="right">
          <section className={styles.container}>
            <form autoComplete={'on'} onSubmit={onClickSubmit}>
              <ul className={styles.hlist}>
                <li>
                  <Input
                    type={'text'}
                    placeholder={'Username'}
                    name={'username'}
                    defaultValue={username}
                    error={!isUsernameValid}
                    onChange={(event) => {
                      setIsUsernameValid(true);
                      setUsername(event.currentTarget.value);
                    }}
                  />
                </li>
                <li>
                  <Select
                    name={'timeClass'}
                    options={timeClassOptionList}
                    defaultValue={selectedTimeClass}
                    onChange={(_, data) => setSelectedTimeClass(data.value as TimeClass)}
                    compact={true}
                  />
                </li>
                <li>
                  <div style={{ minWidth: '8em' }}>
                    <Select
                      name={'timeframe'}
                      options={timeframeOptionList}
                      defaultValue={selectedTimeframe}
                      onChange={(_, data) => setSelectedTimeframe(data.value as Timeframe)}
                      fluid={true}
                    />
                  </div>
                </li>
                <li>
                  <Button type={'submit'} disabled={!isUsernameValid}>
                    {'Search'}
                  </Button>
                </li>
              </ul>
            </form>
          </section>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

AppHeader.displayName = 'AppHeader';
AppHeader.defaultProps = {};
