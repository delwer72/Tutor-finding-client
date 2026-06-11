import { NextResponse } from "next/server";

export function proxy(request) {
  // Better Auth session token check
  const token = request.cookies.get("better-auth.session_token");

  // Current pathname
  const pathname = request.nextUrl.pathname;

  // Private Routes
  const privateRoutes = [
    "/add-tutor",
    "/my-tutors",
    "/booked-session",
    "/profile",
  ];

  // Check static private routes
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Dynamic Tutor Details Route
  const isTutorDetailsRoute = pathname.startsWith("/tutors/");

  // If no token and trying to access private route
  if ((isPrivateRoute || isTutorDetailsRoute) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Middleware Route Matcher
export const config = {
  matcher: [
    "/add-tutor",
    "/my-tutors",
    "/booked-session",
    "/profile",
    "/tutors/:path*",
  ],
};