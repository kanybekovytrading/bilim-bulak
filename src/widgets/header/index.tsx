import { Button } from "@heroui/react";
import { LangSwitcher } from "@/shared/ui/lang-switcher";
import { Logo } from "@/shared/ui/logo";

export const Header = () => {
  return (
    <header className="w-full sticky top-0 bg-white z-50">
      <div className="max-w-400 m-auto p-5 flex justify-between items-center">
        <Logo />

        <div className="flex items-center gap-4">
          <LangSwitcher />

          <Button className="bg-blue-700 rounded-xl font-medium text-xl py-4 px-5 h-fit w-fit">
            Кирүү
          </Button>
        </div>
      </div>
    </header>
  );
};
