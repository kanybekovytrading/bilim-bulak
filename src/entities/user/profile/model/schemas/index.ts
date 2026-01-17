import { z } from "zod";

export const ProfileSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^996\d{9}$/, "validation.phoneKg"),
  regionId: z.number().int().min(1, "validation.regionRequired"),
  districtId: z.number().int().min(1, "validation.districtRequired"),
  organizationTypeId: z.number().int().min(1, "validation.orgTypeRequired"),
  organizationId: z.number().int().min(1, "validation.organizationRequired"),
});
