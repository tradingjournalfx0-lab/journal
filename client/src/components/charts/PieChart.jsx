import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Wins",
    value: 48,
  },
  {
    name: "Losses",
    value: 52,
  },
];

const COLORS = [
  "#7c3aed",
  "#ef4444",
];

export default function CustomPieChart() {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[400px]">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Win Ratio
        </h2>

      </div>

      <ResponsiveContainer width="100%" height="80%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label>

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}