function minutesFromNow(minutes) {
  return new Date(Date.now() + 1000 * 60 * minutes);
}

function hoursFromNow(hours) {
  return minutesFromNow(hours * 60);
}

export { minutesFromNow, hoursFromNow };
