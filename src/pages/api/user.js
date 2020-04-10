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

  if ((await req.db.collection("users").countDocuments({ email })) > 0) {
    res.status(403).send("That email is already in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await req.db
    .collection("users")
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
  if (!req.user) {
    req.status(401).end();
    return;
  }

  const { name } = req.body;

  await req.db.collection("users").updateOne(
    { _id: req.user._id },
    {
      $set: {
        name: name,
      },
    }
  );
  res.json({ user: { name } });
});

export default handler;
