import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { toast } from "sonner";

export const handleError = (err: unknown) => {
  const error = err as ErrorType;
  if (error?.status === "FETCH_ERROR") {
    toast.error("Please check your connection and try again...");
  } else {
    toast.error(
      error?.data?.message ??
        error?.message ??
        "An error occured. Please try again later"
    );
  }
};

export function handleApiError(error: unknown) {
  console.log(error, "error.ts");
  if (error instanceof Error) {
    // Handle specific errors we throw from our helpers
    if (error.message.startsWith("401 Unauthorized")) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

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

  if (error instanceof jwt.JsonWebTokenError) {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }

  console.error(error);
  return NextResponse.json(
    { success: false, message: "An internal server error occurred" },
    { status: 500 }
  );
}
