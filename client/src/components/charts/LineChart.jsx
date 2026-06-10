import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  {
    month: "Jan",
    profit: 1200,
  },
  {
    month: "Feb",
    profit: 2100,
  },
  {
    month: "Mar",
    profit: 1800,
  },
  {
    month: "Apr",
    profit: 3200,
  },
  {
    month: "May",
    profit: 7058,
  },
];

export default function CustomLineChart() {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 h-[400px]">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Profit Growth
        </h2>

      </div>

      <ResponsiveContainer width="100%" height="80%">

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="profit"
            stroke="#7c3aed"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}