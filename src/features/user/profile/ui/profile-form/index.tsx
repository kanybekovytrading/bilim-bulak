"use client";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, cn } from "@heroui/react";
import { useDictionaries } from "@/entities/auth/dictionaries/model/hooks/useDictionaries";
import { ProfileFormValues } from "@/entities/user/profile/model/types";
import { ProfileSchema } from "@/entities/user/profile/model/schemas";
import { PhoneInputField } from "@/shared/ui/phone-input-field";
import { ProfileSelectsSection } from "../profile-selects-section";

export const ProfileForm = () => {
  const t = useTranslations();

  const defaultValues = useMemo<ProfileFormValues>(
    () => ({
      phone: "996",
      regionId: 0,
      districtId: 0,
      organizationTypeId: 0,
      organizationId: 0,
    }),
    []
  );

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues,
    mode: "onChange",
  });

  const isContinueDisabled = isSubmitting || !isValid;

  const regionId = useWatch({ control, name: "regionId" });
  const districtId = useWatch({ control, name: "districtId" });
  const organizationTypeId = useWatch({ control, name: "organizationTypeId" });

  const dicts = useDictionaries({
    regionId,
    districtId,
    organizationTypeId,
  });

  const onSubmit = async (values: ProfileFormValues) => {
    console.log("PROFILE SUBMIT (later)", values);
  };

  return (
    <div className="flex flex-col items-center lg:max-w-118 w-full">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("common.profile")}
      </h1>

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

        <ProfileSelectsSection
          dicts={dicts}
          control={control}
          regionId={regionId}
          districtId={districtId}
          organizationTypeId={organizationTypeId}
          isSubmittingAny={isSubmitting}
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
