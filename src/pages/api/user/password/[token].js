import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import database from '@middleware/database';

const handler = nextConnect();
handler.use(database);

handler.get(async (req, res) => {
  try {
    const token = await req.db
      .collection('token')
      .findOne({ token: req.query.token, type: 'passwordReset' });

    const valid = token ? true : false;
    return res.status(200).json({ valid });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong, please try again' });
  }
});

handler.patch(async (req, res) => {
  try {
    if (!req.body.password)
      throw { status: 400, message: 'A password is required.' };

    const { value: token } = await req.db.collection('token').findOneAndDelete({
      token: req.query.token,
      type: 'passwordReset',
    });

    if (!token)
      throw {
        status: 400,
        message: 'This link is no longer valid, please try again.',
      };

    const password = await bcrypt.hash(req.body.password, 10);

    await req.db
      .collection('user')
      .updateOne({ _id: token.userId }, { $set: { password } });

    res.status(201).json({ message: 'Your password has been updated!' });
  } catch ({ status, message }) {
    res.status(status || 500).json({ message });
  }
});

export default handler;
