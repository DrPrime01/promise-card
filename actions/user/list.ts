import { authenticatedFetch } from "..";

export async function getUserLists() {
  return await authenticatedFetch("/lists?limit=10");
}

export async function getUserList(id: string) {
  return await authenticatedFetch(`/lists/${id}`);
}
