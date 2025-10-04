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
}
