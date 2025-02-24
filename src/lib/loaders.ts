import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import qs from "qs";
import { getAuthToken } from "./services/get-token";

const baseUrl = getStrapiURL();

export async function fetchData(url: string) {
  const authToken = await getAuthToken(); // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getHomePageData() {
  // noStore();
  const url = new URL("/api/home-page", baseUrl);
  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });
  return await fetchData(url.href);
}

export async function getGlobalPageData() {
  // noStore();
  const url = new URL("api/global", baseUrl);
  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });
  return await fetchData(url.href);
}

export async function getGlobalPageMetadata() {
  const url = new URL("api/global", baseUrl);
  url.search = qs.stringify({ fields: ["title", "description"] });
  return await fetchData(url.href);
}

export async function getArticles(queryString: string) {
  const url = new URL("api/articles", baseUrl);
  url.search = qs.stringify({
    // fields: ["title", "resume"],
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { resume: { $containsi: queryString } },
      ],
    },
  });
  return await fetchData(url.href);
}
export async function getArticlesId() {
  const url = new URL("api/articles", baseUrl);
  url.search = qs.stringify({ fields: ["articleId"] });
  return await fetchData(url.href);
}

export async function getArticleById(articleId: string) {
  return fetchData(`${baseUrl}/api/articles/${articleId}`);
}
