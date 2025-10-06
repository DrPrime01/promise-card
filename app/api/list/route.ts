import { NextResponse, NextRequest } from "next/server";
import { List } from "@/models/listSchema";
import { protectRoute } from "@/lib/auth-helpers";
import { handleApiError } from "@/lib/error";
import { connectToDb } from "@/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const userId = protectRoute(req);

    const { title, occasion } = await req.json();

    if (!title || !occasion) {
      return NextResponse.json(
        { success: false, message: "Title/Occasion is a required field" },
        { status: 400 }
      );
    }

    const newList = await List.create({
      title,
      occasion,
      owner: userId,
    });
    return NextResponse.json(
      {
        success: true,
        message: "List created successfully",
        list: newList,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}
