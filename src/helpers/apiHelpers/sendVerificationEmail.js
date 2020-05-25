import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { hoursFromNow } from '@helpers/apiHelpers';
import normalizeEmail from 'validator/lib/normalizeEmail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res, { email }) => {
  try {
    const user = await req.db
      .collection('user')
      .findOne({ email: normalizeEmail(email) });

    if (!user)
      throw {
        status: 400,
        message: 'Could not find a user with that email',
      };
    if (user.emailVerified)
      throw {
        status: 400,
        message: 'This email is already verified',
      };

    const token = crypto.randomBytes(32).toString('hex');

    await req.db.collection('token').insertOne({
      token,
      userId: user._id,
      type: 'emailVerify',
      expireAt: hoursFromNow(24),
    });

    const msg = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: '[feeels] Please verify your email',
      html: `Hey ${user.name}, please verify your email <a href=${process.env.APP_ROOT_URL}/verify-email/${token}>here</a>.`,
    };

    await sgMail.send(msg);

    return {
      ok: true,
      status: 200,
      message: 'A verification email has been sent to your inbox.',
    };
  } catch ({ status, message }) {
    return { ok: false, status, message };
  }
};
