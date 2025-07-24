import { z } from "zod";

export const AuthSchema = {
  login: z
    .object({
      email: z.string().trim().email().min(8).max(100),
      password: z.string().trim().min(8).max(32),
    })
    .strict(),
};

export type authLoginDto = z.infer<typeof AuthSchema.login>;
