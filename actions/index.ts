import { cookies } from "next/headers";
import { API_URL } from "@/constants";

export async function authenticatedFetch(
  path: string,
  options: RequestInit = {}
) {
  // Get the cookies from the incoming request
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Cookie: cookieHeader,
    },
    cache: "no-store", // Keep this for dynamic data
  });

  if (!res.ok) {
    throw new Error(`API call failed with status: ${res.status}`);
  }

  return res.json();
}

export async function unauthenticatedFetch(path: string) {
  const res = await fetch(`${API_URL}${path}`);

  if (!res.ok) {
    throw new Error(`API call failed with status: ${res.status}`);
  }

  return res.json();
}
