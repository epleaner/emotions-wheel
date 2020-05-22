import nextConnect from 'next-connect';

import middleware from '@middleware/middleware';
import sendVerificationEmail from '@helpers/apiHelpers/sendVerificationEmail';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) =>
  sendVerificationEmail(req, res, { email: req.body.email })
);

export default handler;
