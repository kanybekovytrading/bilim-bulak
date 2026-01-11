"use client";
import { Button, Label, ListBox, Select, cn, type Key } from "@heroui/react";
import { DictionaryItem } from "@/entities/sign-up/model/types";

interface Props {
  label: string;
  placeholder?: string;
  options: DictionaryItem[];
  locale: "kg" | "ru";
  value: number;
  onChange: (value: number) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  loadErrorMessage?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export const SelectField = ({
  label,
  placeholder,
  options,
  locale,
  value,
  onChange,
  isDisabled,
  isInvalid,
  errorMessage,
  loadErrorMessage,
  onRetry,
  retryText,
  className,
}: Props) => {
  const getLabel = (o: DictionaryItem) => {
    return locale === "ru" ? o.nameRu : o.nameKg;
  };

  const selectValue: Key | null = value === 0 ? null : String(value);

  const handleChange = (next: Key | null) => {
    if (next === null) return onChange(0);

    const num = Number(next);
    onChange(Number.isFinite(num) ? num : 0);
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
        {label}
      </Label>

      <Select
        aria-label={label}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        fullWidth
        value={selectValue}
        onChange={handleChange}
        className="mt-1"
      >
        <Select.Trigger
          className={cn(
            "w-full bg-[#F5F5F5] rounded-lg py-3.5 px-4 font-medium text-sm lg:text-xl",
            "border border-transparent",
            "flex items-center justify-between gap-3",
            "data-[focus-visible=true]:border-blue-700",
            "data-[disabled=true]:opacity-60"
          )}
        >
          <Select.Value
            className={cn(
              "flex-1 text-left font-medium text-sm lg:text-xl",
              "data-[placeholder=true]:text-[#A9A9A9]"
            )}
          />
          <Select.Indicator className="text-neutral-500" />
        </Select.Trigger>

        <Select.Popover className="mt-2">
          <ListBox>
            {options.map((o) => {
              const text = getLabel(o);
              const id = String(o.id);

              return (
                <ListBox.Item
                  className="text-neutral-600"
                  key={id}
                  id={id}
                  textValue={text}
                >
                  {text}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              );
            })}
          </ListBox>
        </Select.Popover>
      </Select>

      {errorMessage && (
        <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
          {errorMessage}
        </p>
      )}

      {loadErrorMessage && (
        <div className="mt-1 ml-2 flex items-center gap-2">
          <p className="text-xs lg:text-sm text-red-500">{loadErrorMessage}</p>

          {onRetry && (
            <Button
              type="button"
              onPress={onRetry}
              variant="ghost"
              size="sm"
              className="px-0 min-w-0 h-auto text-blue-700 hover:bg-inherit"
            >
              {retryText ?? "Retry"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
