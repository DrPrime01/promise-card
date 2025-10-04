import { NextResponse } from "next/server";

import { connectToDb } from "@/db";
import { User } from "@/models/userSchema";
import { createAuthResponse } from "@/lib/auth-helpers";

export async function POST(req: Request) {
  const body = (await req.json()) as CreateUserType;
  try {
    await connectToDb();

    const newUser = new User(body);
    await newUser.save();

    return createAuthResponse(newUser, "User created successfully");
  } catch (error) {
    if (error instanceof Error) {
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
