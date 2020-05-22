function extractUser(req) {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const { name, email, emailVerified, emotions } = req.user;
  return {
    name,
    email,
    emailVerified,
    emotions,
  };
}

function minutesFromNow(minutes) {
  return new Date(Date.now() + 1000 * 60 * minutes);
}

function hoursFromNow(hours) {
  return minutesFromNow(hours * 60);
}

export { extractUser, minutesFromNow, hoursFromNow };
