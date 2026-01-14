import { z } from "zod";
import { SignInSchema } from "../schemas";

export type SignInFormValues = z.infer<typeof SignInSchema>;
