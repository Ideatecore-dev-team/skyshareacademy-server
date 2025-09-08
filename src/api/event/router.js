const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/event";

// router.get(`${endpoint}`, (_, res) => {
//   res.send("hello event");
// });

router.post(
  `${endpoint}/add`,
  //   auth.authenticate,
  //   auth.isAdmin,
  upload.event,
  controller.create,
);

router.get(`${endpoint}`, controller.getAll);
router.get(`${endpoint}/:eventId`, controller.getById);

router.put(
  `${endpoint}/:eventId`,
  //   auth.authenticate,
  //   auth.isAdmin,
  upload.event,
  controller.update,
);

router.delete(
  `${endpoint}/:eventId`,
  //   auth.authenticate,
  //   auth.isAdmin,
  controller.remove,
);

module.exports = router;
