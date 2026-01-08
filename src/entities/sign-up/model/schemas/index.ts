import { z } from "zod";

export const SignUpFirstStepSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Атыңызды толтуруңуз (минимум 2 тамга)")
    .max(100, "Өтө узун"),

  phone: z
    .string()
    .trim()
    .regex(/^996\d{9}$/, "Номер 996 менен башталып жана 9 цифра болушу керек"),
});
