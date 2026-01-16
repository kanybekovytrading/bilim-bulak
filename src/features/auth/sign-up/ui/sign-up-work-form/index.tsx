import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button, cn, Form } from "@heroui/react";
import { useSignUpWorkDictionaries } from "@/entities/auth/sign-up/model/hooks/useSignUpWorkDictionaries";
import { Locale } from "@/shared/types";
import { useSignUpWorkForm } from "../../lib/hooks/useSignUpWorkForm";
import { useCascadeReset } from "../../lib/hooks/useCascadeReset";
import { useSignUpWorkSubmit } from "../../lib/hooks/useSignUpWorkSubmit";
import { useSignUpWorkUiState } from "../../lib/hooks/useSignUpWorkUiState";
import { SignUpWorkSelectsSection } from "../sign-up-work-selects-section";

export const SignUpWorkForm = () => {
  const router = useRouter();

  const t = useTranslations();

  const locale = useLocale() as Locale;

  const {
    control,
    handleSubmit,
    setValue,
    isSubmitting,
    regionId,
    districtId,
    organizationTypeId,
    organizationId,
  } = useSignUpWorkForm();

  const dicts = useSignUpWorkDictionaries({
    regionId,
    districtId,
    organizationTypeId,
  });

  useCascadeReset({
    regionId,
    districtId,
    organizationTypeId,
    setValue,
  });

  const { registerM, onSubmit } = useSignUpWorkSubmit();

  const ui = useSignUpWorkUiState({
    regionId,
    districtId,
    organizationTypeId,
    organizationId,
    regionsQ: dicts.regionsQ,
    districtsQ: dicts.districtsQ,
    orgTypesQ: dicts.orgTypesQ,
    orgsQ: dicts.orgsQ,
    isSubmitting,
    isRegisterPending: registerM.isPending,
  });

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
        <SignUpWorkSelectsSection
          control={control}
          t={t}
          locale={locale}
          regionId={regionId}
          districtId={districtId}
          organizationTypeId={organizationTypeId}
          dicts={dicts}
          ui={{
            isSubmittingAny: ui.isSubmittingAny,
            regionsBlocked: ui.regionsBlocked,
            districtsBlocked: ui.districtsBlocked,
            orgTypesBlocked: ui.orgTypesBlocked,
            orgsBlocked: ui.orgsBlocked,
          }}
        />

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
