// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const cookie = request.cookies.get("access_token");
  // console.log(cookie);

  if (!cookie) {
    // Rediriger vers la route API pour définir le cookie
    // Inclure l'URL originale comme paramètre de requête
    const originalUrl = request.url;
    const setCookieUrl = new URL("/api/set-cookie", request.url);
    setCookieUrl.searchParams.set("redirectTo", originalUrl);

    return NextResponse.redirect(setCookieUrl);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
