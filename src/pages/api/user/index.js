import nextConnect from "next-connect";

import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";

import bcrypt from "bcryptjs";

import middleware from "@middleware/middleware";
import { extractUser } from "@helpers/apiHelpers";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => res.json({ user: extractUser(req) }));

// POST /api/user
handler.post(async (req, res) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email); // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same

  if (!isEmail(email)) {
    res.status(400).send("That doesn't seem to be a valid email.");
    return;
  }

  if (!password || !name) {
    res.status(400).send("Missing field(s)");
    return;
  }

  if ((await req.db.collection("user").countDocuments({ email })) > 0) {
    res.status(403).send("That email is already in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await req.db
    .collection("user")
    .insertOne({ email, password: hashedPassword, name })
    .then(({ ops }) => ops[0]);

  req.logIn(user, (err) => {
    if (err) throw err;
    // when we finally log in, return the (filtered) user object
    res.status(201).json({
      user: extractUser(req),
    });
  });
});

// PATCH /api/user
handler.patch(async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("You must be logged in to do this");
    }

    const { name, oldPassword, newPassword } = req.body;
    let setBody = { name };

    if (oldPassword && newPassword) {
      if (!(await bcrypt.compare(oldPassword, req.user.password))) {
        throw new Error("The password you have entered is incorrect.");
      }

      setBody.password = await bcrypt.hash(newPassword, 10);
    }

    await req.db
      .collection("user")
      .updateOne({ _id: req.user._id }, { $set: setBody });

    res.json({
      ok: true,
      user: { name },
      message: "Your changes have been updated successfully.",
    });
  } catch (error) {
    res.json({ ok: false, message: error.toString() });
  }
});

export default handler;
