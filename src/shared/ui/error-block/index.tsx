import { Button } from "@heroui/react";
import { useTranslations } from "next-intl";

export const ErrorBlock = ({ refetch, className }) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <h2 className="font-semibold text-xl md:text-2xl">
        {t("common.loadError")}
      </h2>

      <Button
        onClick={() => refetch()}
        className="bg-blue-700 rounded-xl font-medium text-sm md:text-base py-3 px-5 h-fit w-fit"
      >
        {t("common.retry")}
      </Button>
    </div>
  );
};
