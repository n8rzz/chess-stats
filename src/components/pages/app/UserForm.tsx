/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-curly-newline */
import * as React from 'react';
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
            <input
              type={'text'}
              placeholder={'username'}
              name={'username'}
              defaultValue={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </li>
          <li>
            <select
              name={'provider'}
              onChange={(event) => setProvider(event.currentTarget.value)}
            >
              <option value={'chess.com'}>{'chess.com'}</option>
            </select>
          </li>
          <li>
            <input type={'submit'} value={'Submit'} />
          </li>
        </ul>
      </form>
    </section>
  );
};

UserForm.displayName = 'UserForm';
UserForm.defaultProps = {};
