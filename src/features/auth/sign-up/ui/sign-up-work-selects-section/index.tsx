import { Controller, type Control } from "react-hook-form";
import type { UseQueryResult } from "@tanstack/react-query";
import type { SignUpWorkFormValues } from "@/entities/auth/sign-up/model/types";
import { SelectField } from "@/shared/ui/select-field";
import { DictionaryItem, District, Locale, Organization } from "@/shared/types";

interface Props {
  control: Control<SignUpWorkFormValues>;
  t: (key: string) => string;
  locale: Locale;
  regionId: number;
  districtId: number;
  organizationTypeId: number;
  dicts: {
    regionsQ: UseQueryResult<DictionaryItem[], unknown>;
    districtsQ: UseQueryResult<District[], unknown>;
    orgTypesQ: UseQueryResult<DictionaryItem[], unknown>;
    orgsQ: UseQueryResult<Organization[], unknown>;
  };
  ui: {
    isSubmittingAny: boolean;
    regionsBlocked: boolean;
    districtsBlocked: boolean;
    orgTypesBlocked: boolean;
    orgsBlocked: boolean;
  };
}

export const SignUpWorkSelectsSection = ({
  control,
  t,
  locale,
  regionId,
  districtId,
  organizationTypeId,
  dicts,
  ui,
}: Props) => {
  const { regionsQ, districtsQ, orgTypesQ, orgsQ } = dicts;

  return (
    <>
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
    </>
  );
};
