const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const expired = process.env.JWT_EXPIRED;

const token = (payload) => {
  const createToken = jwt.sign(payload, secret, { expiresIn: expired });
  return createToken;
};

module.exports = token;
