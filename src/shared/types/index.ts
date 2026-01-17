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
  name: string;
};

export type District = DictionaryItem & {
  regionId: number;
};

export type Organization = DictionaryItem & {
  districtId: number;
  organizationTypeId: number;
};

export type TestStatus = "AVAILABLE" | "PAID" | "COMPLETED";

type TestStatusChipColorName = "default" | "accent" | "success";

export interface TestItem {
  id: number;
  title: string;
  description: string;
  timerMinutes: number;
  price: number;
  status: TestStatus;
  questionCount: number;
}

export const TEST_STATUS_I18N_KEY: Record<TestStatus, string> = {
  AVAILABLE: "tests.status.available",
  PAID: "tests.status.paid",
  COMPLETED: "tests.status.completed",
};

export const TEST_STATUS_CHIP_COLOR: Record<
  TestStatus,
  TestStatusChipColorName
> = {
  AVAILABLE: "default",
  PAID: "success",
  COMPLETED: "accent",
};
