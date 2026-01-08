import { z } from "zod";
import { step1Schema } from "../schemas";

export type Step1Values = z.infer<typeof step1Schema>;
