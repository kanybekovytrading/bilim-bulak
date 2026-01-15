import { z } from "zod";
import { NewPasswordSchema } from "../schemas";

export type NewPasswordFormValues = z.infer<typeof NewPasswordSchema>;

export interface ResetPasswordPayload {
  phone: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}
