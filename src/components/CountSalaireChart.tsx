"use client";

import Image from "next/image";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 103,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#C3EBFA",
  },
];

const data2 = {
  datMaj: "2024-07-11T09:10:07.000+02:00",
  libIndicateur:
    "Salaires en poste par typlologie salaires (moyen / débutant / expérimenté) x caractéristiques",
  valeursParPeriode: [
    {
      datMaj: "2024-06-18T03:08:18.000+02:00",
      codeActivite: "A0Z43",
      libActivite: "Conducteurs d'engins agricoles ou forestiers",
      codeTypePeriode: "ANNEE",
      codePeriode: "2021",
      libPeriode: "ANNEE 2021",
      salaireValeurMontant: [
        {
          codeNomenclature: "SAL1",
          valeurPrincipaleMontant: 2133.0,
        },
        {
          codeNomenclature: "SAL2",
          valeurPrincipaleMontant: 2286.0,
        },
        {
          codeNomenclature: "SAL3",
          valeurPrincipaleMontant: 2196.0,
        },
      ],
    },
  ],
};

const CountSalaireChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{data2.libIndicateur}</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={data2.valeursParPeriode[0].salaireValeurMontant}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis
              dataKey="codeNomenclature"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
              tickMargin={20}
            />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
            />
            <Line
              type="monotone"
              dataKey="valeurPrincipaleMontant"
              label="Montant"
              stroke="#CFCEFF"
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* BOTTOM */}
    </div>
  );
};

export default CountSalaireChart;
