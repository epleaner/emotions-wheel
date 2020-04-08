require("dotenv").config();

const express = require("express");
const session = require("express-session");
const http = require("http");
const next = require("next");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const uid = require("uid-safe");

const authRoutes = require("./auth-routes");
const api = require("./api/api");

const dev = process.env.NODE_ENV !== "production";

const app = next({
  dev,
  dir: "./",
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const sessionConfig = {
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000, // 24 hours in milliseconds
    },
    resave: false,
    saveUninitialized: true,
    // secure: true
  };

  server.use(session(sessionConfig));

  const auth0Strategy = new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH0_CALLBACK_URL,
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  );

  passport.use(auth0Strategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  server.use(passport.initialize());
  server.use(passport.session());
  server.use(authRoutes);

  server.use(api);

  const restrictAccess = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect("/login");
    next();
  };

  server.use("/profile", restrictAccess);
  server.use("/share-thought", restrictAccess);

  // handling everything else with Next.js
  server.get("*", handle);

  http.createServer(server).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
