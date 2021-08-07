// Example
// weeksOfMonth(2019, 9) // October
// Result: 5
export const weeksOfMonth = (year: number, monthIndex: number): number => {
  const d = new Date(year, monthIndex + 1, 0);
  const adjustedDate = d.getDate() + d.getDay();
  const weekCount = Math.ceil(adjustedDate / 7);

  return weekCount > 5 ? 5 : weekCount;
};
