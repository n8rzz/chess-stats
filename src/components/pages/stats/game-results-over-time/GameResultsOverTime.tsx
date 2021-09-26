import React from 'react';
import styles from '../../../../styles/App.module.css';
import { ICountByDate, IWinLossDrawByPeriod } from '../../../../domain/game/games.types';
import { DetailedGameResultsChart } from '../../../ui/detailed-game-results-chart/DetailedGameResultsChart';
import { WinLossMultiLineChart } from '../../../ui/win-loss-multi-line-chart/WinLossMultiLineChart';
import { Menu, Dropdown, DropdownProps } from 'semantic-ui-react';

export enum GameResultsOverTimeView {
  DetailedResults = 'detailed-results',
  WinsAndLosses = 'wins-and-losses',
}

export const gameResultsOverTimeViewTitleMap: Record<GameResultsOverTimeView, string> = {
  [GameResultsOverTimeView.DetailedResults]: 'Detailed Results',
  [GameResultsOverTimeView.WinsAndLosses]: 'Wins and Losses',
};

interface IProps {
  countResultsByDate: ICountByDate;
  countWinLossByPeriod: IWinLossDrawByPeriod;
}

export const GameResultsOverTime: React.FC<IProps> = (props) => {
  const [currentGameResultView, setCurrentGameResultView] = React.useState<GameResultsOverTimeView>(
    GameResultsOverTimeView.WinsAndLosses,
  );

  const onChangeGameResultView = (nextValue: GameResultsOverTimeView) => {
    setCurrentGameResultView(nextValue);
  };

  return (
    <React.Fragment>
      <div className={styles.vr1}>
        <ul className={styles.stereo}>
          <li>
            <h3>{gameResultsOverTimeViewTitleMap[currentGameResultView]}</h3>
          </li>
          <li>
            <Menu compact={true}>
              <Dropdown
                compact={true}
                simple={true}
                item={true}
                defaultValue={currentGameResultView}
                onChange={(_, data: DropdownProps) => onChangeGameResultView(data?.value as GameResultsOverTimeView)}
                options={[
                  {
                    key: 'wins-and-losses',
                    text: 'Wins and Losses',
                    value: GameResultsOverTimeView.WinsAndLosses,
                  },
                  {
                    key: 'detailedResults',
                    text: 'Detailed Results',
                    value: GameResultsOverTimeView.DetailedResults,
                  },
                ]}
              />
            </Menu>
          </li>
        </ul>
      </div>

      {currentGameResultView === GameResultsOverTimeView.DetailedResults && (
        <DetailedGameResultsChart countByDate={props.countResultsByDate} />
      )}
      {currentGameResultView === GameResultsOverTimeView.WinsAndLosses && (
        <WinLossMultiLineChart winLossByPeriod={props.countWinLossByPeriod} />
      )}
    </React.Fragment>
  );
};

GameResultsOverTime.displayName = 'GameResultsOverTime';
GameResultsOverTime.defaultProps = {};
