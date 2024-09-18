// import { getArticlesId } from "./loaders";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)";

export async function getToken() {
  try {
    const query = {
      code: process.env.INOREADER_CODE,
      redirect_uri: process.env.BASE_URL,
      client_id: process.env.INOREADER_CLIENT_ID,
      client_secret: process.env.INOREADER_CLIENT_SECRET,
      // state: "secret",
      grant_type: "authorization_code",
    };
    console.log("query getToken", query);
    const response = await fetch("https://www.inoreader.com/oauth2/token", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to get inoreader Token:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Inoreader token error" } };
  }
}
export async function refreshToken() {
  const test = await getToken();
  console.log("response getToken", test);

  try {
    const query = {
      client_id: process.env.INOREADER_CLIENT_ID,
      client_secret: process.env.INOREADER_CLIENT_SECRET,
      grant_type: "refresh_token",
      scope: "read",
      refresh_token: process.env.INOREADER_REFRESH_TOKEN,
    };
    console.log("query refresh token", query);
    const response = await fetch("https://www.inoreader.com/oauth2/token", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("refresh Token", data);
    return data;
  } catch (error) {
    console.error("Failed to refresh inoreader Token:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Inoreader token error" } };
  }
}

export async function getUserInfo() {
  try {
    const { access_token } = await refreshToken();

    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response = await fetch(
        "https://www.inoreader.com/reader/api/0/user-info",
        access_token ? headers : {}
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to get inoreader User:", error);
      if (error instanceof Error) return { error: { message: error.message } };
      return { data: null, error: { message: "Inoreader token error" } };
    }
  } catch (error) {
    console.error("Failed to get inoreader Token:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "Inoreader token error" } };
  }
}

export async function getStreamContents(queryString: string) {
  try {
    const { access_token } = await refreshToken();
    const headers = {
      next: { tags: ["collection"] },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        o: "n",
        n: 50,
        c: "continue",
        annotations: 1,
      },
    };
    console.log("Headers", headers);
    try {
      const response = await fetch(
        "https://www.inoreader.com/reader/api/0/stream/contents/user/1004556699/tag/CENTRE%20INFFO",
        access_token ? headers : {}
      );
      const dataInoreader = await response.json();
      const { items } = dataInoreader;

      return items;
    } catch (error) {
      console.error("Failed to get Stream 2 Inoreader:", error);
      if (error instanceof Error) return { error: { message: error.message } };
      return {
        data: null,
        error: { message: "Inoreader Stream Centre Inffo error" },
      };
    }
  } catch (error) {
    console.error("Failed to get token Inoreader:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return {
      data: null,
      error: { message: "Inoreader Stream Centre Inffo error" },
    };
  }
}
export async function getStreamItemContent(id: string) {
  try {
    const { access_token } = await refreshToken();
    const headers = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response = await fetch(
        "https://www.inoreader.com/reader/api/0/stream/contents/user/1004556699/tag/CENTRE%20INFFO?o=n",
        access_token ? headers : {}
      );
      const data = await response.json();
      const { items } = data;

      const item = items.filter((i: any) => i.id === id);
      return item[0];
    } catch (error) {
      console.error("Failed to get Stream Inoreader Item:", error);
      if (error instanceof Error) return { error: { message: error.message } };
      return {
        data: null,
        error: { message: "Inoreader Stream Centre Inffo error" },
      };
    }
  } catch (error) {
    console.error("Failed to get Stream Inoreader:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return {
      data: null,
      error: { message: "Inoreader Stream Centre Inffo error" },
    };
  }
}
