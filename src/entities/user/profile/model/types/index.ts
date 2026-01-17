import { z } from "zod";
import { DictionaryItem, District, Organization } from "@/shared/types";
import { ProfileSchema } from "../schemas";

export type ProfileFormValues = z.infer<typeof ProfileSchema>;

export interface ProfileResponse {
  id: number;
  phone: string;
  region: DictionaryItem;
  district: District;
  organizationType: DictionaryItem;
  organization: Organization;
}
