"use client";
import Image from "next/image";
import { ForgotPasswordForm } from "@/features/forgot-password/ui/forgot-password-form";
import { BackButton } from "@/shared/ui/back-button";

const ForgotPassword = () => {
  return (
    <section className="max-w-400 m-auto p-4 lg:p-5">
      <BackButton />

      <div className="mt-8 lg:mt-11.5 flex flex-col items-center justify-between">
        <ForgotPasswordForm />

        <Image
          className="hidden lg:inline-block"
          src="/images/forgot-password.webp"
          alt="Forgot Password"
          width={472}
          height={472}
        />
      </div>
    </section>
  );
};

export default ForgotPassword;
