import Announcements from "@/components/Announcements";
import CountChart from "@/components/CountChart";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import TypeContratChart from "@/components/TypeContratChart";
import UserCard from "@/components/UserCard";
import { fetchWithToken } from "@/lib/ft";
import { SearchParams } from "@/lib/types/types";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LieuTravail = {
  libelle: string;
  latitude: number;
  longitude: number;
  codePostal: string;
  commune: string;
};
type Offre = {
  // Définissez ici la structure d'une offre d'emploi
  id: string;
  intitule: string;
  description: string;
  dateCreation: string;
  lieuTravail: LieuTravail;
  romeLibelle: string;
  typeContrat: string;
  typeContratLibelle: string;

  // ... autres propriétés
};
type aggregation = { valeurPossible: string; nbResultats: number };
type FiltrePossible = {
  filtre: string;
  aggregation: aggregation[];
};

const columns = [
  { header: "Intitulé", accessor: "intitule" },
  {
    header: "Date de création",
    accessor: "dateCreation",
    className: "hidden md:table-cell",
  },
  { header: "Ville", accessor: "lieuTravail" },
  { header: "Rome", accessor: "romeLibelle" },
  {
    header: "Type",
    accessor: "typeContrat",
    className: "hidden md:table-cell lg:hidden",
  },
  {
    header: "Libellé contrat",
    accessor: "typeContratLibelle",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const OffresPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const renderRow = (item: Offre) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 text-sm even:bg-slate-50 hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 font-semibold">
        {item.intitule}
      </td>
      <td className="hidden md:table-cell">{formatDate(item.dateCreation)}</td>
      <td className="">{item.lieuTravail.libelle}</td>
      <td className="">{item.romeLibelle}</td>
      <td className="hidden md:table-cell lg:hidden">{item.typeContrat}</td>
      <td className="hidden lg:table-cell">{item.typeContratLibelle}</td>
      <td>
        <div className="flex item-center gap-2">
          <Link href={`/list/offres/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="Voir" width={16} height={16} />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );

  const page = searchParams?.page || 1;
  const range = `${(Number(page) - 1) * 25}-${Number(page) * 25 - 1}`;

  const params = new URLSearchParams(searchParams);
  params.set("region", "28");
  params.set("range", range);

  try {
    const apiUrl = `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search?${params.toString()}`;
    const response = await fetchWithToken(apiUrl);

    const totalResults =
      response.headers.get("content-range")?.split("/")[1] || "0";
    if (!response.ok) {
      throw new Error("Échec de la requête API");
    }
    const offresData = await response.json();
    const filtresPossibles = offresData.filtresPossibles;
    const data1 = filtresPossibles.filter(
      (item: FiltrePossible) => item.filtre === "typeContrat"
    );

    return (
      <div>
        <div className="p-4 flex gap-4 flex-col md:flex-row">
          {/* LEFT */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* USER CARDS */}
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className="w-full lg:w-1/4 h-[520px] flex flex-col gap-y-8">
                <UserCard type="offre" count={totalResults} />
                <UserCard type="CDI" count="1234" />
                <UserCard type="CDD" count="1234" />
              </div>
              {/* MIDDLE CHARTS */}
              <div className="w-full lg:w-3/4 h-[520px]">
                <TypeContratChart data={data1[0].agregation} />
              </div>
            </div>
            {/* BOTTOM CHART */}
            <div className="w-full h-[500px]">
              <div className=" bg-white p-4 rounded-md flex-1 m-4 mt-0">
                {/* TOP */}
                <div className="flex items-center justify-between">
                  <h2
                    id="offres"
                    className="hidden md:block text-lg font-semibold"
                  >
                    Toutes les offres({totalResults} réponses)
                  </h2>
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex gap-4 items-center self-end">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image
                          src="/filter.png"
                          alt=""
                          width={14}
                          height={14}
                        />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image src="/sort.png" alt="" width={14} height={14} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* LIST */}
                <Table
                  columns={columns}
                  renderRow={renderRow}
                  data={offresData.resultats}
                />
                {/* PAGINATION */}
                <Pagination />
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            {/* CALENDAR */}
            <div className="w-full h-[450px]">
              <CountChart />
            </div>
            <Announcements />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        Erreur :{" "}
        {error instanceof Error ? error.message : "Une erreur est survenue"}
      </div>
    );
  }
};

export default OffresPage;
