import { Button, cn } from "@heroui/react";
import { useTranslations } from "next-intl";

type Props = {
  refetch: () => void | Promise<unknown>;
  className?: string;
  titleKey?: string;
};

export const ErrorBlock = ({
  refetch,
  className,
  titleKey = "common.loadError",
}: Props) => {
  const t = useTranslations();

  return (
    <div
      className={cn("flex flex-col items-center text-center gap-3", className)}
    >
      <h2 className="font-semibold text-xl md:text-2xl">{t(titleKey)}</h2>

      <Button
        type="button"
        onClick={() => refetch()}
        className="bg-blue-700 rounded-xl font-medium text-sm md:text-base py-3 px-5 h-fit w-fit"
      >
        {t("common.retry")}
      </Button>
    </div>
  );
};
