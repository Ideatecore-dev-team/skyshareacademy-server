const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/article";

router.post(
  `${endpoint}/add`,
  auth.authenticate,
  auth.isAdmin,
  upload.article,
  controller.create
);
router.get(`${endpoint}`, controller.getAll);
router.get(`${endpoint}/:articleId`, controller.getById);
router.put(
  `${endpoint}/:articleId`,
  auth.authenticate,
  auth.isAdmin,
  upload.article,
  controller.update
);
router.delete(
  `${endpoint}/:articleId`,
  auth.authenticate,
  auth.isAdmin,
  controller.remove
);

module.exports = router;
