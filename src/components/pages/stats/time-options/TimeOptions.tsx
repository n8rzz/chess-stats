import React from 'react';
import { Grid, GridColumn, Select, Button } from 'semantic-ui-react';
import { TimeClass } from '../../../../domain/game/games.constants';
import { timeClassOptionList, timeframeLabel, Timeframe } from '../StatsPage.constants';

interface IProps {
  activeTimeClass: TimeClass;
  activeTimeframe: Timeframe;
  onChangeActiveTimeClass: (value: TimeClass) => void;
  onClickPeriodButton: (key: Timeframe) => void;
}

export const TimeOptions: React.FC<IProps> = (props) => {
  return (
    <Grid>
      <Grid.Row>
        <GridColumn width={4}>
          <Select
            defaultValue={props.activeTimeClass}
            fluid={true}
            name={'timeClass'}
            onChange={(_, data) => props.onChangeActiveTimeClass(data.value as TimeClass)}
            options={timeClassOptionList}
          />
        </GridColumn>
        <GridColumn width={8}>
          <Button.Group>
            {Object.keys(timeframeLabel).map((key: string) => (
              <Button
                active={props.activeTimeframe === key}
                disabled={props.activeTimeframe === key}
                key={`${key}-btn`}
                onClick={() => props.onClickPeriodButton(key as Timeframe)}
                size={'tiny'}
                toggle={true}
              >
                {timeframeLabel[key as Timeframe]}
              </Button>
            ))}
          </Button.Group>
        </GridColumn>
      </Grid.Row>
    </Grid>
  );
};

TimeOptions.displayName = 'TimeOptions';
TimeOptions.defaultProps = {};
