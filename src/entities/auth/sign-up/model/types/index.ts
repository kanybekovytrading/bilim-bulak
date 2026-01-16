import { z } from "zod";
import { SignUpSchema, SignUpWorkSchema } from "../schemas";

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignUpWorkFormValues = z.infer<typeof SignUpWorkSchema>;

export interface SignUpFirstStepData {
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface SignUpSecondStepData {
  regionId: number;
  districtId: number;
  organizationTypeId: number;
  organizationId: number;
}

export type RegisterPayload = Pick<SignUpFirstStepData, "phone" | "password"> &
  SignUpSecondStepData;

