import { api } from "@/shared/api";
import { GetTestsResponse } from "../types";

export const getTests = async (): Promise<GetTestsResponse> => {
  const { data } = await api.get<GetTestsResponse>("/tess");
  return data;
};
