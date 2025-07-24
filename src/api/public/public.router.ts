import { Router } from "express";
import { authRouter } from "./auth/auth.router";

const router = Router();

router.use(authRouter);

export { router as publicRouter };
