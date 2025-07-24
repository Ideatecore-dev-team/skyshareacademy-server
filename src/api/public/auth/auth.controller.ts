import type { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await authService.login(req.body);

      res
        .status(200)
        .cookie("authorization", response, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          data: {
            token: response,
          },
          message: "Success login",
          success: true,
        });
    } catch (error) {
      next(error);
    }
  }

  logout(_req: Request, res: Response): void {
    res
      .clearCookie("authorization", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        data: null,
        message: "Success logout",
        success: true,
      });
  }
}
