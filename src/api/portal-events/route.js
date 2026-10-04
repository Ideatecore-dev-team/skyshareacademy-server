const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/portal";

// Public Event Endpoint
router.get("/events", controller.getPublicEvents);

// Admin Event Endpoints
router.get(
  "/admin/events",
  auth.authenticate,
  auth.isAdmin,
  controller.adminGetEvents
);
router.get(
  "/admin/events/:id",
  auth.authenticate,
  auth.isAdmin,
  controller.adminGetEventById
);
router.post(
  "/admin/events",
  auth.authenticate,
  auth.isAdmin,
  upload.events,
  controller.createEvent
);
router.put(
  "/admin/events/:id",
  auth.authenticate,
  auth.isAdmin,
  upload.events,
  controller.updateEvent
);
router.delete(
  "/admin/events/:id",
  auth.authenticate,
  auth.isAdmin,
  controller.deleteEvent
);

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
