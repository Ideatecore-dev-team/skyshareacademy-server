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
    const { id, role } = payload;
    if (role === "mentor" || role === "talent" || payload.type === "student") {
      const student = await db("student_accounts")
        .select([
          "id",
          "email",
          "phone",
          "name",
          "role",
          "region",
          "age",
          "occupation",
          "is_verified",
          "is_active",
          "profile_picture",
        ])
        .where({ id });

      if (student.length > 0) {
        return done(null, student[0]);
      }
    }

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
