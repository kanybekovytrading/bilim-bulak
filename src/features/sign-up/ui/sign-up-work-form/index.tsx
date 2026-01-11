"use client";
import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, cn } from "@heroui/react";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { SignUpWorkSchema } from "@/entities/sign-up/model/schemas";
import type { SignUpWorkFormValues } from "@/entities/sign-up/model/types";
import { SelectField } from "@/shared/ui/select-field";
import {
  useGetRegions,
  useGetDistricts,
  useGetOrganizationTypes,
  useGetOrganizations,
} from "@/entities/queries";

export const SignUpWorkForm = () => {
  const t = useTranslations();
  const locale = useLocale() as "kg" | "ru";

  const setSecondStep = useSignUpStore((s) => s.setSecondStep);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpWorkFormValues>({
    resolver: zodResolver(SignUpWorkSchema),
    defaultValues: {
      regionId: 0,
      districtId: 0,
      organizationTypeId: 0,
      organizationId: 0,
    },
    mode: "onSubmit",
  });

  const regionId = useWatch({ control, name: "regionId" });
  const districtId = useWatch({ control, name: "districtId" });
  const organizationTypeId = useWatch({ control, name: "organizationTypeId" });
  const organizationId = useWatch({ control, name: "organizationId" });

  const regionsQ = useGetRegions();
  const districtsQ = useGetDistricts(regionId);
  const orgTypesQ = useGetOrganizationTypes();
  const orgsQ = useGetOrganizations(districtId, organizationTypeId);

  useEffect(() => {
    setValue("districtId", 0);
    setValue("organizationTypeId", 0);
    setValue("organizationId", 0);
  }, [regionId, setValue]);

  useEffect(() => {
    setValue("organizationId", 0);
  }, [districtId, setValue]);

  useEffect(() => {
    setValue("organizationId", 0);
  }, [organizationTypeId, setValue]);

  const hasAllSelected =
    regionId > 0 &&
    districtId > 0 &&
    organizationTypeId > 0 &&
    organizationId > 0;

  const regionsBlocked = regionsQ.isPending || regionsQ.isError;

  const districtsBlocked =
    regionId === 0 || districtsQ.isPending || districtsQ.isError;

  const orgTypesBlocked = orgTypesQ.isPending || orgTypesQ.isError;

  const orgsBlocked =
    districtId === 0 ||
    organizationTypeId === 0 ||
    orgsQ.isPending ||
    orgsQ.isError;

  const isContinueDisabled =
    isSubmitting ||
    !hasAllSelected ||
    regionsBlocked ||
    districtsBlocked ||
    orgTypesBlocked ||
    orgsBlocked;

  const onSubmit = (values: SignUpWorkFormValues) => {
    setSecondStep({ ...values });
    console.log(values);
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
                regionsQ.isPending
                  ? t("common.loading")
                  : regionsQ.isError
                  ? t("common.loadError")
                  : t("signUpWorkForm.regionPlaceholder")
              }
              options={regionsQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={regionsQ.isPending || regionsQ.isError}
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
              loadErrorMessage={
                regionsQ.isError ? t("common.loadError") : undefined
              }
              onRetry={regionsQ.isError ? () => regionsQ.refetch() : undefined}
              retryText={t("common.retry")}
            />
          )}
        />

        <Controller
          name="districtId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.districtLabel")}
              placeholder={
                regionId === 0
                  ? t("signUpWorkForm.selectRegionFirst")
                  : districtsQ.isPending
                  ? t("common.loading")
                  : districtsQ.isError
                  ? t("common.loadError")
                  : t("signUpWorkForm.districtPlaceholder")
              }
              options={districtsQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={districtsBlocked}
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
              loadErrorMessage={
                regionId !== 0 && districtsQ.isError
                  ? t("common.loadError")
                  : undefined
              }
              onRetry={
                regionId !== 0 && districtsQ.isError
                  ? () => districtsQ.refetch()
                  : undefined
              }
              retryText={t("common.retry")}
            />
          )}
        />

        <Controller
          name="organizationTypeId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.orgTypeLabel")}
              placeholder={
                orgTypesQ.isPending
                  ? t("common.loading")
                  : orgTypesQ.isError
                  ? t("common.loadError")
                  : t("signUpWorkForm.orgTypePlaceholder")
              }
              options={orgTypesQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={orgTypesBlocked}
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
              loadErrorMessage={
                orgTypesQ.isError ? t("common.loadError") : undefined
              }
              onRetry={
                orgTypesQ.isError ? () => orgTypesQ.refetch() : undefined
              }
              retryText={t("common.retry")}
            />
          )}
        />

        <Controller
          name="organizationId"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              label={t("signUpWorkForm.organizationLabel")}
              placeholder={
                districtId === 0 || organizationTypeId === 0
                  ? t("signUpWorkForm.selectDistrictAndTypeFirst")
                  : orgsQ.isPending
                  ? t("common.loading")
                  : orgsQ.isError
                  ? t("common.loadError")
                  : t("signUpWorkForm.organizationPlaceholder")
              }
              options={orgsQ.data ?? []}
              locale={locale}
              value={field.value}
              onChange={field.onChange}
              isDisabled={orgsBlocked}
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
              loadErrorMessage={
                districtId !== 0 && organizationTypeId !== 0 && orgsQ.isError
                  ? t("common.loadError")
                  : undefined
              }
              onRetry={
                districtId !== 0 && organizationTypeId !== 0 && orgsQ.isError
                  ? () => orgsQ.refetch()
                  : undefined
              }
              retryText={t("common.retry")}
            />
          )}
        />

        <Button
          type="submit"
          isDisabled={isContinueDisabled}
          className={cn(
            "w-full h-fit rounded-xl font-medium text-sm mt-3 lg:mt-5 lg:text-xl py-3 lg:py-4.5",
            isContinueDisabled
              ? "bg-[#EEEEEE] text-[#A9A9A9]"
              : "bg-blue-700 text-white"
          )}
        >
          {t("signUpWorkForm.continue")}
        </Button>
      </Form>
    </div>
  );
};
