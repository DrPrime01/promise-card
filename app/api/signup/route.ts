import { connectToDb } from "@/db";
import { User } from "@/models/userSchema";
import { createAuthResponse } from "@/lib/auth-helpers";
import { handleAuthError } from "@/lib/error";

export async function POST(req: Request) {
  const body = (await req.json()) as CreateUserType;
  try {
    await connectToDb();

    const newUser = await User.create(body);

    return createAuthResponse(newUser, "User created successfully");
  } catch (error) {
    handleAuthError(error);
  }
}
