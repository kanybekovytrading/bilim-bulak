"use client";
import { Label, ListBox, Select, cn } from "@heroui/react";
import type { Key } from "@heroui/react";
import type { Region } from "@/entities/sign-up/model/types";

interface Props {
  label: string;
  placeholder?: string;
  options: Region[];
  locale: string;
  value: number | null;
  onChange: (value: number | null) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  className?: string;
}

const toSelectValue = (id: number | null) => (id === null ? null : String(id));

const toNumberOrNull = (key: Key | null) => {
  if (key === null) return null;
  const n = Number(key);
  return Number.isFinite(n) ? n : null;
};

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
  className,
}: Props) => {
  const getLabel = (o: Region) => (locale === "ru" ? o.nameRu : o.nameKg);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Select
        placeholder={placeholder}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        fullWidth
        value={toSelectValue(value)}
        onChange={(next) => onChange(toNumberOrNull(next))}
      >
        <Label>{label}</Label>

        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            {options.map((o) => {
              const text = getLabel(o);
              const id = String(o.id);

              return (
                <ListBox.Item key={id} id={id} textValue={text}>
                  {text}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              );
            })}
          </ListBox>
        </Select.Popover>
      </Select>

      {errorMessage && (
        <p className="text-xs lg:text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
