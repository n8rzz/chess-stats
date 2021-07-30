import React from 'react';
import dynamic from 'next/dynamic';
import { Segment, Dimmer, Loader, Card } from 'semantic-ui-react';
import { setDateFromUtcSeconds } from '../../../util/date.utils';
import { IChessStats } from '../../../domain/player/player.types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  isLoading: boolean;
  label: string;
  stats: IChessStats;
}

export const GameTypeStats: React.FC<IProps> = (props) => {
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
    <Card.Group itemsPerRow={2} stackable={true}>
      <Card>
        <Card.Content>
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
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Meta>best</Card.Meta>
          <Card.Description>
            <h3>{props.stats.best.rating}</h3>
          </Card.Description>
        </Card.Content>
        <Card.Content extra={true}>{setDateFromUtcSeconds(props.stats.best.date).toLocaleString()}</Card.Content>
      </Card>
    </Card.Group>
  );
};

GameTypeStats.displayName = 'GameTypeStats';
GameTypeStats.defaultProps = {};
