import { z } from "zod";
import { SignUpFirstStepSchema } from "../schemas";

export type SignUpFirstStepFormValues = z.infer<typeof SignUpFirstStepSchema>;

export type SignUpFirstStepData = {
  fullName: string;
  phone: string;
  password: string;
};

export type SignUpSecondStepData = {
  region?: string;
  district?: string;
  organizationType?: "school" | "kindergarten";
  organizationName?: string;
};
