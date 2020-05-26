import nextConnect from 'next-connect';
import middleware from '@middleware/middleware';
import { ObjectId } from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    if (!req.user && !req.body.user_id)
      throw { status: 401, message: 'You must have an account to do this' };

    const _id = req.user ? req.user._id : ObjectId(req.body.user_id);

    const { color, data } = req.body;

    const { modifiedCount } = await req.db
      .collection('user')
      .updateOne(
        { _id },
        { $push: { emotions: { date: new Date().toJSON(), color, data } } }
      );

    if (modifiedCount !== 1)
      throw { status: 400, message: 'Entry unable to be saved' };

    return res.status(201).json({
      message: 'Your entry has been saved successfully',
    });
  } catch ({ status, message }) {
    return res.status(status || 500).json({ message });
  }
});

export default handler;
