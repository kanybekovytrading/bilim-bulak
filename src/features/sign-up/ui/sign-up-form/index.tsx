"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, cn } from "@heroui/react";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import type { SignUpFormValues } from "@/entities/sign-up/model/types";
import { SignUpSchema } from "@/entities/sign-up/model/schemas";
import { PhoneInputField } from "@/shared/ui/phone-input-field";
import { PasswordInputField } from "@/shared/ui/password-input-field";
import { TermsAcceptedField } from "@/shared/ui/terms-accepted-field";
import { useBeforeUnload } from "@/shared/lib/hooks/useBeforeUnload";
import { useOtpStore } from "@/shared/stores/useOtpStore";

export const SignUpForm = () => {
  const router = useRouter();

  const t = useTranslations();

  const firstStep = useSignUpStore((s) => s.firstStep);
  const setFirstStep = useSignUpStore((s) => s.setFirstStep);
  const setOtpContext = useOtpStore((s) => s.setContext);

  const defaultValues = useMemo<SignUpFormValues>(
    () => ({
      phone: firstStep?.phone ?? "996",
      password: firstStep?.password ?? "",
      confirmPassword: firstStep?.confirmPassword ?? "",
      termsAccepted: firstStep?.termsAccepted ?? false,
    }),
    [firstStep]
  );

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
    mode: "onChange",
  });

  useBeforeUnload({ enabled: isDirty || !!firstStep });

  const termsAccepted = useWatch({ control, name: "termsAccepted" });
  const isContinueDisabled = isSubmitting || !termsAccepted || !isValid;

  const onSubmit = async (values: SignUpFormValues) => {
    setFirstStep(values);
    setOtpContext({ phone: values.phone, type: "REGISTRATION" });
    router.push("/auth/sign-up/work");
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("signUpForm.title")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
        {t("signUpForm.step1")}
      </p>

      <Form
        className="mt-8 lg:mt-10 w-full flex flex-col gap-4 lg:gap-5"
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

        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            const { ref: _ref, ...fieldProps } = field;

            return (
              <PasswordInputField
                name="password"
                label={t("signUpForm.passwordLabel")}
                errorMessage={
                  errors.password?.message
                    ? t(errors.password.message)
                    : undefined
                }
                inputProps={{
                  ...fieldProps,
                  autoComplete: "new-password",
                }}
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
                label={t("signUpForm.confirmPasswordLabel")}
                errorMessage={
                  errors.confirmPassword?.message
                    ? t(errors.confirmPassword.message)
                    : undefined
                }
                inputProps={{
                  ...fieldProps,
                  autoComplete: "new-password",
                }}
              />
            );
          }}
        />

        <TermsAcceptedField
          control={control}
          errorMessage={
            errors.termsAccepted?.message
              ? t(errors.termsAccepted.message)
              : undefined
          }
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
          {t("signUpForm.continue")}
        </Button>

        <div className="mt-3 flex items-center justify-center gap-2 font-medium text-sm lg:text-xl">
          <span className="text-neutral-500">
            {t("common.alreadyRegistered")}
          </span>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-0 min-w-0 h-auto text-blue-700 lg:text-xl text-sm font-semibold hover:bg-transparent"
            onClick={() => router.push("/auth/sign-in")}
          >
            {t("common.login")}
          </Button>
        </div>
      </Form>
    </div>
  );
};
