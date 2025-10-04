import { Control, FieldValues, RegisterOptions, Path } from "react-hook-form";
import mongoose from "mongoose";

export {};

declare global {
  // Schema
  export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    passwordChangedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;
  }

  // API
  type CreateUserType = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  // components
  //- forms
  //-- Base Forms
  type InputProps = {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    readOnly?: boolean;
    darkLabel?: boolean;
    description?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>;

  //-- Validated Forms
  type ValidatedInputProps<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
    description?: string;
    numberOfBoxes?: number;
    readOnly?: boolean;
  } & Omit<InputProps, "name">;

  // Errors
  type ErrorType = {
    data: {
      code: number;
      message: string;
      detail: string;
    };
    status: number | string;
    message: string;
  };
}
