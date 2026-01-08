"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Form, Label, TextField, cn } from "@heroui/react";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { SignUpFirstStepFormValues } from "@/entities/sign-up/model/types";
import { SignUpFirstStepSchema } from "@/entities/sign-up/model/schemas";
import { PhoneInputField } from "@/shared/ui/phone-input-field";
import { TextInputField } from "@/shared/ui/text-input-field";
import { PasswordInputField } from "@/shared/ui/password-input-field";

export const SignUpForm = () => {
  const setFirstStep = useSignUpStore((s) => s.setFirstStep);

  const router = useRouter();

  const t = useTranslations();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFirstStepFormValues>({
    resolver: zodResolver(SignUpFirstStepSchema),
    defaultValues: {
      fullName: "",
      phone: "996",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
    mode: "onChange",
  });

  const termsAccepted = watch("termsAccepted");
  const isContinueDisabled = isSubmitting || !termsAccepted || !isValid;

  const onSubmit = async (values: SignUpFirstStepFormValues) => {
    setFirstStep({
      fullName: values.fullName,
      phone: values.phone,
      password: values.password,
    });

    router.push("/sign-up/work");
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
        <TextInputField
          name="fullName"
          label={t("signUpForm.fullNameLabel")}
          errorMessage={
            errors.fullName?.message ? t(errors.fullName.message) : undefined
          }
          inputProps={{
            ...register("fullName"),
            autoComplete: "name",
            placeholder: t("signUpForm.fullNamePlaceholder"),
          }}
        />

        <TextField name="phone">
          <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
            {t("signUpForm.phoneLabel")}
          </Label>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInputField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.phone}
                placeholder="+996 700 000 000"
              />
            )}
          />

          {errors.phone?.message && (
            <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
              {t(errors.phone.message)}
            </p>
          )}
        </TextField>

        <PasswordInputField
          name="password"
          label={t("signUpForm.passwordLabel")}
          errorMessage={
            errors.password?.message ? t(errors.password.message) : undefined
          }
          inputProps={{
            ...register("password"),
            autoComplete: "new-password",
          }}
        />

        <PasswordInputField
          name="confirmPassword"
          label={t("signUpForm.confirmPasswordLabel")}
          errorMessage={
            errors.confirmPassword?.message
              ? t(errors.confirmPassword.message)
              : undefined
          }
          inputProps={{
            ...register("confirmPassword"),
            autoComplete: "new-password",
          }}
        />

        <Controller
          name="termsAccepted"
          control={control}
          render={({ field }) => (
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="sign-up"
                className="mt-0.5"
                isSelected={!!field.value}
                onChange={(selected: boolean) => field.onChange(selected)}
                onBlur={field.onBlur}
              >
                <Checkbox.Control className="bg-neutral-200">
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox>

              <p className="text-xs lg:text-sm text-neutral-500 font-medium">
                {t("signUpForm.termsText")} <br />
                <Link href="/" className="text-blue-700">
                  {t("signUpForm.userAgreement")}
                </Link>{" "}
                {t("signUpForm.and")}{" "}
                <Link href="/" className="text-blue-700">
                  {t("signUpForm.privacyPolicy")}
                </Link>
              </p>
            </div>
          )}
        />

        {errors.termsAccepted?.message && (
          <p className="text-xs lg:text-sm text-red-500 -mt-2">
            {t(errors.termsAccepted.message)}
          </p>
        )}

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
      </Form>
    </div>
  );
};
