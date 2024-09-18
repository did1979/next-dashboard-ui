import getAccessToken from "@/lib/ft";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = await getAccessToken(); // Obtenez votre token comme nécessaire

  // Définir le cookie
  cookieStore.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1500, // 1 heure
    path: "/",
  });

  // Récupérer l'URL de redirection depuis les paramètres de requête
  const redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/";

  // Rediriger vers l'URL originale
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
