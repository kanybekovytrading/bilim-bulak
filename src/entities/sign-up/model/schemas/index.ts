import { z } from "zod";

export const step1Schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Атыңызды толтуруңуз (минимум 2 тамга)")
    .max(100, "Өтө узун"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d[\d\s()-]{7,}$/g, "Телефон номерин туура жазыңыз"),
});
