import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import BaseInput from "../base/input-field";

export default function ValidatedInput<
  TFieldValues extends FieldValues = FieldValues
>({ control, name, rules, ...otherProps }: ValidatedInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <BaseInput {...field} {...otherProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
