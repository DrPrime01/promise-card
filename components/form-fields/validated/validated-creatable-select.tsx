"use client";
import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CreatableSelect } from "../base/creatable-select";

export default function ValidatedCreatableSelect<
  TFieldValues extends FieldValues = FieldValues
>({
  control,
  name,
  rules,
  ...otherProps
}: ValidatedCreatableSelectProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <CreatableSelect
              {...otherProps}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
