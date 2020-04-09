import nextConnect from "next-connect";
import passport from "@lib/passport";
import database from "@middleware/database";
import session from "@middleware/session";

const middleware = nextConnect();

middleware
  .use(database)
  .use(session)
  .use(passport.initialize()) // passport middleware handles authenthentication, which populates req.user
  .use(passport.session());

export default middleware;
