const express = require("express");
const auth = require("../../middleware/auth");
const upload = require("../../utilities/uploadCloudinary");
const controller = require("./controller");

const router = express.Router();
const endpoint = "/media";

// @desc    List media
// @route   GET /media
// @access  Private
router.get(endpoint, auth.authenticate, controller.listMedia);

// @desc    Upload media
// @route   POST /media
// @access  Private
router.post(endpoint, auth.authenticate, upload.general, controller.uploadMedia);

// @desc    Upload media via TinyMCE
// @route   POST /media/tinymce
// @access  Private
router.post(`${endpoint}/tinymce`, auth.authenticate, upload.general, controller.uploadTinyMCE);

// @desc    Delete media
// @route   DELETE /media/*
// @access  Private
router.delete(`${endpoint}/*`, auth.authenticate, controller.deleteMedia);

module.exports = router;
