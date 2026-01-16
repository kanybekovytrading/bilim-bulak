export type AuthResponse = {
  token: string;
  userId: number;
  phone: string;
  role: string;
};

export type Locale = "kg" | "ru";

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

export type DictionaryItem = {
  id: number;
  nameKg: string;
  nameRu: string;
};

export type District = DictionaryItem & {
  regionId: number;
};

export type Organization = DictionaryItem & {
  districtId: number;
  organizationTypeId: number;
};
