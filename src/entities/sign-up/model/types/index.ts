import { z } from "zod";
import { SignUpSchema, SignUpWorkSchema } from "../schemas";

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
export type SignUpWorkFormValues = z.infer<typeof SignUpWorkSchema>;

export interface SignUpFirstStepData {
  fullName: string;
  phone: string;
  password: string;
}

export interface SignUpSecondStepData {
  region?: string;
  district?: string;
  organizationType?: "school" | "kindergarten";
  organizationName?: string;
}

export interface Region {
  id: number;
  nameKg: string;
  nameRu: string;
}
