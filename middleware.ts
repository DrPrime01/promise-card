import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/signup", "/verify"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const tokenCookie = req.cookies.get("token")?.value ?? null;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons")
  ) {
    return NextResponse.next();
  }

  const isAuthenticated = Boolean(tokenCookie);
  const isAuthPage = AUTH_PAGES.includes(pathname);

  // Redirect to home page if user is authenticated and navigates to any auth page
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect to the login page is user is unauthenticated and navigates to any page other than the auth pages
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Broad match is fine; we short-circuit inside for excluded paths.
  matcher: ["/((?!_next|favicon.ico|images|icons).*)"],
};
