import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useSignUpStore } from "@/entities/sign-up/model/store";
import { useRegister } from "@/entities/sign-up/model/api/queries";
import type { SignUpWorkFormValues } from "@/entities/sign-up/model/types";

export const useSignUpWorkSubmit = () => {
  const router = useRouter();

  const firstStep = useSignUpStore((s) => s.firstStep);
  const setSecondStep = useSignUpStore((s) => s.setSecondStep);

  const registerM = useRegister();

  const t = useTranslations();

  const onSubmit = async (formValues: SignUpWorkFormValues) => {
    setSecondStep(formValues);

    if (!firstStep) return;

    const payload = {
      phone: firstStep.phone,
      password: firstStep.password,
      ...formValues,
    };

    router.push("/auth/otp");

    // await toast.promise(registerM.mutateAsync(payload), {
    //   loading: "Отправляем...",
    //   success: (res) => {
    //     router.push("/auth/otp");
    //     return t("common.codeSent");
    //   },
    //   error: (err) => {
    //     const message = err.response.data.message;

    //     if (message === "Phone already registered") {
    //       return t("common.phoneAlreadyRegistered");
    //     }

    //     return t("common.registerError");
    //   },
    // });
  };

  return { registerM, onSubmit };
};
