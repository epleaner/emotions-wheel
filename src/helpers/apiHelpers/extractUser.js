export default function extractUser(user) {
  if (!user) return null;

  // take only needed user fields to avoid sensitive ones (such as password)
  const { name, email, emailVerified, entries } = user;
  return {
    name,
    email,
    emailVerified,
    entries,
  };
}
