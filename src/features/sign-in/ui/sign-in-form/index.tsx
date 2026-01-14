"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, cn } from "@heroui/react";
import { PhoneInputField } from "@/shared/ui/phone-input-field";
import { PasswordInputField } from "@/shared/ui/password-input-field";
import { SignInFormValues } from "@/entities/sign-in/model/types";
import { SignInSchema } from "@/entities/sign-in/model/schemas";

export const SignInForm = () => {
  const router = useRouter();

  const t = useTranslations();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      phone: "996",
      password: "",
    },
    mode: "onChange",
  });

  const isContinueDisabled = isSubmitting || !isValid;

  const onSubmit = async (values: SignInFormValues) => {
    console.log("SIGN IN (later)", values);
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("signInForm.title")}
      </h1>

      <p className="text-blue-700 text-base text-center lg:text-xl font-medium mt-2">
        {t("signInForm.step")}
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
                  autoComplete: "current-password",
                }}
              />
            );
          }}
        />

        <div className="flex justify-center mt-10">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-0 min-w-0 h-auto text-blue-700 lg:text-xl text-sm font-medium hover:bg-transparent"
            onClick={() => console.log("Forgot password (later)")}
          >
            {t("signInForm.forgotPassword")}
          </Button>
        </div>

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
          {t("common.login")}
        </Button>

        <div className="mt-3 flex items-center justify-center gap-2 font-medium text-sm lg:text-xl">
          <span className="text-neutral-500">{t("signInForm.noAccount")}</span>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="px-0 min-w-0 h-auto text-blue-700 lg:text-xl text-sm font-medium hover:bg-transparent"
            onClick={() => router.push("/auth/sign-up")}
          >
            {t("signInForm.signUp")}
          </Button>
        </div>
      </Form>
    </div>
  );
};
