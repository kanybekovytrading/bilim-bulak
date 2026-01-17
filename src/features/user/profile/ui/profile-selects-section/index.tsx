import { useTranslations } from "next-intl";
import { Control, Controller } from "react-hook-form";
import type { UseQueryResult } from "@tanstack/react-query";
import { ProfileFormValues } from "@/entities/user/profile/model/types";
import { SelectField } from "@/shared/ui/select-field";
import type { DictionaryItem, District, Organization } from "@/shared/types";

interface Props {
  control: Control<ProfileFormValues>;
  regionId: number;
  districtId: number;
  organizationTypeId: number;
  isSubmittingAny: boolean;
  dicts: {
    regionsQ: UseQueryResult<DictionaryItem[], unknown>;
    districtsQ: UseQueryResult<District[], unknown>;
    orgTypesQ: UseQueryResult<DictionaryItem[], unknown>;
    orgsQ: UseQueryResult<Organization[], unknown>;
  };
}

export const ProfileSelectsSection = ({
  dicts,
  regionId,
  districtId,
  organizationTypeId,
  control,
  isSubmittingAny,
}: Props) => {
  const { regionsQ, districtsQ, orgTypesQ, orgsQ } = dicts;

  const t = useTranslations();

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
            isDisabled={isSubmittingAny}
            onRetry={
              !isSubmittingAny && regionsQ.isError
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
            isDisabled={isSubmittingAny || regionId === 0}
            onRetry={
              !isSubmittingAny && regionId !== 0 && districtsQ.isError
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
            isDisabled={isSubmittingAny}
            onRetry={
              !isSubmittingAny && orgTypesQ.isError
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
            isDisabled={
              isSubmittingAny || districtId === 0 || organizationTypeId === 0
            }
            onRetry={
              !isSubmittingAny &&
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
