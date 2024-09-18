import Announcements from "@/components/Announcements";
import CountSalaireChart from "@/components/CountSalaireChart";
import PerformanceChart from "@/components/Performance";
import { fetchWithToken } from "@/lib/ft";
import Image from "next/image";
import Link from "next/link";

const SingleOffrePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);
  const apiUrl = `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/${id}`;

  const response = await fetchWithToken(apiUrl);
  const offre = await response.json();
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex items-center gap-4">
            <div className="w-1/4">
              {offre.partenaire}
              {/* <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              /> */}
            </div>
            <div className="w-3/4 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{offre.intitule}</h1>
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{offre.typeContratLibelle}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{offre.experienceLibelle}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{offre.lieuTravail.libelle}</span>
                </div>
                <div className="w-full md:w-1/3 2xl:w-1/3 lg:w-full flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{offre.entreprise.nom}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}

          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white rounded-md w-full p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h2 className="text-xl font-semibold">
                  {offre.dureeTravailLibelleConverti}
                </h2>
                <span className="text-sm text-gray-400">
                  {offre.conditionExercice}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-md w-full p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h2 className="text-xl font-semibold">Salaire Brut</h2>
                <span className="text-sm text-gray-400">
                  {offre.salaire.libelle}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-md w-full p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h2 className="text-xl font-semibold">
                  {offre.formations[0].niveauLibelle}
                </h2>
                <span className="text-sm text-gray-400">
                  {offre.formations[0].commentaire}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-md w-full p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h2 className="text-xl font-semibold">6</h2>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-auto">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Description
          </h2>
          {/* <BigCalendar /> */}
          <p className="mt-6 text-lg leading-8 text-gray-600 whitespace-pre-wrap">
            {offre.description}
          </p>
          <h3 className="mt-5 text-base font-semibold leading-7 text-indigo-600">
            Qualités professionnelles
          </h3>
          <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
            {offre.qualitesProfessionnelles.map(
              (
                qualite: { libelle: string; description: string },
                index: number
              ) => (
                <div className="relative pl-9" key={index}>
                  <dt className="inline font-semibold text-gray-900 pe-2">
                    <svg
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {qualite.libelle}:
                  </dt>
                  <dd className="inline">{qualite.description}</dd>
                </div>
              )
            )}
          </dl>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold my-4">Shortcuts</h2>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Teacher&apos;s Classes
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Teacher&apos;s Students
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Teacher&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Teacher&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <CountSalaireChart />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleOffrePage;
