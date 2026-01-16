import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import { MoveDown } from "lucide-react";

export const Welcome = () => {
  const t = useTranslations();

  return (
    <h1 className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl md:text-5xl text-center">
        {t("welcome.title", { name: "Данияр" })}
      </h1>

      <p className="text-center text-balance mt-3 text-sm md:text-xl font-medium text-neutral-500">
        {" "}
        {t("welcome.text")}
      </p>

      <Button className="bg-blue-700 flex items-center gap-2 mt-10 rounded-xl font-medium text-sm md:text-xl py-3 px-4 md:py-4 md:px-5 h-fit w-fit">
        {t("common.takeTest")} <MoveDown size={24} />
      </Button>
    </h1>
  );
};
