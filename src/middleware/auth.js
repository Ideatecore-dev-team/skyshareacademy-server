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
  if (req.user && (req.user.role === "admin" || req.user.role === "superadmin")) {
    next();
  } else {
    throw new ResponseError(
      401,
      "Unauthorized: Requires admin privileges"
    );
  }
};

const isStudent = (req, res, next) => {
  if (req.user && (req.user.role === "mentor" || req.user.role === "talent")) {
    next();
  } else {
    throw new ResponseError(
      401,
      "Unauthorized: Requires student privileges"
    );
  }
};

const isMentor = (req, res, next) => {
  if (req.user && req.user.role === "mentor") {
    next();
  } else {
    throw new ResponseError(
      401,
      "Unauthorized: Requires mentor privileges"
    );
  }
};

const isTalent = (req, res, next) => {
  if (req.user && req.user.role === "talent") {
    next();
  } else {
    throw new ResponseError(
      401,
      "Unauthorized: Requires talent privileges"
    );
  }
};

module.exports = {
  authenticate,
  isSuperAdmin,
  isAdmin,
  isStudent,
  isMentor,
  isTalent,
};
