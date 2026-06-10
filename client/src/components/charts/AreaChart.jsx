import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    day: "Mon",
    equity: 1000,
  },
  {
    day: "Tue",
    equity: 2200,
  },
  {
    day: "Wed",
    equity: 3100,
  },
  {
    day: "Thu",
    equity: 4500,
  },
  {
    day: "Fri",
    equity: 7058,
  },
];

export default function CustomAreaChart() {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[400px]">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Equity Curve
        </h2>

      </div>

      <ResponsiveContainer width="100%" height="80%">

        <AreaChart data={data}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="equity"
            stroke="#7c3aed"
            fill="#7c3aed"
            fillOpacity={0.3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );
}