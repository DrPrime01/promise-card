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

  // Make the fetch call, automatically adding the Cookie header
  const res = await fetch(`${API_URL}${path}`, {
    ...options, // Spread any other fetch options (like method, body)
    headers: {
      ...options.headers, // Keep existing headers
      Cookie: cookieHeader, // Add the all-important cookie header
    },
    cache: "no-store", // Keep this for dynamic data
  });

  // If the request was not successful, throw an error
  if (!res.ok) {
    throw new Error(`API call failed with status: ${res.status}`);
  }

  // Otherwise, return the JSON data
  return res.json();
}
