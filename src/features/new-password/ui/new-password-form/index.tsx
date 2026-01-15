"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, cn } from "@heroui/react";
import { toast } from "sonner";
import { NewPasswordFormValues } from "@/entities/new-password/model/types";
import { NewPasswordSchema } from "@/entities/new-password/model/schemas";
import { PasswordInputField } from "@/shared/ui/password-input-field";
import { useOtpStore } from "@/shared/stores/useOtpStore";
import { useResetPassord } from "@/entities/new-password/model/api/hooks";

export const NewPasswordForm = () => {
  const router = useRouter();

  const t = useTranslations();

  const ctx = useOtpStore((s) => s.context);
  const clear = useOtpStore((s) => s.clear);

  useEffect(() => {
    if (!ctx?.phone || ctx.type !== "PASSWORD_RESET") {
      router.replace("/auth/forgot-password");
    }
  }, [ctx, router]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const resetM = useResetPassord();

  const isContinueDisabled = isSubmitting || !isValid || resetM.isPending;

  const onSubmit = async (values: NewPasswordFormValues) => {
    if (!ctx?.phone) return;

    toast.promise(
      resetM.mutateAsync({ phone: ctx.phone, newPassword: values.password }),
      {
        loading: t("newPasswordForm.loading"),
        success: () => {
          clear();
          router.replace("/auth/sign-in");
          return t("newPasswordForm.success");
        },
        error: (err) =>
          err?.response?.data?.message ?? t("common.requestError"),
      }
    );
  };

  if (!ctx?.phone || ctx.type !== "PASSWORD_RESET") return null;

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl text-center font-semibold">
        {t("newPasswordForm.formTitle")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2 text-center">
        {t("newPasswordForm.formDescription")}
      </p>

      <Form
        className="mt-10 lg:mt-15 w-full flex flex-col gap-4 lg:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            const { ref: _ref, ...fieldProps } = field;

            return (
              <PasswordInputField
                name="password"
                label={t("newPasswordForm.passwordLabel")}
                errorMessage={
                  errors.password?.message
                    ? t(errors.password.message)
                    : undefined
                }
                inputProps={{ ...fieldProps, autoComplete: "new-password" }}
              />
            );
          }}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => {
            const { ref: _ref, ...fieldProps } = field;

            return (
              <PasswordInputField
                name="confirmPassword"
                label={t("newPasswordForm.confirmPasswordLabel")}
                errorMessage={
                  errors.confirmPassword?.message
                    ? t(errors.confirmPassword.message)
                    : undefined
                }
                inputProps={{ ...fieldProps, autoComplete: "new-password" }}
              />
            );
          }}
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
          {isSubmitting ? t("common.loading") : t("newPasswordForm.save")}
        </Button>
      </Form>
    </div>
  );
};
