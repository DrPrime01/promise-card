import { unauthenticatedFetch } from "..";

export async function getPublicCard(id: string) {
  return await unauthenticatedFetch(`/cards/${id}`);
}
