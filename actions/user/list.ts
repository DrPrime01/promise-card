import { authenticatedFetch } from "..";

export async function getUserLists() {
  return await authenticatedFetch("/lists?limit=10");
}
