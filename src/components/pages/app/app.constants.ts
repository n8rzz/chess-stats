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

export const timeframeToPeriod: Record<Timeframe, number> = {
  [Timeframe.Today]: 1,
  [Timeframe.SevenDays]: 7,
  [Timeframe.ThirtyDays]: 30,
  [Timeframe.NinetyDays]: 90,
  [Timeframe.SixMonths]: 180,
  [Timeframe.OneYear]: 360,
};

export const timeframeOptionList = Object.keys(timeframeLabel).map((timeframeKey) => ({
  key: Timeframe[timeframeKey as keyof typeof Timeframe],
  value: Timeframe[timeframeKey as keyof typeof Timeframe],
  text: timeframeLabel[Timeframe[timeframeKey as keyof typeof Timeframe]],
}));
