"use client";
import { useTranslations, useLocale } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form } from "@heroui/react";
import { useGetRegions } from "@/entities/queries";
import { SignUpWorkSchema } from "@/entities/sign-up/model/schemas";
import { SignUpWorkFormValues } from "@/entities/sign-up/model/types";
import { SelectField } from "@/shared/ui/select-field";

export const SignUpWorkForm = () => {
  const { control, handleSubmit } = useForm<SignUpWorkFormValues>({
    resolver: zodResolver(SignUpWorkSchema),
    defaultValues: { regionId: null },
    mode: "onSubmit",
  });

  const { data: regions = [], isPending, isError } = useGetRegions();

  const locale = useLocale();

  const t = useTranslations();

  const onSubmit = (values: SignUpWorkFormValues) => {
    console.log(values.regionId);
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl text-center lg:text-4xl font-semibold">
        {t("signUpWorkForm.title")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2">
        {t("signUpWorkForm.step2")}
      </p>

      <Form
        className="mt-8 lg:mt-10 w-full flex flex-col gap-4 lg:gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="regionId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.regionLabel")}
              placeholder={
                isPending
                  ? t("signUpWorkForm.loading")
                  : t("signUpWorkForm.regionPlaceholder")
              }
              options={regions}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={isPending || isError}
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
            />
          )}
        />

        {isError && (
          <p className="text-sm text-red-500">
            {t("signUpWorkForm.loadError")}
          </p>
        )}

        <Button type="submit" className="w-full">
          Отправить
        </Button>
      </Form>
    </div>
  );
};
