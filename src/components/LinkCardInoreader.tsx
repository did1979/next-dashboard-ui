"use client";
import { removeHTMLTags } from "@/lib/utils";
import Image from "next/image";
// import { ArticleInoreaderForm } from "../forms/ArticleInoreaderForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface summary {
  content: string;
  direction: React.ReactNode;
}

interface image {
  href: string;
  type: string;
  length: string;
}
// "updated": 0,
// "enclosure": [
//     {
//         "href": "https://static.latribune.fr/1982988/les-etats-unis-envisagent-de-sevir-contre-les-fabricants-de-puces-memoire-en-chine.jpg",
//         "type": "image/jpeg",
//         "length": "99999"
//     }
// ],
export interface LinkCardProps {
  id: string;
  title: string;
  summary: summary;
  enclosure?: image[];
}

export default function LinkCardInoreader({
  id,
  title,
  summary,
  enclosure,
}: Readonly<LinkCardProps>) {
  const titre = removeHTMLTags(title);
  const content = removeHTMLTags(summary.content);
  let imageArticle: boolean | image = false;
  if (enclosure) {
    imageArticle = enclosure[0];
  }
  console.log(imageArticle);
  return (
    // <Link href={`/dashboard/articles/${id}`}>
    <Card className="relative hover:bg-blue-50">
      <CardHeader>
        {imageArticle && (
          <Image
            // src={`https://res.cloudinary.com/carif-oref-normandie/image/fetch/${imageArticle.href}`}
            src={`${imageArticle.href}`}
            alt="Illustration"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <CardTitle className="leading-8 text-gray-500">
          {titre || "Video Summary"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="w-full mb-4 leading-7">
          {content.slice(0, 244) + " [read more]"}
        </p>
      </CardContent>
      {/* <CardFooter>
        <ArticleInoreaderForm articleId={id} />
      </CardFooter> */}
    </Card>
    // </Link>
  );
}
