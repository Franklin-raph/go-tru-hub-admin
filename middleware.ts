import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Extract the token or user information from the request
  const token = req.cookies.get("token");

  // Define the paths that don't require authentication
  const unprotectedRoutes = ['/', '/login', '/api/public'];

  // Check if the request path is one of the unprotected routes
  if (token && unprotectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If the user is not authenticated, redirect to the login page
  if (!token && !unprotectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

// configs
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icon.png|logo.svg).*)",
  ],
};
