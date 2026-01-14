"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { OtpForm } from "@/features/otp/ui/otp-form";
import { useOtpPageGuard } from "@/features/otp/lib/hooks/useOtpPageGuard";
import { BackButton } from "@/shared/ui/back-button";

const Otp = () => {
  const t = useTranslations();

  const { isAllowed } = useOtpPageGuard();

  if (!isAllowed) return null;

  return (
    <section className="max-w-400 m-auto p-4 lg:p-5">
      <BackButton />

      <div className="mt-8 lg:mt-11.5 lg:flex items-start justify-between gap-10 lg:px-20">
        <OtpForm />

        <div className="flex-col items-center hidden lg:flex">
          <Image
            src="/images/otp.webp"
            alt="Otp"
            width={472}
            height={472}
          />

          <h2 className="text-3xl font-semibold mt-10 text-center">
            {t("otpPage.title")}
          </h2>

          <p className="font-medium text-neutral-500 mt-4 text-center text-balance max-w-181">
            {t("otpPage.text")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Otp;
