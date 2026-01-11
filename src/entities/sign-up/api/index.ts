import { api } from "@/shared/api";
import { Region } from "../model/types";

export const getRegions = async (): Promise<Region[]> => {
  const { data } = await api.get<Region[]>("/dictionaries/regions");
  return data;
};
