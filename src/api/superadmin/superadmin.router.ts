import { Router } from "express";
import { authentication } from "../../middlewares/auth.middleware";
import { role } from "../../middlewares/role.middleware";
import { adminRouter } from "./admin/admin.router";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    data: null,
    message: "hello from superadmin route",
    success: true,
  });
});

router.use(authentication, role.superAdmin);
router.use("/admin", adminRouter);

export { router as superAdminRouter };
