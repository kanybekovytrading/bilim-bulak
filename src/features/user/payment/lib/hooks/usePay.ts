"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCreatePayment } from "@/entities/user/payments/model/api/queries";

export const usePay = () => {
  const router = useRouter();

  const t = useTranslations();

  const createPayment = useCreatePayment();

  const pay = async (testId: number) => {
    const redirectURL = window.location.href;

    await toast.promise(createPayment.mutateAsync({ testId, redirectURL }), {
      loading: t("payment.paymentLoading"),
      success: (res) => {
        if (res?.paymentUrl) {
          window.location.href = res.paymentUrl;
          return t("payment.paymentRedirect");
        }

        router.push("/user");
        return t("payment.paymentCreated");
      },
      error: (err) => {
        router.push("/user");
        return err?.response?.data?.message ?? t("common.requestError");
      },
    });
  };

  return {
    pay,
  };
};
