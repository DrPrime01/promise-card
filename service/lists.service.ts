import { connectToDb } from "@/db";
import { getAuthenticatedUserId } from "@/lib/auth-helpers";
import { handleServiceError } from "@/lib/error";
import { List } from "@/models/listSchema";

export async function getUserLists(limit = 10) {
  try {
    const userId = await getAuthenticatedUserId();
    await connectToDb();

    const lists = await List.find({ owner: userId })
      .sort({ createdAt: -1 })
      .limit(limit);

    if (!lists) {
      return {
        success: false,
        status: 404,
        message: "These lists do not exist",
      };
    }

    const listsObject = JSON.parse(JSON.stringify(lists));

    return {
      success: true,
      status: 200,
      lists: listsObject,
    };
  } catch (error) {
    handleServiceError(error);
  }
}

export async function getUserList(id: string) {
  try {
    const userId = await getAuthenticatedUserId();
    await connectToDb();
    const list = await List.findOne({ _id: id, owner: userId });

    if (!list) {
      return {
        success: false,
        status: 404,
        message: "This list does not exist",
      };
    }

    const listObject = JSON.parse(JSON.stringify(list));

    return {
      success: true,
      status: 200,
      list: listObject,
    };
  } catch (error) {
    handleServiceError(error);
  }
}
