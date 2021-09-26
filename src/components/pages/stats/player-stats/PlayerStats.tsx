import * as React from 'react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Card, Dimmer, Loader, Segment } from 'semantic-ui-react';
import styles from '../../../../styles/App.module.css';
import { IChessStats, IHighLow } from '../../../../domain/player/player.types';
import { setDateFromUtcSeconds } from '../../../../util/date.utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  highLow: IHighLow;
  isLoading: boolean;
  label: string;
  stats: IChessStats;
}

export const PlayerStats: React.FC<IProps> = (props) => {
  if (props.isLoading) {
    return (
      <Segment placeholder={true}>
        <Dimmer active={true} inverted={true}>
          <Loader content={'Loading...'} indeterminate={true} />
        </Dimmer>
      </Segment>
    );
  }

  if (props?.stats == null) {
    return <div className={styles.container}>{'No Player'}</div>;
  }

  return (
    <div className={clsx(styles.container, styles.vr3)}>
      <Card.Group itemsPerRow={2} stackable={true}>
        <Card>
          <Card.Content>
            <Card.Header as={'h3'}>Rapid</Card.Header>
            <Card.Description>
              <Chart
                series={[props.stats.record.win, props.stats.record.loss, props.stats.record.draw]}
                options={{
                  dataLabels: {
                    enabled: false,
                  },
                  labels: ['win', 'loss', 'draw'],
                  legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                  },
                }}
                type={'donut'}
                height={225}
              />
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>{props.stats.best.rating}</Card.Header>
            <Card.Meta>best</Card.Meta>
          </Card.Content>
          <Card.Content extra={true}>{setDateFromUtcSeconds(props.stats.best.date).toLocaleString()}</Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>{props.highLow.lowest.rating}</Card.Header>
            <Card.Meta>tactics</Card.Meta>
            <Card.Description>
              <b>lowest</b>
            </Card.Description>
          </Card.Content>
          <Card.Content extra={true}>{setDateFromUtcSeconds(props.highLow.lowest.date).toLocaleString()}</Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>{props.highLow.highest.rating}</Card.Header>
            <Card.Meta>tactics</Card.Meta>
            <Card.Description>
              <b>highest</b>
            </Card.Description>
          </Card.Content>
          <Card.Content extra={true}>{setDateFromUtcSeconds(props.highLow.highest.date).toLocaleString()}</Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

PlayerStats.displayName = 'PlayerStats';
PlayerStats.defaultProps = {};
