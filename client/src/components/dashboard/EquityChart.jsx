import {

  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,

} from "recharts";

export default function EquityChart({

  trades,

}) {




  // =========================
  // CREATE LIVE EQUITY DATA
  // =========================

  let runningEquity = 0;

  const data =
  trades
  .slice()
  .reverse()
  .map((trade,index)=>{

    runningEquity +=
    trade.profit;

    return {

      day:
      `T${index + 1}`,

      equity:
      runningEquity,

    };

  });




  return (

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[350px]">

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Equity Curve

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Live account growth

        </p>

      </div>



      {/* CHART */}

      <ResponsiveContainer

        width="100%"

        height="80%">

        <LineChart

          data={data}>

          {/* X AXIS */}

          <XAxis

            dataKey="day"

            stroke="#9CA3AF"

          />



          {/* Y AXIS */}

          <YAxis

            stroke="#9CA3AF"

          />



          {/* TOOLTIP */}

          <Tooltip />



          {/* LINE */}

          <Line

            type="monotone"

            dataKey="equity"

            stroke="#7c3aed"

            strokeWidth={4}

            dot={false}

          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}