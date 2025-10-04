import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectToDb } from "@/db";
import { User } from "@/models/userSchema";
import { ONE_WEEK } from "@/constants";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  const body = (await req.json()) as CreateUserType;
  try {
    await connectToDb();

    const newUser = new User(body);
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1w",
    });
    const response = NextResponse.json(
      { success: true, message: "User created", token, user: newUser },
      { status: 201 }
    );

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: ONE_WEEK,
      path: "/",
    });
    response.headers.set("Set-Cookie", cookie);

    return response;
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
