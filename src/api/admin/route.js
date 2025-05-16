const express = require("express");
const auth = require("../../middleware/auth");

const controller = require("./controller");

const router = express.Router();
const endpoint = "/admin";

// @desc    Login admin
// @route   POST /admin/register
// @access  Private
router.post(`${endpoint}/login`, controller.login);

// @desc    Change password admin
// @route   POST /admin/changepassword
// @access  Private
router.put(
  `${endpoint}/changepassword`,
  auth.authenticate,
  controller.changePassword
);

// @desc    Logout admin
// @route   POST /admin/logout
// @access  Private
router.delete(`${endpoint}/logout`, auth.authenticate, controller.logout);

// @desc    Register new admin
// @route   POST /admin/register
// @access  Private/superadmin
router.post(
  `${endpoint}/register`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.register
);

// @desc    Get all admins
// @route   GET /admin/admins
// @access  Private/superadmin
router.get(
  `${endpoint}/admins`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.getAdmins
);

// @desc    Get admin by id
// @route   GET /admin/admin/:adminId
// @access  Private/superadmin
router.get(
  `${endpoint}/admin/:adminId`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.getAdminById
);

// @desc    Update admin
// @route   PUT /admin/admin/:adminId
// @access  Private/superadmin
router.put(
  `${endpoint}/admin/:adminId`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.updateAdminById
);

// @desc    Delete admin
// @route   DELETE /admin/admin/:adminId
// @access  Private/superadmin
router.delete(
  `${endpoint}/admin/:adminId`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.deleteAdminById
);

// for checking only, must delete or comment when in production
router.get(`${endpoint}/info`, auth.authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

module.exports = router;
