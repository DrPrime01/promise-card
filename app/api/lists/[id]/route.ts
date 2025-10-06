import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/db";
import { List } from "@/models/listSchema";
import { protectRoute } from "@/lib/auth-helpers";
import { handleApiError } from "@/lib/error";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDb();
    const userId = protectRoute(req);

    const { id: listId } = await params;
    const list = await List.findOne({ _id: listId, owner: userId });

    if (!list) {
      return NextResponse.json(
        { success: false, message: "List not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "List retrieved successfully",
        list,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
