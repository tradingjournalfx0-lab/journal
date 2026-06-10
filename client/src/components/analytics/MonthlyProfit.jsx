
export default function MonthlyProfit({

  analytics,

}) {




  // =========================
  // DATA
  // =========================

  const totalProfit =

  Number(

    analytics?.totalProfit || 0

  );




  const wins =

  analytics?.wins || 0;




  const losses =

  analytics?.losses || 0;




  const breakeven =

  analytics?.breakeven || 0;




  const totalTrades =

  analytics?.totalTrades || 0;





  return (

    <div className="
    bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    min-h-[350px]
    ">




      {/* HEADER */}

      <div className="
      flex
      items-center
      justify-between
      mb-6
      ">

        <div>

          <h2 className="
          text-2xl
          font-bold
          ">

            Monthly Profit

          </h2>



          <p className="
          text-gray-400
          mt-1
          text-sm
          ">

            Live profit analytics

          </p>

        </div>





        <span className="
        text-sm
        text-gray-400
        bg-black/20
        px-4
        py-2
        rounded-xl
        ">

          {totalTrades} Trades

        </span>

      </div>





      {/* MAIN */}

      <div className="
      flex
      flex-col
      items-center
      justify-center
      py-10
      ">




        {/* PROFIT */}

        <h1

          className={`

          text-6xl
          font-black

          ${

            totalProfit >= 0

            ? "text-green-400"

            : "text-red-400"

          }

          `}

        >

          ${totalProfit.toFixed(2)}

        </h1>





        {/* LABEL */}

        <p className="
        text-gray-400
        mt-4
        text-lg
        ">

          Total Profit & Loss

        </p>





        {/* STATS */}

        <div className="
        grid
        grid-cols-3
        gap-4
        mt-10
        w-full
        ">




          {/* WINS */}

          <div className="
          bg-green-500/10
          border border-green-500/20
          rounded-2xl
          p-4
          text-center
          ">

            <h3 className="
            text-2xl
            font-bold
            text-green-400
            ">

              {wins}

            </h3>



            <p className="
            text-sm
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
            text-2xl
            font-bold
            text-red-400
            ">

              {losses}

            </h3>



            <p className="
            text-sm
            text-gray-400
            mt-1
            ">

              Losses

            </p>

          </div>





          {/* BREAKEVEN */}

          <div className="
          bg-yellow-500/10
          border border-yellow-500/20
          rounded-2xl
          p-4
          text-center
          ">

            <h3 className="
            text-2xl
            font-bold
            text-yellow-400
            ">

              {breakeven}

            </h3>



            <p className="
            text-sm
            text-gray-400
            mt-1
            ">

              Breakeven

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

