import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./endpoints";

export const useGetProfile = () => {
  return useQuery({ queryKey: ["profile"], queryFn: getProfile });
};
