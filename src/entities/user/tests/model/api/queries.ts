import { useQuery } from "@tanstack/react-query";
import { getTests } from "./endpoints";

export const useGetTests = () => {
  return useQuery({
    queryKey: ["tests"],
    queryFn: () => getTests(),
  });
};
