"use client";
import { useTranslations } from "next-intl";
import { Button, Form, cn } from "@heroui/react";
import { useSignUpStore } from "@/entities/sign-up/model/store";
import { formatKgPhone } from "@/shared/lib/utils/helpers";

export const OtpForm = () => {
  const t = useTranslations();

  const phone = useSignUpStore((s) => s.firstStep?.phone);

  const isConfirmDisabled = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SUBMIT OTP (later)");
  };

  return (
    <div className="flex flex-col items-center lg:min-w-118">
      <h1 className="text-3xl lg:text-4xl font-semibold">
        {t("otpPage.formTitle")}
      </h1>

      <p className="text-blue-700 text-base lg:text-xl font-medium mt-2 text-center">
        {t("otpPage.formDescription", { phone: formatKgPhone(phone) })}
      </p>

      <Form
        className="mt-8 lg:mt-10 w-full flex flex-col gap-4 lg:gap-5"
        onSubmit={handleSubmit}
      >
        <Button
          type="button"
          onClick={() => console.log("Wrong number (later)")}
          variant="ghost"
          size="sm"
          className="px-0 min-w-0 text-center w-full h-auto hover:bg-transparent font-medium text-sm lg:text-xl text-blue-700"
        >
          {t("otpPage.wrongNumber")}
        </Button>

        <Button
          type="submit"
          isDisabled={isConfirmDisabled}
          className={cn(
            "w-full h-fit rounded-xl font-medium text-sm lg:text-xl py-3 lg:py-4.5",
            isConfirmDisabled
              ? "bg-[#EEEEEE] text-[#A9A9A9]"
              : "bg-blue-700 text-white"
          )}
        >
          {t("otpPage.confirm")}
        </Button>

        <Button
          type="button"
          onClick={() => console.log("Resend (later)")}
          variant="ghost"
          size="sm"
          className="px-0 min-w-0 w-full h-auto hover:bg-transparent mt-3 flex items-center justify-center gap-2 font-medium text-sm lg:text-xl"
        >
          <span className="text-neutral-500">{t("otpPage.resendLabel")}</span>
          <span className="text-blue-700">00:59</span>
        </Button>
      </Form>
    </div>
  );
};
