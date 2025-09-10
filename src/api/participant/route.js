const express = require("express");
const auth = require("../../middleware/auth");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/participant";

router.post(`${endpoint}/add`, auth.authenticate, auth.isAdmin, controller.create);

router.get(`/event/:eventId${endpoint}`, controller.getAll);
router.get(`${endpoint}/:participantId`, controller.getById);

router.put(
  `${endpoint}/:participantId`,
  auth.authenticate,
  auth.isAdmin,
  controller.update,
);

router.delete(
  `${endpoint}/:participantId`,
  auth.authenticate,
  auth.isAdmin,
  controller.remove,
);

module.exports = router;
