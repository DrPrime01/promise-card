"use server";

import { connectToDb } from "@/db";
import { setAuthCookie } from "@/lib/auth-helpers";
import { handleActionAuthError } from "@/lib/error";
import { User } from "@/models/userSchema";

export async function signUp(body: CreateUserType) {
  try {
    await connectToDb();

    const newUser = await User.create(body);

    let userObject = newUser.toObject ? newUser.toObject() : newUser;
    delete userObject.password;

    userObject = JSON.parse(JSON.stringify(userObject));

    await setAuthCookie(userObject?._id);

    return {
      success: true,
      status: 201,
      message: "User created successfully",
      user: userObject,
    };
  } catch (error) {
    handleActionAuthError(error);
  }
}

export async function login(body: LoginUserType) {
  try {
    const { email, password } = body;

    await connectToDb();

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return {
        success: false,
        status: 401,
        message: "Incorrect email or password",
      };
    }

    let userObject = user.toObject ? user.toObject() : user;
    delete userObject.password;

    userObject = JSON.parse(JSON.stringify(userObject));

    await setAuthCookie(userObject?._id);

    return {
      success: true,
      status: 201,
      message: "Login successful",
      user: userObject,
    };
  } catch (error) {
    handleActionAuthError(error);
  }
}
