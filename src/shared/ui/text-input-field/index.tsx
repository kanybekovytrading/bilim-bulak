import type { ComponentProps } from "react";
import { InputGroup, Label, TextField, cn } from "@heroui/react";

interface Props {
  name: string;
  label: string;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  inputProps?: ComponentProps<typeof InputGroup.Input>;
}

export const TextInputField = ({
  name,
  label,
  errorMessage,
  className,
  inputClassName,
  inputProps,
}: Props) => (
  <TextField name={name} className={className}>
    <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
      {label}
    </Label>

    <InputGroup.Input
      {...inputProps}
      className={cn(
        "placeholder:text-[#A9A9A9] focus:border-blue-700 py-3.5 px-4 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg",
        inputClassName
      )}
    />

    {errorMessage && (
      <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
        {errorMessage}
      </p>
    )}
  </TextField>
);
