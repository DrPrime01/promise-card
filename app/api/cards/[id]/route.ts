import { connectToDb } from "@/db";
import { List } from "@/models/listSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDb();

    const { id } = await params;
    const list = await List.findOne({ shareableId: id });
    if (!list) {
      return NextResponse.json(
        { success: false, message: "This list does not exist" },
        { status: 404 }
      );
    }

    if (!list.active) {
      return NextResponse.json(
        { success: false, message: "This list is currently inactive" },
        { status: 400 }
      );
    }

    const listObject = list.toObject();
    delete listObject.owner;

    return NextResponse.json(
      {
        success: true,
        message: "List retrieved successfully",
        list: listObject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
