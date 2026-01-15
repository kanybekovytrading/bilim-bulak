export type AuthResponse = {
  token: string;
  userId: number;
  phone: string;
  role: string;
};

export type VerifyOtpType = "REGISTRATION" | "PASSWORD_RESET";

export interface VerifyOtpPayload {
  phone: string;
  code: string;
  type: VerifyOtpType;
}

export interface OtpParams {
  phone: string;
  type: VerifyOtpType;
}

export interface OtpResponse {
  success: boolean;
  phone: string;
  transactionId: string;
  token: string;
  expiresAt: string;
  message: string;
}
