import bcrypt from "bcrypt";
import { createToken } from "../../../configs/createToken";
import { UnauthorizedException } from "../../../errors/Errors";
import { AuthRepository } from "./auth.repository";
import type { authLoginDto } from "./auth.schema";

const authRepository = new AuthRepository();

export class AuthService {
  async login(request: authLoginDto): Promise<string> {
    const isEmailExist = await authRepository.findEmail(request.email);

    if (!isEmailExist) {
      throw new UnauthorizedException("Email or Password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      request.password,
      isEmailExist.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Email or Password is wrong");
    }

    const token = createToken({ id: isEmailExist.id });

    return token;
  }
}
