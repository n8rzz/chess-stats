import 'react-calendar-heatmap/dist/styles.css';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import type { GameCollection } from '../../../domain/game/models/Game.collection';

interface IProps {
  collection: GameCollection;
}

export const DailyPlayHeatmap: React.FC<IProps> = (props) => {
  const chartData = React.useMemo(() => {
    const gameCountsByDay = props.collection.countGamesByDate();

    return Object.keys(gameCountsByDay).map((key: string) => ({
      date: new Date(key),
      count: gameCountsByDay[key],
    }));
  }, [props.collection]);

  return (
    <div>
      {chartData.length === 0 && null}
      {chartData.length > 0 && (
        <CalendarHeatmap
          startDate={props.collection.firstGame.endDate}
          endDate={props.collection.lastGame.endDate}
          values={chartData}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }

            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={(value) => {
            const tooltipData = Boolean(value.date)
              ? `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`
              : '';

            return {
              'data-tip': tooltipData,
            };
          }}
          showWeekdayLabels={true}
          transformDayElement={(element, value, index) => React.cloneElement(element, { rx: 100, ry: 100 })}
        />
      )}
    </div>
  );
};

DailyPlayHeatmap.displayName = 'DailyPlayHeatmap';
DailyPlayHeatmap.defaultProps = {};
