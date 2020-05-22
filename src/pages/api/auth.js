import nextConnect from 'next-connect';

import middleware from '@middleware/middleware';
import passport from '@lib/passport';
import { extractUser } from '@helpers/apiHelpers';

const handler = nextConnect();

handler.use(middleware);

handler.post((req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500);
    if (user) {
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(401).json(loginErr.message);
        }
        return res.status(200).json({ user: extractUser(user) });
      });
    } else return res.status(401).json(info);
  })(req, res);
});

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
