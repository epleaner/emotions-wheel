function extractUser(req) {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const { name, email, bio, profilePicture, emailVerified } = req.user;
  return {
    name,
    email,
    bio,
    profilePicture,
    emailVerified,
  };
}

export { extractUser };
