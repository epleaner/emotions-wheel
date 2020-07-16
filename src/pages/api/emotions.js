import nextConnect from 'next-connect';
import middleware from '@middleware/middleware';
import { ObjectId } from 'mongodb';

import { createEntry } from '@helpers/apiHelpers/entryHelper';

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    if (!req.user && !req.body.user_id)
      throw { status: 401, message: 'You must have an account to do this' };

    const _id = req.user ? req.user._id : ObjectId(req.body.user_id);

    const { emotions, note } = req.body;

    const entry = createEntry(emotions, note);

    const { modifiedCount } = await req.db.collection('user').updateOne(
      { _id },
      {
        $push: {
          entries: entry,
        },
      }
    );

    if (modifiedCount !== 1)
      throw { status: 400, message: 'Entry unable to be saved' };

    return res.status(201).json(entry);
  } catch ({ status, message }) {
    return res.status(status || 500).json({ message });
  }
});

handler.patch(async (req, res) => {
  try {
    if (!req.user && !req.body.user_id)
      throw { status: 401, message: 'You must have an account to do this' };

    const _id = req.user ? req.user._id : ObjectId(req.body.user_id);

    const { _id: entryId, newNote } = req.body;

    const { modifiedCount } = await req.db.collection('user').updateOne(
      { _id, 'entries._id': ObjectId(entryId) },
      {
        $set: { 'entries.$.note': newNote },
      }
    );

    if (modifiedCount !== 1)
      throw { status: 400, message: 'Entry unable to be edited' };

    return res.status(201).json({
      message: 'Your entry has been edited successfully',
    });
  } catch ({ status, message }) {
    return res.status(status || 500).json({ message });
  }
});

handler.delete(async (req, res) => {
  try {
    if (!req.user && !req.body.user_id)
      throw { status: 401, message: 'You must have an account to do this' };

    const _id = req.user ? req.user._id : ObjectId(req.body.user_id);

    const { _id: entryId } = req.body;

    const { modifiedCount } = await req.db.collection('user').updateOne(
      { _id },
      {
        $pull: { entries: { _id: ObjectId(entryId) } },
      }
    );

    if (modifiedCount !== 1)
      throw { status: 400, message: 'Entry unable to be deleted' };

    return res.status(200).json({
      message: 'Your entry has been deleted successfully',
    });
  } catch ({ status, message }) {
    return res.status(status || 500).json({ message });
  }
});

export default handler;
