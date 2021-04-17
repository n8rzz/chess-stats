import * as React from 'react';
import styles from '../../../styles/App.module.css';

interface IProps {
  onSubmit: (provider: string, username: string, periodLength: number) => void;
}

export const UserForm: React.FC<IProps> = (props) => {
  const [username, setUsername] = React.useState<string>('n8rzz');
  const [provider, setProvider] = React.useState<string>('chess.com');
  const [period, setPeriod] = React.useState<number>(1);

  const onClickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    props.onSubmit(provider, username, period);
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
            <select
              defaultValue={period}
              name={'period'}
              onChange={(event) =>
                setPeriod(parseInt(event.currentTarget.value, 10))
              }
            >
              <option value={30}>{'30 Days'}</option>
              <option value={60}>{'60 Days'}</option>
              <option value={90}>{'90 Days'}</option>
              <option value={180}>{'180 Days'}</option>
              <option value={360}>{'1 Year'}</option>
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
