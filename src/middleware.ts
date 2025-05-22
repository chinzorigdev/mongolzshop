import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Логин болон superadmin init хуудсыг чөлөөтэй болгох
  if (
    request.nextUrl.pathname === "/admin/login" ||
    request.nextUrl.pathname.startsWith("/init-superadmin")
  ) {
    return NextResponse.next();
  }

  // Cookie байгаа эсэхийг шалгах
  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // JWT decode хийхгүй, зөвхөн cookie байгаа эсэхийг шалгана
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
