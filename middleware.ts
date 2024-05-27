import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked async if using await inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  console.log(request.nextUrl.pathname);
  
  const notStrictRoute = ["/"];

  if (!token && !notStrictRoute.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (token && notStrictRoute.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  return NextResponse.next();
}
// configs
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|icon.png|logo.svg).*)",
  ],
};








// From ChatGpt

// // pages/_middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   // Extract the token or user information from the request
//   const token = req.cookies['token'];

//   // Define the paths that don't require authentication
//   const unprotectedRoutes = ['/', '/login', '/api/public'];

//   // Check if the request path is one of the unprotected routes
//   if (unprotectedRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   // If the user is not authenticated, redirect to the login page
//   if (!token) {
//     return NextResponse.redirect('/login');
//   }

//   // Otherwise, allow the request to proceed
//   return NextResponse.next();
// }