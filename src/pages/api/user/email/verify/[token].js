import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import database from '@middleware/database';

const handler = nextConnect();
handler.use(database);

handler.patch(async (req, res) => {
  try {
    const { value: token } = await req.db.collection('token').findOneAndDelete({
      token: req.query.token,
      type: 'emailVerify',
    });

    if (!token)
      throw {
        status: 400,
        message: 'This link is no longer valid, please try again.',
      };

    await req.db
      .collection('user')
      .updateOne({ _id: token.userId }, { $set: { emailVerified: true } });

    res.status(200).end();
  } catch ({ status, message }) {
    res.status(status || 500).json({ message });
  }
});

export default handler;
