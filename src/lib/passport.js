import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { ObjectId } from 'mongodb';

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser((req, id, done) => {
  req.db
    .collection('user')
    .findOne(ObjectId(id))
    .then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await req.db.collection('user').findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
          if (user.emailVerified) done(null, user);
          else done(null, false, { message: 'Email not verified' });
        } else
          done(null, false, {
            message: "Sorry, that email and password didn't work",
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

export default passport;
