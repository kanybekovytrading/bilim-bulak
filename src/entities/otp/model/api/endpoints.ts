import { api } from "@/shared/api";
import { OtpParams, OtpResponse, VerifyOtpPayload } from "@/shared/types";
import type { VerifyOtpResponse } from "../types";

export const verifyOtp = async (
  payload: VerifyOtpPayload
): Promise<VerifyOtpResponse> => {
  const { data } = await api.post<VerifyOtpResponse>(
    "/auth/verify-otp",
    payload
  );

  return data;
};

export const resendOtp = async (params: OtpParams): Promise<OtpResponse> => {
  const { data } = await api.post<OtpResponse>("/auth/resend-otp", null, {
    params,
  });
  return data;
};
