"use client";
import { type ComponentProps, useState } from "react";
import { InputGroup, Label, TextField, cn } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  inputProps?: ComponentProps<typeof InputGroup.Input>;
};

export const PasswordInputField = ({
  name,
  label,
  placeholder = "••••••••",
  errorMessage,
  className,
  inputClassName,
  inputProps,
}: Props) => {
  const [show, setShow] = useState(false);

  return (
    <TextField name={name} className={className}>
      <Label className="w-fit text-sm lg:text-base text-neutral-500 font-medium ml-2">
        {label}
      </Label>

      <div className="relative">
        <InputGroup.Input
          {...inputProps}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={cn(
            "placeholder:text-[#A9A9A9] w-full focus:border-blue-700 py-3.5 px-4 pr-12 font-medium text-sm lg:text-xl bg-[#F5F5F5] rounded-lg",
            inputClassName
          )}
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
          tabIndex={-1}
        >
          {show ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
      </div>

      {errorMessage && (
        <p className="text-xs lg:text-sm text-red-500 mt-1 ml-2">
          {errorMessage}
        </p>
      )}
    </TextField>
  );
};
