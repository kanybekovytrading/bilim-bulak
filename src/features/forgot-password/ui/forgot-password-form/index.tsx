"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, cn } from "@heroui/react";
import { toast } from "sonner";
import type { ForgotPasswordFormValues } from "@/entities/forgot-password/model/types";
import { ForgotPasswordSchema } from "@/entities/forgot-password/model/schemas";
import { useSendOtpForgotPassword } from "@/entities/forgot-password/model/api/queries";
import { PhoneInputField } from "@/shared/ui/phone-input-field";
import { useOtpStore } from "@/shared/stores/useOtpStore";

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const t = useTranslations();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { phone: "996" },
    mode: "onChange",
  });

  const setOtpContext = useOtpStore((s) => s.setContext);

  const sendOtpM = useSendOtpForgotPassword();

  const isContinueDisabled = isSubmitting || !isValid || sendOtpM.isPending;

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const payload = {
      phone: values.phone,
      type: "PASSWORD_RESET" as const,
    };

    await toast.promise(sendOtpM.mutateAsync(payload), {
      loading: t("forgotPasswordForm.loading"),
      success: () => {
        setOtpContext(payload);
        router.push("/auth/otp");
        return t("forgotPasswordForm.codeSent");
      },
      error: (err) => {
        const msg = err?.response?.data?.message;
        return msg ? msg : t("common.requestError");
      },
    });
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl text-center font-semibold">
        {t("forgotPasswordForm.formTitle")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2 text-center">
        {t("forgotPasswordForm.formDescription")}
      </p>

      <Form
        className="mt-10 lg:mt-15 w-full flex flex-col gap-8 lg:gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInputField
              label={t("signUpForm.phoneLabel")}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!errors.phone}
              errorMessage={
                errors.phone?.message ? t(errors.phone.message) : undefined
              }
              placeholder="+996 700 000 000"
            />
          )}
        />

        <Button
          type="submit"
          isDisabled={isContinueDisabled}
          className={cn(
            "w-full h-fit rounded-xl font-medium text-sm lg:text-xl py-3 lg:py-4.5",
            isContinueDisabled
              ? "bg-[#EEEEEE] text-[#A9A9A9]"
              : "bg-blue-700 text-white"
          )}
        >
          {sendOtpM.isPending
            ? t("common.loading")
            : t("forgotPasswordForm.continue")}
        </Button>
      </Form>
    </div>
  );
};
