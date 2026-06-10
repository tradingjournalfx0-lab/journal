
import {

  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,

} from "recharts";

export default function RiskRewardChart({

  analytics,

}) {




  // =========================
  // ALL TRADES
  // =========================

  const trades =

  analytics?.allTrades || [];





  // =========================
  // TOTAL TRADES
  // =========================

  const totalTrades =

  trades.length || 1;





  // =========================
  // WINS
  // =========================

  const wins =

  trades.filter(

    trade =>

    Number(trade.profit) > 0

  ).length;





  // =========================
  // LOSSES
  // =========================

  const losses =

  trades.filter(

    trade =>

    Number(trade.profit) < 0

  ).length;





  // =========================
  // TOTAL PROFIT
  // =========================

  const totalProfit =

  trades.reduce(

    (acc,trade)=>

      acc +

      Number(

        trade.profit || 0

      ),

    0

  );





  // =========================
  // AVERAGE PROFIT
  // =========================

  const avgProfit =

  totalProfit / totalTrades;





  // =========================
  // WIN RATE
  // =========================

  const winRate =

  Math.round(

    (wins / totalTrades)

    * 100

  );





  // =========================
  // DISCIPLINE
  // =========================

  const disciplinedTrades =

  trades.filter(

    trade =>

    trade.strategy &&

    trade.strategy.trim() !== ""

  ).length;





  const disciplineScore =

  Math.round(

    (disciplinedTrades / totalTrades)

    * 100

  );





  // =========================
  // PATIENCE
  // =========================

  const patienceScore =

  Math.max(

    100 - losses * 10,

    20

  );





  // =========================
  // EXECUTION
  // =========================

  const executionScore =

  Math.min(

    Math.abs(avgProfit),

    100

  );





  // =========================
  // RISK
  // =========================

  const riskScore =

  Math.min(

    losses * 15,

    100

  );





  // =========================
  // REWARD
  // =========================

  const rewardScore =

  Math.min(

    wins * 15,

    100

  );





  // =========================
  // RADAR DATA
  // =========================

  const data = [

    {

      subject:"Risk",

      value:riskScore,

    },




    {

      subject:"Reward",

      value:rewardScore,

    },




    {

      subject:"Win Rate",

      value:winRate,

    },




    {

      subject:"Discipline",

      value:disciplineScore,

    },




    {

      subject:"Patience",

      value:patienceScore,

    },




    {

      subject:"Execution",

      value:executionScore,

    },

  ];





  return (

    <div className="
    bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    h-[500px]
    ">




      {/* HEADER */}

      <div className="mb-6">

        <h2 className="
        text-2xl
        font-bold
        ">

          Risk Reward Analysis

        </h2>



        <p className="
        text-gray-400
        mt-2
        ">

          Live trading performance radar

        </p>

      </div>





      {/* CHART */}

      <ResponsiveContainer

        width="100%"

        height="72%"

      >

        <RadarChart

          data={data}

        >




          <PolarGrid />





          <PolarAngleAxis

            dataKey="subject"

            tick={{

              fill:"#fff",

              fontSize:12,

            }}

          />





          <PolarRadiusAxis

            angle={30}

            domain={[0,100]}

            tick={{

              fill:"#9CA3AF",

            }}

          />





          <Tooltip />





          <Radar

            name="Performance"

            dataKey="value"

            stroke="#7c3aed"

            fill="#7c3aed"

            fillOpacity={0.5}

          />

        </RadarChart>

      </ResponsiveContainer>





      {/* FOOTER */}

      <div className="
      grid
      grid-cols-4
      gap-4
      mt-4
      ">




        {/* TRADES */}

        <div className="
        bg-black/20
        rounded-2xl
        p-4
        text-center
        ">

          <h3 className="
          text-xl
          font-bold
          text-white
          ">

            {trades.length}

          </h3>



          <p className="
          text-xs
          text-gray-400
          mt-1
          ">

            Trades

          </p>

        </div>





        {/* WINS */}

        <div className="
        bg-green-500/10
        border border-green-500/20
        rounded-2xl
        p-4
        text-center
        ">

          <h3 className="
          text-xl
          font-bold
          text-green-400
          ">

            {wins}

          </h3>



          <p className="
          text-xs
          text-gray-400
          mt-1
          ">

            Wins

          </p>

        </div>





        {/* LOSSES */}

        <div className="
        bg-red-500/10
        border border-red-500/20
        rounded-2xl
        p-4
        text-center
        ">

          <h3 className="
          text-xl
          font-bold
          text-red-400
          ">

            {losses}

          </h3>



          <p className="
          text-xs
          text-gray-400
          mt-1
          ">

            Losses

          </p>

        </div>





        {/* PROFIT */}

        <div className="
        bg-purple-500/10
        border border-purple-500/20
        rounded-2xl
        p-4
        text-center
        ">

          <h3 className={`

          text-xl
          font-bold

          ${

            totalProfit >= 0

            ? "text-green-400"

            : "text-red-400"

          }

          `}>

            ${Number(totalProfit).toFixed(2)}

          </h3>



          <p className="
          text-xs
          text-gray-400
          mt-1
          ">

            Total Profit

          </p>

        </div>

      </div>

    </div>

  );

}

