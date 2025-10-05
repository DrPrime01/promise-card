import { protectRoute } from "@/lib/auth-helpers";
import { handleAuthError } from "@/lib/error";
import { List } from "@/models/listSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const userId = protectRoute(req);

    const lists = await List.find({ owner: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      { success: true, message: "Lists fetched successfully", lists },
      { status: 200 }
    );
  } catch (error) {
    handleAuthError(error);
  }
}
