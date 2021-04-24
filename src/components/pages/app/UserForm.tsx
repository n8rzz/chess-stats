/* eslint-disable arrow-body-style */
import * as React from 'react';
import { Button, Select, Input } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';

interface IProps {
  onSubmit: (provider: string, username: string) => void;
}

export const UserForm: React.FC<IProps> = (props) => {
  const [username, setUsername] = React.useState<string>('n8rzz');
  const [provider, setProvider] = React.useState<string>('chess.com');

  const onClickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    props.onSubmit(provider, username);
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
              disabled
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
          </li>
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
