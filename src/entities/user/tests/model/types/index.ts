import { Locale } from "@/shared/types";

export type TestStatus = "ACTIVE" | "INACTIVE" | "DRAFT" | string;

export interface TestItem {
  id: number;
  title: string;
  description: string;
  timerMinutes: number;
  price: number;
  status: TestStatus;
  questionCount: number;
}

export type GetTestsResponse = TestItem[];

export interface GetTestsParams {
  language?: Locale;
}
