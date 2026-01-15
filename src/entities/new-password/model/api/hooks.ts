import { useMutation } from "@tanstack/react-query";
import { resetUserPassowrd } from "./endpoints";

export const useResetPassord = () => {
  return useMutation({
    mutationFn: resetUserPassowrd,
  });
};
