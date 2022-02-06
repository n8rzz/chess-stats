import React, { useEffect } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import styles from '../../../styles/App.module.css';
import { TimePeriodSection } from './time-period-section/TimePeriodSection';
import { AppHeader } from '../shared/app-header/AppHeader';
import { PageLoader } from '../shared/page-loader/PageLoader';
import { PlayerStats } from './player-stats/PlayerStats';
import { Timeframe } from './StatsPage.constants';
import { TimeOptions } from './time-options/TimeOptions';
import { StatsPageStore } from './StatsPage.store';

interface IProps {
  localStore: StatsPageStore;
}

export const StatsPage: React.FC<IProps> = observer((props) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    props.localStore.init();
  }, [router.query, props.localStore]);

  const onClickPeriodButton = React.useCallback(
    (nextTimeframe: Timeframe) => {
      props.localStore.setActiveTimeframe(nextTimeframe);
    },
    [props.localStore.isStoreReady, props.localStore.activeTimeframe],
  );

  return (
    <React.Fragment>
      <AppHeader isLoading={!props.localStore.isStoreReady} username={props.localStore.username} />

      {!props.localStore.isStoreReady && <PageLoader isActive={!props.localStore.isStoreReady} />}
      {props.localStore.isStoreReady && (
        <React.Fragment>
          <div className={clsx(styles.container, styles.vr3)}>
            <div className={styles.vr2}>
              <TimeOptions
                activeTimeClass={props.localStore.activeTimeclass}
                activeTimeframe={props.localStore.activeTimeframe}
                onChangeActiveTimeClass={props.localStore.setActiveTimeclass}
                onClickPeriodButton={onClickPeriodButton}
              />
            </div>

            <TimePeriodSection
              gameCollection={props.localStore.collectionForTimeframeAndTimeClass}
              isLoading={!props.localStore.isStoreReady}
              timeClass={props.localStore.activeTimeclass}
              timeframe={props.localStore.activeTimeframe}
            />
          </div>

          {props.localStore.isStoreReady && (
            <PlayerStats
              highLow={props.localStore.playerStatsModel.data?.tactics as any}
              isLoading={!props.localStore.isStoreReady}
              label={'Rapid'}
              stats={props.localStore.playerStatsModel.data?.chess_rapid as any}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
});

StatsPage.displayName = 'StatsPage';
StatsPage.defaultProps = {};
