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
  type LoginUserType = {
    password: string;
    email: string;
  };

  type CreateUserType = {
    username: string;
    confirmPassword: string;
  } & LoginUserType;

  type UserType = {
    _id: string;
    username: string;
    email: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    __v: number;
  } & mongoose.Document;

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

  type ValidatedCreatableSelectProps<
    TFieldValues extends FieldValues = FieldValues
  > = {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    label?: string;
    rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
    placeholder?: string;
    multiple?: boolean;
    options?: { label: string; value: string }[];
  };

  //-- UI
  type MenuProps = {
    name: string;
    path: string;
    icon: React.ReactElement;
    isActive: boolean;
  };

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
