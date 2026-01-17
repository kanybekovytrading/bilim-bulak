import { useMutation } from "@tanstack/react-query";
import { registerUser } from "./endpoints";

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
