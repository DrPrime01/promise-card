import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { ONE_WEEK } from "@/constants";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function createAuthResponse(
  userDoc: UserType,
  message: string,
  status = 200
) {
  // Convert mongoose doc to plain object
  const userObject = userDoc.toObject ? userDoc.toObject() : userDoc;
  delete userObject.password;

  // Generate JWT
  const token = jwt.sign({ id: userDoc._id }, JWT_SECRET, {
    expiresIn: "1w",
  });

  const response = NextResponse.json(
    { success: true, message, user: userObject },
    { status }
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
}

export function protectRoute(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) {
    return NextResponse.json(
      {
        success: false,
        message: "User is unauthenticated",
      },
      { status: 401 }
    );
  }

  const token = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json(
      { success: false, message: "User is unauthenticated" },
      { status: 401 }
    );
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string" || !decoded.id) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }

  return decoded.id;
}
