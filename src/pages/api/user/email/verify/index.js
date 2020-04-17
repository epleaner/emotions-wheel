import nextConnect from "next-connect";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";

import middleware from "@middleware/middleware";
import { hoursFromNow } from "@helpers/apiHelpers";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  try {
    if (!req.user) throw new Error("You must be logged in to do this.");
    const token = crypto.randomBytes(32).toString("hex");

    await req.db.collection("token").insertOne({
      token,
      userId: req.user._id,
      type: "emailVerify",
      expireAt: hoursFromNow(24),
    });

    const msg = {
      to: req.user.email,
      from: process.env.EMAIL_FROM,
      subject: "[feeels] Please verify your email",
      html: `Hey ${req.user.name}, please verify your email <a href=${process.env.NOW_URL}/verify-email/${token}>here</a>.`,
    };

    await sgMail.send(msg);

    res.json({
      ok: true,
      message: "A verification email has been sent to your inbox.",
    });
  } catch (e) {
    res.json({ ok: false, message: e.message });
  }
});

export default handler;
