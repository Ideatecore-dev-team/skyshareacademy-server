const express = require("express");
const auth = require("../../middleware/auth");

const controller = require("./controller");

const router = express.Router();

const endpoint = "/superadmin";

router.post(`${endpoint}/login`, controller.login);

router.get(
  `${endpoint}/info`,
  auth.authenticate,
  auth.isSuperAdmin,
  (req, res) => {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  }
);

router.post(
  `${endpoint}/changepassword`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.changePassword
);

router.delete(
  `${endpoint}/logout`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.logout
);

router.get(
  `${endpoint}/admins`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.getAdmins
);
router.get(
  `${endpoint}/admin/:adminId`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.getAdminById
);

router.put(
  `${endpoint}/admin/:adminId`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.updateAdminById
);

router.delete(
  `${endpoint}/admin/:adminId`,
  auth.authenticate,
  auth.isSuperAdmin,
  controller.deleteAdminById
);

module.exports = router;
