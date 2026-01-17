import { useTranslations } from "next-intl";
import { CircleX } from "lucide-react";

interface Props {
  onFinishClick: () => void;
}

export const TestTopBar = ({ onFinishClick }: Props) => {
  const t = useTranslations();

  return (
    <div className="w-full flex justify-end max-w-400 m-auto py-5 px-5">
      <button
        type="button"
        onClick={onFinishClick}
        className="flex items-center gap-2 font-medium text-sm md:text-xl text-red-500 cursor-pointer"
      >
        {t("tests.finishTest")}
        <CircleX color="#fb2c36" />
      </button>
    </div>
  );
};
