import * as React from 'react';
import { Button, Select, Input } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { Timeframe, timeframeOptionList } from '../../pages/app/app.constants';

interface IProps {
  onSubmit: (provider: string, username: string, timeframe: Timeframe) => void;
}

export const UserForm: React.FC<IProps> = (props) => {
  const [username, setUsername] = React.useState<string>('n8rzz');
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<Timeframe>(Timeframe.SevenDays);
  const [provider] = React.useState<string>('chess.com');

  const onClickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    props.onSubmit(provider, username, selectedTimeframe);
  };

  return (
    <section className={styles.container}>
      <form autoComplete={'off'} onSubmit={onClickSubmit}>
        <ul className={styles.hlist}>
          <li>
            <Input
              type={'text'}
              placeholder={'username'}
              name={'username'}
              defaultValue={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </li>
          <li>
            <Select
              name={'timeframe'}
              options={timeframeOptionList}
              defaultValue={selectedTimeframe}
              onChange={(_, data) => setSelectedTimeframe(data.value as Timeframe)}
            />
          </li>
          {/* <li>
            <Select
              disabled={true}
              name={'provider'}
              options={[
                {
                  key: 1,
                  text: 'Chess.com',
                  value: 'chess.com',
                },
              ]}
              defaultValue={'chess.com'}
            />
          </li> */}
          <li>
            <Button type={'submit'}>{'Submit'}</Button>
          </li>
        </ul>
      </form>
    </section>
  );
};

UserForm.displayName = 'UserForm';
UserForm.defaultProps = {};