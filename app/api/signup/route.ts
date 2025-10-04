import { connectToDb } from "@/db";
import { User } from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json()) as CreateUserType;
  try {
    await connectToDb();

    const newUser = new User(body);
    await newUser.save();
    return NextResponse.json(
      { success: true, message: "User created" },
      { status: 201 }
    );
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
