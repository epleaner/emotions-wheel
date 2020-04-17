import nextConnect from "next-connect";
import bcrypt from "bcryptjs";
import database from "@middleware/database";

const handler = nextConnect();
handler.use(database);

handler.get(async (req, res) => {
  const token = await req.db
    .collection("token")
    .findOne({ token: req.query.token, type: "passwordReset" });

  const valid = token ? true : false;
  res.json({ valid });
});

handler.patch(async (req, res) => {
  try {
    if (!req.body.password) throw new Error("A password is required.");

    const { value: token } = await req.db.collection("token").findOneAndDelete({
      token: req.query.token,
      type: "passwordReset",
    });

    if (!token)
      throw new Error("This link is no longer valid, please try again.");

    const password = await bcrypt.hash(req.body.password, 10);

    await req.db
      .collection("user")
      .updateOne({ _id: token.userId }, { $set: { password } });

    res.json({ ok: true, message: "Your password has been updated!" });
  } catch (e) {
    res.json({ ok: false, message: e.toString() });
  }
});

export default handler;
