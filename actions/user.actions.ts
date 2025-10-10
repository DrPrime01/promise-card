"use server";

import { connectToDb } from "@/db";
import { getAuthenticatedUserId } from "@/lib/auth-helpers";
import { handleActionError } from "@/lib/error";
import { List } from "@/models/listSchema";

export async function createList(body: CreateListType) {
  try {
    const userId = await getAuthenticatedUserId();
    const { title, occasion } = body;

    if (!title || !occasion) {
      return {
        success: false,
        status: 400,
        message: "Title/Occasion is required",
      };
    }

    await connectToDb();

    const newList = await List.create({ title, occasion, owner: userId });
    const listObject = JSON.parse(JSON.stringify(newList));

    return {
      success: true,
      status: 201,
      message: "List created successfully",
      list: listObject,
    };
  } catch (error) {
    handleActionError(error);
  }
}

export async function addItems(body: AddItemsType) {
  try {
    const userId = await getAuthenticatedUserId();

    const { id, items: newItems } = body;

    if (!Array.isArray(newItems) || newItems.length === 0) {
      return {
        success: false,
        status: 400,
        message: "Request body must be a non-empty array of items.",
      };
    }

    await connectToDb();

    const list = await List.findById(id);
    if (!list) {
      return {
        success: false,
        status: 404,
        message: "This list does not exist",
      };
    }

    if (list.owner.toString() !== userId) {
      return {
        success: false,
        status: 403,
        message: "Forbidden: You do not own this list",
      };
    }

    list.items.push(...newItems);
    await list.save();

    const listObject = JSON.parse(JSON.stringify(list));

    return {
      success: true,
      status: 200,
      message: "Item added successfully",
      list: listObject,
    };
  } catch (error) {
    handleActionError(error);
  }
}
