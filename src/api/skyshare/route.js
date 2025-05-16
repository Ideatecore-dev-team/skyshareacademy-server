const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/skyshare";

router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  upload.skyshare,
  controller.create
);
router.get(`${endpoint}`, controller.getAll);
router.get(`${endpoint}/:skyshareId`, controller.getById);
router.put(
  `${endpoint}/:skyshareId`,
  auth.authenticate,
  auth.isAdmin,
  upload.skyshare,
  controller.update
);
router.delete(
  `${endpoint}/:skyshareId`,
  auth.authenticate,
  auth.isAdmin,
  controller.remove
);

module.exports = router;
