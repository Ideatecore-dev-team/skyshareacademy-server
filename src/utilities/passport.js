const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
const db = require("./db");

const secret = process.env.JWT_SECRET;

const options = {
  jwtFromRequest: (req) => {
    if (req.cookies.authorization) {
      return req.cookies.authorization;
    }
    return req.headers.authorization;
  },

  secretOrKey: secret,
};

const extractToken = async (payload, done) => {
  try {
    const { id } = payload;
    const user = await db("admin")
      .select(["id", "email", "name", "role"])
      .where({ id });

    return done(null, user[0]);
  } catch (error) {
    return done(error, false);
  }
};

passport.use(new Strategy(options, extractToken));

module.exports = passport;
