import { api } from "@/shared/api";
import { ResetPasswordPayload, ResetPasswordResponse } from "../types";

export const resetUserPassowrd = async (
  payload: ResetPasswordPayload
): Promise<ResetPasswordResponse> => {
  const { data } = await api.post<ResetPasswordResponse>(
    "/auth/login",
    payload
  );

  return data;
};
