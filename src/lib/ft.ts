export default async function getAccessToken() {
  const tokenUrl =
    "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=partenaire";
  const clientId = process.env.CLIENT_ID || "";
  const scope = process.env.SCOPE || "";
  const clientSecret = process.env.CLIENT_SECRET || "";
  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: scope,
      }),
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    throw new Error("Erreur dans getAccessToken");
  }
}

import { cookies } from "next/headers";

export async function fetchWithToken(url: string, options = {}) {
  const cookieStore = cookies();
  let token = cookieStore.get("access_token")?.value;

  const response = await fetch(url, {
    ...options,
    headers: {
      // ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    cache: "no-store",
  });

  if (response.status === 401) {
    // Token expiré, on en obtient un nouveau
    cookieStore.delete("accessToken");
    return fetchWithToken(url, options);
  }

  return response;
}
