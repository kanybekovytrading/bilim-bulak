import { z } from "zod";

export const SignUpFirstStepSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "validation.fullNameMin")
      .max(100, "validation.fullNameMax"),

    phone: z
      .string()
      .trim()
      .regex(/^996\d{9}$/, "validation.phoneKg"),

    password: z
      .string()
      .trim()
      .min(6, "validation.passwordMin")
      .max(100, "validation.passwordMax"),

    confirmPassword: z.string().trim(),

    termsAccepted: z
      .boolean()
      .refine((v) => v === true, { message: "validation.termsRequired" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordsDontMatch",
    path: ["confirmPassword"],
  });
