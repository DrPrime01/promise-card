"use server";

import { connectToDb } from "@/db";
import { handleActionError } from "@/lib/error";
import { List } from "@/models/listSchema";

export async function markItemAsPromised(body: MarkItemAsPromisedType) {
  try {
    const { shareableId, itemId, isPromised, promisedBy } = body;

    await connectToDb();

    const list = await List.findOne({ shareableId });
    if (!list) {
      return {
        success: false,
        status: 404,
        message: "This card does not exist.",
      };
    }

    const item = list.items.id(itemId);

    if (!item) {
      return {
        success: false,
        status: 404,
        message: "This item does not exist.",
      };
    }

    if (item.isPromised) {
      return {
        success: false,
        status: 400,
        message: "This item has already been promised.",
      };
    }

    if (!promisedBy) {
      return {
        success: false,
        status: 400,
        message: "The giver's name is required.",
      };
    }

    item.isPromised = isPromised;
    item.promisedBy = promisedBy;

    await list.save();

    return { success: true, status: 200, message: "Promise made successfully" };
  } catch (error) {
    handleActionError(error);
  }
}
