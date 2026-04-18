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
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : "text";
    return (
      <Field className="flex flex-col w-full gap-y-2">
        <FieldLabel
          htmlFor={name}
          className={`text-[10px] leading-[15px] font-noto-serif uppercase ${
            darkLabel ? "text-grey-900" : "text-brown"
          }`}
        >
          {label}
        </FieldLabel>
        <FieldContent className="flex relative rounded-lg">
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
            className="read-only:bg-[#F8F8F8] outline-none py-4.5 px-5 bg-input-field focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 border-none text-brown placeholder:text-brown/40 flex-1"
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
  },
);

export default BaseInput;
