import nextConnect from 'next-connect';
import middleware from '@middleware/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    if (!req.user)
      throw { status: 401, message: 'You must be logged in to do this' };

    await req.db
      .collection('user')
      .updateOne(
        { _id: req.user._id },
        { $push: { emotions: { date: new Date().toJSON(), ...req.body } } }
      );

    res.status(201).json({
      message: 'Your entry has been saved successfully.',
    });
  } catch ({ status, message }) {
    res.status(status || 500).json({ message });
  }
});

export default handler;
