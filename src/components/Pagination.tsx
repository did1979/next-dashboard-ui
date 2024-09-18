"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const onPageClick = (page: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    console.log("page ", page);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Précédent
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button
          className={`px-2 rounded-sm ${currentPage === 1 ? "bg-lamaSky" : ""}`}
          onClick={() => onPageClick("1")}
        >
          1
        </button>
        <button
          className={`px-2 rounded-sm ${currentPage === 2 ? "bg-lamaSky" : ""}`}
          onClick={() => onPageClick("2")}
        >
          2
        </button>
        <button
          className={`px-2 rounded-sm ${currentPage === 3 ? "bg-lamaSky" : ""}`}
          onClick={() => onPageClick("3")}
        >
          3
        </button>
        ...
        <button
          className={`px-2 rounded-sm ${
            currentPage === 10 ? "bg-lamaSky" : ""
          }`}
          onClick={() => onPageClick("10")}
        >
          10
        </button>
      </div>
      <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
