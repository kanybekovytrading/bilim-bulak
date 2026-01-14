import Image from "next/image";
import { useTranslations } from "next-intl";
import { SignInForm } from "@/features/sign-in/ui/sign-in-form";
import { BackButton } from "@/shared/ui/back-button";

const SignIn = () => {
  const t = useTranslations();

  return (
    <section className="max-w-400 m-auto p-4 lg:p-5">
      <BackButton />

      <div className="mt-8 lg:mt-11.5 lg:flex items-start justify-between gap-10 lg:px-20">
        <SignInForm />

        <div className="flex-col items-center hidden lg:flex">
          <Image
            src="/images/sign-in.webp"
            alt="Sign In"
            width={472}
            height={472}
          />

          <h2 className="text-3xl font-semibold mt-10 text-center">
            {t("signInPage.title")}
          </h2>

          <p className="font-medium text-neutral-500 mt-4 text-center text-balance max-w-181">
            {t("signInPage.text")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
