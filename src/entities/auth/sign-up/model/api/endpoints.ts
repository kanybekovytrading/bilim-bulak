import { api } from "@/shared/api";
import { RegisterPayload } from "../types";
import { AuthResponse } from "@/shared/types";

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};
