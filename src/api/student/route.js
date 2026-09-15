const express = require("express");
const auth = require("../../middleware/auth");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/student";

// Public Auth Endpoints
router.post(`${endpoint}/send-otp`, controller.sendOtp);
router.post(`${endpoint}/verify-otp`, controller.verifyOtp);
router.post(`${endpoint}/register`, controller.register);
router.post(`${endpoint}/google-login`, controller.googleLogin);
router.delete(`${endpoint}/logout`, auth.authenticate, controller.logout);

// Protected Profile Endpoints
router.get(
  `${endpoint}/me`,
  auth.authenticate,
  auth.isStudent,
  controller.getProfile
);
router.put(
  `${endpoint}/me`,
  auth.authenticate,
  auth.isStudent,
  controller.updateProfile
);

module.exports = router;
