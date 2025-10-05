import { NextResponse } from "next/server";
import { List } from "@/models/listSchema";
import { protectRoute } from "@/lib/auth-helpers";
import { handleAuthError } from "@/lib/error";

export async function POST(req: Request) {
  try {
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
    handleAuthError(error);
  }
}
