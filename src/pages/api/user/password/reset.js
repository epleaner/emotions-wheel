import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import nextConnect from "next-connect";

import database from "@middleware/database";
import { minutesFromNow } from "@helpers/apiHelpers";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  try {
    const user = await req.db
      .collection("user")
      .findOne({ email: req.body.email });

    if (!user)
      throw new Error("Couldn't find an account associated with this email.");

    const token = crypto.randomBytes(32).toString("hex");

    await req.db.collection("token").insertOne({
      token,
      userId: user._id,
      type: "passwordReset",
      expireAt: minutesFromNow(20),
    });

    const msg = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: "[feeels] Resetting your password",
      html: `Hey ${user.name}, <a href=${process.env.NOW_URL}/forgot-password/${token}>here</a> is a link to reset your password.`,
    };

    await sgMail.send(msg);

    res.json({
      ok: true,
      message:
        "An email has been sent to your inbox with a link to reset your password.",
    });
  } catch (e) {
    res.json({ ok: false, message: e.message });
  }
});

export default handler;
