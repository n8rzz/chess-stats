import React from 'react';
import clsx from 'clsx';
import { Segment, Dimmer, Loader, Grid, Header, Statistic } from 'semantic-ui-react';
import styles from '../../../styles/App.module.css';
import { IHighLow } from '../../../domain/player/player.types';
import { setDateFromUtcSeconds } from '../../../util/date.utils';

interface IProps {
  isLoading: boolean;
  label: string;
  highLow: IHighLow;
}

export const HighLowScore: React.FC<IProps> = (props) => {
  if (props.isLoading) {
    return (
      <Segment>
        <Dimmer active={true} inverted={true}>
          <Loader content={'Loading'} />
        </Dimmer>
      </Segment>
    );
  }

  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <Header as={'h2'}>{props.label}</Header>

      <Segment raised={true} size={'big'}>
        <Grid columns={3} textAlign={'center'} divided={true}>
          <Grid.Row verticalAlign={'middle'}>
            <Grid.Column>
              <Statistic>
                <Header as={'h3'}>{'Lowest'}</Header>

                <Statistic.Value>{props.highLow.lowest.rating}</Statistic.Value>
                <Statistic.Label>{setDateFromUtcSeconds(props.highLow.lowest.date).toLocaleString()}</Statistic.Label>
              </Statistic>
            </Grid.Column>

            <Grid.Column>
              <Statistic>
                <Header as={'h3'}>{'Highest'}</Header>

                <Statistic.Value>{props.highLow.highest.rating}</Statistic.Value>
                <Statistic.Label>{setDateFromUtcSeconds(props.highLow.highest.date).toLocaleString()}</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

HighLowScore.displayName = 'HighLowScore';
HighLowScore.defaultProps = {};
