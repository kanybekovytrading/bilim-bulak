import { api } from "@/shared/api";
import { ProfileResponse } from "../types";

export const getProfile = async (): Promise<ProfileResponse> => {
  const { data } = await api.get<ProfileResponse>("/user/profile");
  return data;
};
