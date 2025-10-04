/* eslint-disable react/display-name */
"use client";
import { ForwardedRef, forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";

const BaseInput = forwardRef(
  (
    {
      label,
      name,
      type,
      placeholder,
      value,
      readOnly,
      onChange,
      onBlur,
      darkLabel,
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : "text";
    return (
      <Field className="flex flex-col w-full gap-y-2">
        <FieldLabel
          htmlFor={name}
          className={`text-base font-medium ${
            darkLabel ? "text-grey-900" : "text-[#00051D74]"
          }`}
        >
          {label}
        </FieldLabel>
        <FieldContent className="flex relative border border-[#0009321F] rounded-md">
          <Input
            ref={ref}
            name={name}
            id={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={readOnly}
            className="read-only:bg-[#F8F8F8] outline-none py-2 focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 border-none text-sm placeholder:text-[#00051D74] text-[#00051D] flex-1"
          />
          {type === "password" && (
            <button
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute top-1/2 -translate-y-1/2 right-4"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          )}
        </FieldContent>
      </Field>
    );
  }
);

export default BaseInput;
