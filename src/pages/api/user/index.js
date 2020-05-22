import nextConnect from 'next-connect';

import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

import bcrypt from 'bcryptjs';

import middleware from '@middleware/middleware';
import { extractUser } from '@helpers/apiHelpers';
import sendVerificationEmail from '@helpers/apiHelpers/sendVerificationEmail';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => res.json({ user: extractUser(req) }));

// POST /api/user
handler.post(async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same

    if (!isEmail(email))
      throw {
        status: 400,
        message: "This doesn't seem to be a valid email",
      };

    if (!password || !name)
      throw {
        status: 400,
        message: 'Missing field(s)',
      };

    if ((await req.db.collection('user').countDocuments({ email })) > 0)
      throw {
        status: 400,
        message: 'This email is already in use',
      };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await req.db
      .collection('user')
      .insertOne({
        email,
        password: hashedPassword,
        name,
        emailVerified: false,
      })
      .then(({ ops }) => ops[0]);

    return sendVerificationEmail(req, res, { email: user.email });
  } catch ({ status, message }) {
    return res.status(status || 500).json({ message });
  }
});

// PATCH /api/user
handler.patch(async (req, res) => {
  try {
    if (!req.user)
      throw { status: 401, message: 'You must be logged in to do this' };

    const {
      name,
      email,
      passwords: { oldPassword, newPassword },
    } = req.body;

    let setBody = { name, email };

    if ((await req.db.collection('user').countDocuments({ email })) > 0)
      throw {
        status: 400,
        message: 'This email is already in use',
      };

    if (oldPassword && newPassword) {
      if (!(await bcrypt.compare(oldPassword, req.user.password))) {
        throw {
          status: 400,
          message: 'The password you have entered is incorrect.',
        };
      }

      setBody.password = await bcrypt.hash(newPassword, 10);
    }

    await req.db
      .collection('user')
      .updateOne({ _id: req.user._id }, { $set: setBody });

    res.status(201).json({
      user: { name, email },
      message: 'Your changes have been updated successfully.',
    });
  } catch ({ status, message }) {
    res.status(status || 500).json({ message });
  }
});

handler.delete(async (req, res) => {
  try {
    if (!req.user)
      throw { status: 401, message: 'You must be logged in to do this' };

    await req.db.collection('user').deleteOne({ _id: req.user._id });

    req.logOut();

    res.status(201).json({
      user: null,
      message: 'Your account has been deleted.',
    });
  } catch ({ status, message }) {
    res.status(status || 500).json({ message });
  }
});

export default handler;
