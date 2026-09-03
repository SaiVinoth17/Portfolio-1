import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Redirect legacy password recovery endpoints directly to login
  if (pathname === "/admin/forgot-password" || pathname === "/admin/reset-password") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const sessionCookie = request.cookies.get("aevion_session");
  const isAuthPage = pathname === "/admin/login";

  // 1. If trying to access protected admin pages without a session cookie -> redirect to restricted login
  if (!sessionCookie && !isAuthPage) {
    const loginUrl = new URL("/admin/login", request.url);
    if (pathname !== "/admin") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    const res = NextResponse.redirect(loginUrl);
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return res;
  }

  // 2. If already logged in and visiting login page -> redirect to dashboard
  if (sessionCookie && isAuthPage) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    const res = NextResponse.redirect(dashboardUrl);
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return res;
  }

  // 3. If accessing /admin directly while authenticated -> redirect to dashboard
  if (sessionCookie && pathname === "/admin") {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    const res = NextResponse.redirect(dashboardUrl);
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return res;
  }

  // Add security & search-engine block headers to all admin pages
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
