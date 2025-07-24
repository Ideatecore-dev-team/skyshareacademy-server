import { Router } from "express";
import { validate } from "../../../configs/validation";
import { authentication } from "../../../middlewares/auth.middleware";
import { AuthController } from "./auth.controller";
import { AuthSchema } from "./auth.schema";

const authController = new AuthController();

const router = Router();

router.post("/login", validate.body(AuthSchema.login), authController.login);
router.post("/logout", authentication, authController.logout);

export { router as authRouter };
