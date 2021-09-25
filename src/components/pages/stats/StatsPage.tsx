import React from 'react';
import { Dimmer, Loader, Segment, Image, Button, Select, Grid, GridColumn } from 'semantic-ui-react';
import clsx from 'clsx';
import styles from '../../../styles/App.module.css';
import { getArchives, getHistorcialGamesFromArchiveList } from '../../../domain/game/games.service';
import { GameCollection } from '../../../domain/game/models/Game.collection';
import { getPlayerStats } from '../../../domain/player/player.service';
import { IPlayerStats } from '../../../domain/player/player.types';
import { TimePeriodSection } from './time-period-section/TimePeriodSection';
import { PlayerStats } from './player-stats/PlayerStats';
import { timeClassOptionList, Timeframe, timeframeLabel, timeframeToPeriod } from './StatsPage.constants';
import { TimeClass } from '../../../domain/game/games.constants';
import { appInsights, reactPlugin } from '../../context/AppInsightsContextProvider';
import { AppHeader } from '../shared/app-header/AppHeader';

interface IProps {}

export const StatsPage: React.FC<IProps> = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [playerStatsModel, setPlayerStatsModel] = React.useState<IPlayerStats>(undefined as any);
  const [activeTimeClass, setActiveTimeClass] = React.useState<TimeClass>(TimeClass.Rapid);
  const [activeTimeframe, setActiveTimeframe] = React.useState<Timeframe>(Timeframe.SevenDays);
  const [gameCollection, setGameCollection] = React.useState<GameCollection>(new GameCollection('', [], 0));

  const collectionForTimeframeAndTimeClass = React.useMemo(
    () => gameCollection.createCollectionForPeriodAndTimeClass(timeframeToPeriod[activeTimeframe], activeTimeClass),
    [gameCollection, activeTimeClass, activeTimeframe],
  );

  const onClickPeriodButton = React.useCallback(
    (nextTimeframe: Timeframe) => {
      setIsLoading(true);
      reactPlugin?.trackEvent({ name: 'ChangeTimePeriod' }, { timeframe: nextTimeframe });
      setActiveTimeframe(nextTimeframe);
      setIsLoading(false);
    },
    [isLoading, activeTimeframe],
  );

  const onSubmit = async (
    provider: string,
    username: string,
    selectedTimeframe: Timeframe,
    selectedTimeClass: TimeClass,
  ) => {
    setIsLoading(true);

    try {
      appInsights?.setAuthenticatedUserContext(username, provider, true);
      appInsights?.startTrackEvent('DataLoad');

      const playerStats = await getPlayerStats(username);
      const gameArchiveList = await getArchives(username);
      const collection = await getHistorcialGamesFromArchiveList(gameArchiveList, username);

      appInsights?.stopTrackEvent(
        'DataLoad',
        {
          timeClass: selectedTimeClass,
          timeframe: selectedTimeframe,
        },
        {
          monthCount: gameArchiveList.length,
        },
      );
      reactPlugin?.trackEvent(
        {
          name: 'FirstDataLoad',
        },
        {
          timeClass: selectedTimeClass,
          timeframe: selectedTimeframe,
        },
      );

      setActiveTimeClass(selectedTimeClass);
      setActiveTimeframe(selectedTimeframe);
      setPlayerStatsModel(playerStats);
      setGameCollection(collection);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  return (
    <div>
      <AppHeader onClickSearch={onSubmit} />

      {isLoading && (
        <Segment style={{ border: 0, height: '250px', overflow: 'hidden' }}>
          <Dimmer active={true} inverted={true}>
            <Loader size="large">{'Loading game data and crunching numbers...'}</Loader>
          </Dimmer>

          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      )}
      {gameCollection.length > 0 && (
        <React.Fragment>
          <div className={clsx(styles.container, styles.vr3)}>
            <div className={styles.vr2}>
              <Grid>
                <Grid.Row>
                  <GridColumn width={4}>
                    <Select
                      name={'timeClass'}
                      options={timeClassOptionList}
                      defaultValue={activeTimeClass}
                      onChange={(_, data) => setActiveTimeClass(data.value as TimeClass)}
                      fluid={true}
                    />
                  </GridColumn>
                  <GridColumn width={8}>
                    <Button.Group>
                      {Object.keys(timeframeLabel).map((key: string) => (
                        <Button
                          active={activeTimeframe === key}
                          disabled={activeTimeframe === key}
                          toggle={true}
                          size={'tiny'}
                          key={`${key}-btn`}
                          onClick={() => onClickPeriodButton(key as Timeframe)}
                        >
                          {timeframeLabel[key as Timeframe]}
                        </Button>
                      ))}
                    </Button.Group>
                  </GridColumn>
                </Grid.Row>
              </Grid>
            </div>

            <TimePeriodSection
              gameCollection={collectionForTimeframeAndTimeClass}
              isLoading={isLoading}
              timeClass={activeTimeClass}
              timeframe={activeTimeframe}
            />
          </div>

          <PlayerStats
            isLoading={isLoading}
            label={'Rapid'}
            highLow={playerStatsModel.tactics}
            stats={playerStatsModel?.chess_rapid}
          />
        </React.Fragment>
      )}
    </div>
  );
};

StatsPage.displayName = 'StatsPage';
StatsPage.defaultProps = {};