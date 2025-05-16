const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/partner";

router.post(
    `${endpoint}/add`,
    auth.authenticate,
    auth.isAdmin,
    upload.partner,
    controller.create
 );
 router.get(`${endpoint}`, controller.getAll);
 router.get(`${endpoint}/:partnerId`, controller.getById);
 router.put(
    `${endpoint}/:partnerId`,
    auth.authenticate,
    auth.isAdmin,
    upload.partner,
    controller.update
 );
 router.delete(
    `${endpoint}/:partnerId`,
    auth.authenticate,
    auth.isAdmin,
    controller.remove
 );

 module.exports = router;