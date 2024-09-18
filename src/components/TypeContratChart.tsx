"use client";

import Image from "next/image";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 40,
    absent: 24,
  },
  {
    name: "Tue",
    present: 70,
    absent: 60,
  },
  {
    name: "Wed",
    present: 10,
    absent: 4,
  },
  {
    name: "Thu",
    present: 60,
    absent: 20,
  },
  {
    name: "Fri",
    present: 50,
    absent: 10,
  },
];
type dataFt = {
  valeurPossible: string;
  nbResultats: number;
};

const TypeContratChart = ({ data }: { data: dataFt[] }) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Types de contrats</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-full">
        <ResponsiveContainer width="100%" height="90%">
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="valeurPossible"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis tick={{ fill: "#d1d5db" }} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
            />
            <Bar
              dataKey="nbResultats"
              fill="#FAE27C"
              legendType="circle"
              radius={[10, 10, 0, 0]}
              name="Nombre d'offres"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TypeContratChart;
