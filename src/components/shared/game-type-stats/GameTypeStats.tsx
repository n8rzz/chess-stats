import React from 'react';
import dynamic from 'next/dynamic';
import { Segment, Grid, Header, Statistic, Dimmer, Loader } from 'semantic-ui-react';
import { setDateFromUtcSeconds } from '../../../util/date.utils';
import { IChessStats } from '../../../domain/player/player.types';

// eslint-disable-next-line arrow-body-style
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  label: string;
  isLoading: boolean;
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
    <Segment raised={true} size={'big'}>
      <Grid columns={3} textAlign={'center'} divided={true}>
        <Grid.Row verticalAlign={'middle'}>
          <Grid.Column>
            <Chart
              series={[props.stats.record.win, props.stats.record.loss, props.stats.record.draw]}
              options={{
                dataLabels: {
                  enabled: false,
                },
                title: {
                  align: 'left',
                  text: `${props.label}`,
                },
                labels: ['win', 'loss', 'draw'],
                legend: {
                  formatter: (seriesName, opts) => `${seriesName} - ${opts.w.globals.series[opts.seriesIndex]}`,
                  position: 'right',
                },
              }}
              type={'pie'}
              height={125}
            />
          </Grid.Column>

          <Grid.Column>
            <Header as={'h3'}>{'Last'}</Header>
            <Statistic>
              <Statistic.Value>{props.stats.last.rating}</Statistic.Value>
              <Statistic.Label>{setDateFromUtcSeconds(props.stats.last.date).toLocaleString()}</Statistic.Label>
            </Statistic>
          </Grid.Column>

          <Grid.Column>
            <Header as={'h3'}>{'Best'}</Header>
            <Statistic>
              <Statistic.Value>{props.stats.best.rating}</Statistic.Value>
              <Statistic.Label>{setDateFromUtcSeconds(props.stats.best.date).toLocaleString()}</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

GameTypeStats.displayName = 'GameTypeStats';
GameTypeStats.defaultProps = {};