import { useQuery } from "@tanstack/react-query";
import { getTests } from "./endpoints";
import { GetTestsParams } from "../types";

export const useGetTests = (params?: GetTestsParams) => {
  return useQuery({
    queryKey: ["tests", params?.language ?? "ru"],
    queryFn: () => getTests(params),
  });
};
