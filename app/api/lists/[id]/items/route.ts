import { NextResponse } from "next/server";
import { List } from "@/models/listSchema";
import { protectRoute } from "@/lib/auth-helpers";
import { handleAuthError } from "@/lib/error";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = protectRoute(req);

    const { id: listId } = await params;
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Item name is required" },
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

    list.items.push({ name });
    await list.save();

    return NextResponse.json(
      { success: true, message: "Item added successfully", list },
      { status: 200 }
    );
  } catch (error) {
    handleAuthError(error);
  }
}
