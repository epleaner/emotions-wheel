import nextConnect from 'next-connect';

import middleware from '@middleware/middleware';
import sendVerificationEmail from '@helpers/apiHelpers/sendVerificationEmail';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const emailRes = await sendVerificationEmail(req, res, {
      email: req.body.email,
    });

    if (!emailRes.ok) throw emailRes;

    return res.status(200).json({ message: emailRes.message });
  } catch ({ status, message }) {
    return res.status(status || 500).json({ message });
  }
});

export default handler;
