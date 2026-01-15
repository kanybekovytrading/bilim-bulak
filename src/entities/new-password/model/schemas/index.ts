import { z } from "zod";

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, "validation.passwordMin")
      .max(100, "validation.passwordMax"),
    confirmPassword: z.string().trim(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "validation.passwordsDontMatch",
    path: ["confirmPassword"],
  });
