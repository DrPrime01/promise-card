import { NextResponse } from "next/server";

import { connectToDb } from "@/db";
import { User } from "@/models/userSchema";
import { createAuthResponse } from "@/lib/auth-helpers";
import { handleAuthError } from "@/lib/error";

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
    handleAuthError(error);
  }
}
