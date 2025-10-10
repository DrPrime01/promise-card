import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { ONE_WEEK } from "@/constants";
import { cookies } from "next/headers";

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

export function protectRoute(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("401 Unauthorized: Token missing", {});
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (typeof decoded === "string" || !decoded.id) {
    throw new Error("401 Unauthorized: Invalid token payload");
  }

  return decoded.id;
}

// Actions
export async function setAuthCookie(userId: string) {
  const token = jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "1w",
  });
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: ONE_WEEK,
    path: "/",
  });
}

export async function getAuthenticatedUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("401 Unauthorized: Token missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string" || !decoded.id) {
      throw new Error("401 Unauthorized: Invalid token payload");
    }

    return decoded.id as string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("401 Unauthorized: Invalid token");
  }
}
