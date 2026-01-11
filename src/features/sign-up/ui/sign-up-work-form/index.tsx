"use client";
import { useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, cn, Form } from "@heroui/react";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { SignUpWorkSchema } from "@/entities/sign-up/model/schemas";
import type { SignUpWorkFormValues } from "@/entities/sign-up/model/types";
import { SelectField } from "@/shared/ui/select-field";
import {
  useGetRegions,
  useGetDistricts,
  useGetOrganizationTypes,
  useGetOrganizations,
  useRegister,
} from "@/entities/sign-up/model/api/queries";
import { useSignUpWorkUiState } from "../../lib/hooks/useSignUpWorkUiState";
import { useCascadeReset } from "../../lib/hooks/useCascadeReset";

export const SignUpWorkForm = () => {
  const t = useTranslations();

  const locale = useLocale() as "kg" | "ru";

  const firstStep = useSignUpStore((s) => s.firstStep);
  const secondStep = useSignUpStore((s) => s.secondStep);
  const setSecondStep = useSignUpStore((s) => s.setSecondStep);

  const registerM = useRegister();

  const defaultValues = useMemo<SignUpWorkFormValues>(
    () => ({
      regionId: secondStep?.regionId ?? 0,
      districtId: secondStep?.districtId ?? 0,
      organizationTypeId: secondStep?.organizationTypeId ?? 0,
      organizationId: secondStep?.organizationId ?? 0,
    }),
    [secondStep]
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpWorkFormValues>({
    resolver: zodResolver(SignUpWorkSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const values = useWatch({ control }) as SignUpWorkFormValues;

  useEffect(() => {
    setSecondStep(values);
  }, [values, setSecondStep]);

  const regionId = useWatch({ control, name: "regionId" });
  const districtId = useWatch({ control, name: "districtId" });
  const organizationTypeId = useWatch({ control, name: "organizationTypeId" });
  const organizationId = useWatch({ control, name: "organizationId" });

  const regionsQ = useGetRegions();
  const districtsQ = useGetDistricts(regionId);
  const orgTypesQ = useGetOrganizationTypes();
  const orgsQ = useGetOrganizations(districtId, organizationTypeId);

  useCascadeReset({
    regionId,
    districtId,
    organizationTypeId,
    setValue,
  });

  const ui = useSignUpWorkUiState({
    regionId,
    districtId,
    organizationTypeId,
    organizationId,
    regionsQ,
    districtsQ,
    orgTypesQ,
    orgsQ,
    isSubmitting,
    isRegisterPending: registerM.isPending,
  });

  const onSubmit = async (formValues: SignUpWorkFormValues) => {
    setSecondStep(formValues);

    if (!firstStep) return;

    const payload = {
      fullName: firstStep.fullName,
      phone: firstStep.phone,
      password: firstStep.password,
      ...formValues,
    };

    try {
      const res = await registerM.mutateAsync(payload);
      console.log("REGISTER OK:", res);
    } catch (e) {
      console.error("REGISTER ERROR:", e);
    }
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
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
              loadErrorMessage={
                regionsQ.isError ? t("common.loadError") : undefined
              }
              isDisabled={ui.isSubmittingAny || ui.regionsBlocked}
              onRetry={
                !ui.isSubmittingAny && regionsQ.isError
                  ? () => regionsQ.refetch()
                  : undefined
              }
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
              isDisabled={ui.isSubmittingAny || ui.districtsBlocked}
              onRetry={
                !ui.isSubmittingAny && regionId !== 0 && districtsQ.isError
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
              isInvalid={!!fieldState.error}
              errorMessage={
                fieldState.error?.message
                  ? t(fieldState.error.message)
                  : undefined
              }
              loadErrorMessage={
                orgTypesQ.isError ? t("common.loadError") : undefined
              }
              isDisabled={ui.isSubmittingAny || ui.orgTypesBlocked}
              onRetry={
                !ui.isSubmittingAny && orgTypesQ.isError
                  ? () => orgTypesQ.refetch()
                  : undefined
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
              isDisabled={ui.isSubmittingAny || ui.orgsBlocked}
              onRetry={
                !ui.isSubmittingAny &&
                districtId !== 0 &&
                organizationTypeId !== 0 &&
                orgsQ.isError
                  ? () => orgsQ.refetch()
                  : undefined
              }
              retryText={t("common.retry")}
            />
          )}
        />

        {registerM.isError && (
          <div className="ml-2 flex items-center gap-2">
            <p className="text-xs lg:text-sm text-red-500">
              {t("common.requestError")}
            </p>

            <Button
              type="button"
              onClick={() => registerM.reset()}
              variant="ghost"
              size="sm"
              className="px-0 min-w-0 h-auto text-xs lg:text-sm text-blue-700 hover:bg-inherit"
            >
              {t("common.retry")}
            </Button>
          </div>
        )}

        <Button
          type="submit"
          isDisabled={ui.isContinueDisabled}
          className={cn(
            "w-full h-fit rounded-xl font-medium text-sm mt-3 lg:mt-5 lg:text-xl py-3 lg:py-4.5",
            ui.isContinueDisabled
              ? "bg-[#EEEEEE] text-[#A9A9A9]"
              : "bg-blue-700 text-white"
          )}
        >
          {registerM.isPending
            ? t("common.loading")
            : t("signUpWorkForm.continue")}
        </Button>
      </Form>
    </div>
  );
};
