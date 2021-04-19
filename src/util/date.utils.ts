export const setDateFromUtcSeconds = (dateInUtcSeconds: number): Date => {
  const value = new Date(0);

  value.setUTCSeconds(dateInUtcSeconds);

  return value;
};
