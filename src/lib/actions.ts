"use server";

import { cookies } from "next/headers";
interface StoreTokenRequest {
  token: string;
}

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: "accessToken",
    value: request.token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}
