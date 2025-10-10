import { connectToDb } from "@/db";
import { handleServiceError } from "@/lib/error";
import { List } from "@/models/listSchema";

export async function getCard(shareableId: string) {
  try {
    await connectToDb();

    const card = await List.findOne({ shareableId });

    if (!card) {
      return {
        success: false,
        error: 404,
        message: "This card does not exist.",
      };
    }

    if (!card.active) {
      return {
        success: false,
        error: 400,
        message: "This list is currently inactive.",
      };
    }

    let cardObject = card.toObject();
    delete cardObject.owner;

    cardObject = JSON.parse(JSON.stringify(cardObject));

    return {
      success: true,
      card: cardObject,
    };
  } catch (error) {
    handleServiceError(error);
  }
}
