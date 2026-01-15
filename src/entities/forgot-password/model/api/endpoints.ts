import { api } from "@/shared/api";
import { OtpParams, OtpResponse } from "@/shared/types";

export const sendOtpForgotPassword = async (
  params: OtpParams
): Promise<OtpResponse> => {
  const { data } = await api.post<OtpResponse>("/auth/resend-otp", null, {
    params,
  });
  return data;
};
