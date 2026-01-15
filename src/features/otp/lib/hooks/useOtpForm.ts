"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { useVerifyOtp, useResendOtp } from "@/entities/otp/model/api/queries";
import { formatKgPhone } from "@/shared/lib/utils/helpers";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { usePersistentCountdown } from "./usePersistentCountdown";
import { useOtpStore } from "@/shared/stores/useOtpStore";

export const useOtpForm = () => {
  const [otp, setOtp] = useState("");

  const t = useTranslations();

  const router = useRouter();

  const phoneRaw = useSignUpStore((s) => s.firstStep?.phone) ?? "";
  const promote = useAuthStore((s) => s.promoteOtpToAuth);
  const type = useOtpStore((s) => s.context?.type);
  const phoneOtp = useOtpStore((s) => s.context?.phone);

  const phone = useMemo(() => formatKgPhone(phoneRaw), [phoneRaw]);

  const timerKey = `otp_resend_expireAt:${phoneRaw || "empty"}`;

  const { mmss, isExpired, restart } = usePersistentCountdown({
    key: timerKey,
    durationSec: 60,
  });

  const verifyM = useVerifyOtp();
  const resendM = useResendOtp();

  const isBusy = verifyM.isPending || resendM.isPending;
  const isConfirmDisabled = otp.length !== 6 || isBusy;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      phone: type === "REGISTRATION" ? phoneRaw : phoneOtp ?? "",
      code: otp,
      type: "REGISTRATION" as const,
    };

    toast.promise(verifyM.mutateAsync(payload), {
      loading: t("otpPage.loading"),
      success: () => {
        if (type === "REGISTRATION") {
          promote();
          router.replace("/dashboard");
        } else {
          router.replace("/auth/forgot-password/new-password");
        }

        return t("otpPage.success");
      },
      error: (err) => {
        const msg = err?.response?.data?.message;

        if (msg === "The OTP has expired. Please request a new code.") {
          return t("otpPage.error");
        }

        return t("common.requestError");
      },
    });
  };

  const onResend = async () => {
    if (!isExpired || resendM.isPending) return;

    const payload = {
      phone: phoneRaw,
      type: "REGISTRATION" as const,
    };

    await toast.promise(resendM.mutateAsync(payload), {
      loading: t("otpPage.resendLoading"),
      success: () => {
        restart();
        setOtp("");
        return t("otpPage.resendSuccess");
      },
      error: (err) => err?.response?.data?.message ?? t("common.requestError"),
    });
  };

  const onWrongNumber = () => router.back();

  return {
    t,
    otp,
    setOtp,
    phone,
    mmss,
    isExpired,
    verifyPending: verifyM.isPending,
    resendPending: resendM.isPending,
    isBusy,
    isConfirmDisabled,
    onSubmit,
    onResend,
    onWrongNumber,
  };
};
