import React from 'react';
import { Form, Input, Grid, Select, Button, Checkbox } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { TimeClass } from '../../../../domain/game/games.constants';
import { timeframeOptionList, Timeframe, timeClassOptionList } from '../../stats/StatsPage.constants';

interface IProps {
  onSubmit: (provider: string, username: string, selectedTimeframe: Timeframe, selectedTimeClass: TimeClass) => void;
}

export const UserForm: React.FC<IProps> = (props) => {
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

    props.onSubmit(provider, username, selectedTimeframe, selectedTimeClass);
  };

  return (
    <form autoComplete={'on'} onSubmit={onClickSubmit}>
      <div className={styles.vr2}>
        <Form.Field>
          <label>
            <b>Chess.com Username</b>
          </label>
          <Input
            defaultValue={username}
            error={!isUsernameValid}
            icon={'users'}
            iconPosition={'left'}
            fluid={true}
            name={'username'}
            placeholder={'Username'}
            type={'text'}
            onChange={(event) => {
              setIsUsernameValid(true);
              setUsername(event.currentTarget.value);
            }}
          />
          {!isUsernameValid && (
            <div style={{ color: '#f4200066', fontStyle: 'italic' }}>{'Username is a required field'}</div>
          )}
        </Form.Field>
      </div>

      <div className={styles.vr3}>
        <Grid centered={true} columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Timeframe</label>
                <Select
                  name={'timeframe'}
                  options={timeframeOptionList}
                  defaultValue={selectedTimeframe}
                  onChange={(_, data) => setSelectedTimeframe(data.value as Timeframe)}
                  fluid={true}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>Game Type</label>
                <Select
                  name={'timeClass'}
                  label={'timeClass'}
                  options={timeClassOptionList}
                  defaultValue={selectedTimeClass}
                  onChange={(_, data) => setSelectedTimeClass(data.value as TimeClass)}
                  fluid={true}
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <div className={styles.vr2}>
        <Button type={'submit'} disabled={!isUsernameValid} fluid={true} color={'green'}>
          {'Search'}
        </Button>
      </div>

      <Form.Field control={Checkbox} label={{ children: 'Remember Username' }} />
    </form>
  );
};

UserForm.displayName = 'UserForm';
UserForm.defaultProps = {};
