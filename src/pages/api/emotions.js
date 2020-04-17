import nextConnect from "next-connect";
import middleware from "@middleware/middleware";

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("You must be logged in to do this");
    }

    await req.db
      .collection("user")
      .updateOne(
        { _id: req.user._id },
        { $push: { emotions: { date: new Date().toJSON(), ...req.body } } }
      );

    res.json({
      ok: true,
      message: "Your entry has been saved successfully.",
    });
  } catch (error) {
    res.json({ ok: false, message: error.toString() });
  }
});

export default handler;
