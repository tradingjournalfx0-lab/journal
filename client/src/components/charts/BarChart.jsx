import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    strategy: "CRT",
    trades: 45,
  },
  {
    strategy: "SMC",
    trades: 32,
  },
  {
    strategy: "Scalp",
    trades: 18,
  },
  {
    strategy: "Swing",
    trades: 10,
  },
];

export default function CustomBarChart() {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[400px]">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Strategy Performance
        </h2>

      </div>

      <ResponsiveContainer width="100%" height="80%">

        <BarChart data={data}>

          <XAxis dataKey="strategy" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="trades"
            fill="#7c3aed"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}