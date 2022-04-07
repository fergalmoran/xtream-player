export const convertEpochToSpecificTimezone = (
  timeEpoch: number,
  offset: number = 0
) => {
  var d = new Date(timeEpoch * 1000);
  var utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
  var nd = new Date(utc + 3600000 * offset);
  return nd.toLocaleDateString();
};
