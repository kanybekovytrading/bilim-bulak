import { useQuery } from "@tanstack/react-query";
import { getRegions } from "../sign-up/api";

export const useGetRegions = () =>
  useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
  });
