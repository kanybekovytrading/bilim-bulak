import { useTranslations } from "next-intl";
import { Button, Chip } from "@heroui/react";
import { CircleQuestionMark, Clock } from "lucide-react";
import {
  TEST_STATUS_CHIP_COLOR,
  TEST_STATUS_I18N_KEY,
  TestItem,
} from "@/shared/types";

interface Props {
  test: TestItem;
  isPaying?: boolean;
  onPay: (testId: number) => void;
}

export const TestCard = ({ test, isPaying = false, onPay }: Props) => {
  const t = useTranslations();

  const status = test.status;

  return (
    <div className="bg-white rounded-3xl max-w-86.5 p-4 md:basis-[calc(50%-1rem)] lg:basis-0 lg:flex-1 h-full flex flex-col">
      <Chip className="w-fit" color={TEST_STATUS_CHIP_COLOR[status]}>
        {t(TEST_STATUS_I18N_KEY[status])}
      </Chip>

      <h3 className="font-semibold mt-2 text-xl md:text-2xl">{test.title}</h3>

      <p className="font-medium text-neutral-500 mt-2">{test.description}</p>

      <div className="flex items-center gap-8 mt-6 font-medium">
        <div className="flex items-center gap-1">
          <Clock />
          <span>{t("testsPage.minutes", { value: test.timerMinutes })}</span>
        </div>

        <div className="flex items-center gap-1">
          <CircleQuestionMark />
          <span>{t("testsPage.questions", { value: test.questionCount })}</span>
        </div>
      </div>

      <p className="mt-6 font-medium text-neutral-500">
        {t("testsPage.priceLabel")}
        <span className="text-xl md:text-2xl text-blue-700">
          {" "}
          {test.status === "AVAILABLE" ? `${test.price}с` : "-"}
        </span>
      </p>

      <div className="h-5" />

      <Button
        className="bg-blue-700 mt-auto rounded-xl w-full font-medium text-sm md:text-xl py-3.5 md:py-6"
        isDisabled={isPaying}
        onClick={() => onPay(test.id)}
      >
        {isPaying ? t("common.loading") : t("testsPage.pay")}
      </Button>
    </div>
  );
};
