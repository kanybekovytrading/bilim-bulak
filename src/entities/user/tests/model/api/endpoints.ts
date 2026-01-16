import { api } from "@/shared/api";
import { GetTestsParams, GetTestsResponse } from "../types";

export const getTests = async (
  params?: GetTestsParams
): Promise<GetTestsResponse> => {
  const { data } = await api.get<GetTestsResponse>("/tests", { params });
  return data;
};
