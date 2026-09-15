const express = require("express");
const auth = require("../../middleware/auth");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/portal";

// Event list & detail (student / member)
router.get(
  `${endpoint}/events`,
  auth.authenticate,
  auth.isStudent,
  controller.getEvents
);
router.get(
  `${endpoint}/events/:id`,
  auth.authenticate,
  auth.isStudent,
  controller.getEventDetail
);

// Task Submission
router.post(
  `${endpoint}/events/:id/submit`,
  auth.authenticate,
  auth.isStudent,
  controller.submitTask
);
router.get(
  `${endpoint}/events/:id/my-submission`,
  auth.authenticate,
  auth.isStudent,
  controller.getMySubmission
);

// Mentor Review Endpoints
router.get(
  `${endpoint}/submissions`,
  auth.authenticate,
  auth.isMentor,
  controller.getSubmissionsForMentor
);
router.put(
  `${endpoint}/submissions/:id/review`,
  auth.authenticate,
  auth.isMentor,
  controller.reviewSubmission
);

module.exports = router;
