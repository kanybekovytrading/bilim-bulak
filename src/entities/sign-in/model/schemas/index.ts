import { z } from "zod";

export const SignInSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^996\d{9}$/, "validation.phoneKg"),
  password: z
    .string()
    .trim()
    .min(6, "validation.passwordMin")
    .max(100, "validation.passwordMax"),
});

