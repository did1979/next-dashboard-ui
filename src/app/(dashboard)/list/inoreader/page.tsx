import { getStreamContents } from "@/lib/inoreader";

import LinkCardInoreader, {
  LinkCardProps,
} from "@/components/LinkCardInoreader";
import { Search } from "@/components/Search";

interface SearchParamsProps {
  searchParams?: {
    query?: string;
  };
}

export default async function ArticlesRoute({
  searchParams,
}: Readonly<SearchParamsProps>) {
  const query = searchParams?.query ?? "";
  const items = await getStreamContents(query);
  if (!items) return null;
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <span>Query: {query}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item: LinkCardProps) => (
          <LinkCardInoreader key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
