import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { LangSwitcher } from "@/shared/ui/lang-switcher";
import { Logo } from "@/shared/ui/logo";

export const Header = () => {
  const t = useTranslations();

  const router = useRouter();

  const navigateToSignUp = () => router.push(`/auth/sign-up`);

  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="max-w-400 m-auto py-3 px-4 md:p-5 flex justify-between items-center">
        <Logo />

        <div className="flex items-center gap-4">
          <LangSwitcher />

          <Button
            onClick={navigateToSignUp}
            className="bg-blue-700 rounded-xl font-medium text-sm md:text-xl py-3 px-4 md:py-4 md:px-5 h-fit w-fit"
          >
            {t("common.signUp")}
          </Button>
        </div>
      </div>
    </header>
  );
};
