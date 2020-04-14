import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import nextConnect from "next-connect";

import database from "@middleware/database";

const twentyMinutesFromNow = () => new Date(Date.now() + 1000 * 60 * 20);

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
      expireAt: twentyMinutesFromNow(),
    });

    const emailMessage = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      templateId: process.env.SENDGRID_PASSWORDRESET_TEMPLATEID,
      dynamic_template_data: {
        subject: process.env.SENDGRID_PASSWORDRESET_SUBJECT,
        name: user.name,
        url: `${process.env.WEB_URI}/forgot-password/${token}`,
      },
    };

    await sgMail.send(emailMessage);

    res.json({
      ok: true,
      message:
        "An email has been sent to your inbox with a link to reset your password.",
    });
  } catch (e) {
    res.json({ ok: false, message: e.toString() });
  }
});

export default handler;
