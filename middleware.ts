import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("[MIDDLEWARE] Checking path:", pathname);

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/register"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Allow access to public routes
  if (isPublicRoute) {
    console.log("[MIDDLEWARE] Public route, allowing access");
    return NextResponse.next();
  }

  // For now, check for session cookie
  const sessionToken =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");
  console.log("[MIDDLEWARE] Session token:", sessionToken ? "exists" : "null");

  // Redirect to login if not authenticated
  if (!sessionToken) {
    console.log("[MIDDLEWARE] No session token, redirecting to /login");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log("[MIDDLEWARE] Authenticated, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
