export enum Timeframe {
  NinetyDays = 'NinetyDays',
  OneYear = 'OneYear',
  SevenDays = 'SevenDays',
  SixMonths = 'SixMonths',
  ThirtyDays = 'ThirtyDays',
  Today = 'Today',
}

export const timeframeLabel: Record<Timeframe, string> = {
  [Timeframe.Today]: 'Today',
  [Timeframe.SevenDays]: '7 Days',
  [Timeframe.ThirtyDays]: '30 Days',
  [Timeframe.NinetyDays]: '90 Days',
  [Timeframe.SixMonths]: '6 Months',
  [Timeframe.OneYear]: '1 Year',
};

export const timeframeOptionList = Object.keys(timeframeLabel).map((timeframeKey) => ({
  key: Timeframe[timeframeKey as keyof typeof Timeframe],
  value: Timeframe[timeframeKey as keyof typeof Timeframe],
  text: timeframeLabel[Timeframe[timeframeKey as keyof typeof Timeframe]],
}));
