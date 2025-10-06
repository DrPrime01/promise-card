import { connectToDb } from "@/db";
import { List } from "@/models/listSchema";
import { NextRequest, NextResponse } from "next/server";

// THIS ENDPOINT IS A PUBLIC-FACING ENDPOINT

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; itemID: string }> }
) {
  try {
    await connectToDb();

    const { id, itemID } = await params;

    const list = await List.findOne({ shareableId: id });

    if (!list) {
      return NextResponse.json(
        { success: false, message: "This card does not exist." },
        { status: 404 }
      );
    }

    const item = list.items.id(itemID);

    if (!item) {
      return NextResponse.json(
        { success: false, message: "This item does not exist." },
        { status: 404 }
      );
    }

    if (item.isPromised) {
      return NextResponse.json(
        { success: false, message: "This item has already been promised." },
        { status: 400 }
      );
    }

    const { isPromised, promisedBy } = await req.json();

    if (!promisedBy) {
      return NextResponse.json(
        { success: false, message: "A giver's name is required." },
        { status: 400 }
      );
    }

    item.isPromised = isPromised;
    item.promisedBy = promisedBy;

    await list.save();

    return NextResponse.json(
      { success: true, message: "Promise made successfully" },
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
