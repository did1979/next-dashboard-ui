import { clsx, type ClassValue } from "clsx";
import parse from "node-html-parser";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeHTMLTags(htmlString: string) {
  const text = parse(htmlString);

  const textContent = text.textContent;
  return textContent.trim(); // Trim any leading or trailing whitespace
}

export function formatDate(input: string): string {
  const date = new Date(input);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
}
