
import {

  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,

} from "recharts";

export default function DrawdownChart({

  analytics,

}) {




  // =========================
  // ALL TRADES
  // =========================

  const trades =

  analytics?.allTrades || [];





  // =========================
  // SORT TRADES
  // =========================

  const sortedTrades =

  [...trades].sort(

    (a,b)=>

      new Date(a.createdAt)

      -

      new Date(b.createdAt)

  );





  // =========================
  // CREATE CHART DATA
  // =========================

  let peak = 0;

  let balance = 0;





  const chartData =

  sortedTrades.length > 0

  ? sortedTrades.map(

      (trade,index)=>{

        // BALANCE

        balance +=

        Number(

          trade?.profit || 0

        );




        // PEAK

        if(balance > peak){

          peak = balance;

        }




        // DRAWDOWN

        const drawdown =

        peak - balance;




        return {

          trade:
          `T${index + 1}`,

          balance:
          Number(

            balance.toFixed(2)

          ),

          drawdown:
          Number(

            drawdown.toFixed(2)

          ),

          profit:
          Number(

            trade?.profit || 0

          ),

        };

      }

    )

  : [

      {

        trade:"T1",

        balance:0,

        drawdown:0,

        profit:0,

      },

    ];





  return (

    <div className="
    bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    h-[420px]
    ">




      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6">

        <h2 className="
        text-2xl
        font-bold
        ">

          Drawdown Analysis

        </h2>



        <p className="
        text-gray-400
        mt-2
        ">

          Live drawdown & equity tracking

        </p>

      </div>





      {/* =========================
          CHART
      ========================= */}

      <ResponsiveContainer

        width="100%"

        height="80%"

      >

        <AreaChart

          data={chartData}

        >




          {/* GRID */}

          <CartesianGrid

            strokeDasharray="3 3"

            stroke="#1f2937"

          />





          {/* X AXIS */}

          <XAxis

            dataKey="trade"

            stroke="#9CA3AF"

          />





          {/* Y AXIS */}

          <YAxis

            stroke="#9CA3AF"

          />





          {/* TOOLTIP */}

          <Tooltip

            contentStyle={{

              background:"#111827",

              border:"1px solid #374151",

              borderRadius:"16px",

              color:"#fff",

            }}

          />





          {/* AREA */}

          <Area

            type="monotone"

            dataKey="drawdown"

            stroke="#ef4444"

            fill="#ef4444"

            fillOpacity={0.25}

            strokeWidth={3}

          />

        </AreaChart>

      </ResponsiveContainer>





      {/* =========================
          FOOTER
      ========================= */}

      <div className="
      grid
      grid-cols-3
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

            Total Trades

          </p>

        </div>





        {/* MAX DD */}

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

            $

            {

              Math.max(

                ...chartData.map(

                  item => item.drawdown

                )

              ).toFixed(2)

            }

          </h3>



          <p className="
          text-xs
          text-gray-400
          mt-1
          ">

            Max Drawdown

          </p>

        </div>





        {/* BALANCE */}

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

            $

            {

              chartData[

                chartData.length - 1

              ]?.balance?.toFixed(2)

            }

          </h3>



          <p className="
          text-xs
          text-gray-400
          mt-1
          ">

            Current Balance

          </p>

        </div>

      </div>

    </div>

  );

}

