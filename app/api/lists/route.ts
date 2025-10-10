import { connectToDb } from "@/db";
import { protectRoute } from "@/lib/auth-helpers";
import { handleApiError } from "@/lib/error";
import { List } from "@/models/listSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const userId = protectRoute(req);

    const { searchParams } = req.nextUrl;
    const limit = searchParams.get("limit");

    const limitValue = limit ? parseInt(limit, 10) : 10;

    const lists = await List.find({ owner: userId })
      .sort({
        createdAt: -1,
      })
      .limit(limitValue);

    return NextResponse.json(
      { success: true, message: "Lists fetched successfully", lists },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
