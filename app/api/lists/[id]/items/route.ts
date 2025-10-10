import { NextResponse, NextRequest } from "next/server";
import { List } from "@/models/listSchema";
import { protectRoute } from "@/lib/auth-helpers";
import { handleApiError } from "@/lib/error";
import { connectToDb } from "@/db";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDb();

    const userId = protectRoute(req);

    const { id: listId } = await params;
    const newItems = await req.json();

    if (!Array.isArray(newItems) || newItems.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Request body must be a non-empty array of items.",
        },
        { status: 400 }
      );
    }

    const list = await List.findById(listId);
    if (!list) {
      return NextResponse.json(
        { success: false, message: "This list does not exist." },
        { status: 404 }
      );
    }

    if (list.owner.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: "Forbidden: You do not own this list" },
        { status: 403 }
      );
    }

    list.items.push(...newItems);
    await list.save();

    return NextResponse.json(
      { success: true, message: "Item added successfully", list },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
