import { NextResponse } from "next/server";

import { connectToDb } from "@/db";
import { User } from "@/models/userSchema";
import { createAuthResponse } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as LoginUserType;

  try {
    await connectToDb();

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return NextResponse.json(
        { success: false, message: "Incorrect email or password" },
        { status: 401 }
      );
    }

    return createAuthResponse(user, "Login successful");
  } catch (error) {
    if (error instanceof Error) {
      // Handle the duplicate key error from Mongoose
      if (error.message.includes("E11000 duplicate key error")) {
        return NextResponse.json(
          {
            success: false,
            message: "A user with this email or username already exists.",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    console.error(error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
