import { useMutation } from "@tanstack/react-query";
import { sendOtpForgotPassword } from "./endpoints";

export const useSendOtpForgotPassword = () => {
  return useMutation({
    mutationFn: sendOtpForgotPassword,
  });
};
