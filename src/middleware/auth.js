const passport = require("../utilities/passport");
const ResponseError = require("../error/ResponseError");

const authenticate = passport.authenticate("jwt", { session: false });

const isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    throw new ResponseError(
      401,
      "Unauthorized: Requires superadmin privileges"
    );
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    throw new ResponseError(
      401,
      "Unauthorized: Requires admin privileges"
    );
  }
};

module.exports = { authenticate, isSuperAdmin, isAdmin };
