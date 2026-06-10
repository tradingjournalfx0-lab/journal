
export default function HeatMap({

  analytics,

}) {

  const trades =

  analytics?.allTrades || [];

  return (

    <div className="
    bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    ">

      <h2 className="text-2xl font-bold mb-6">

        Trading HeatMap

      </h2>

      <div className="
      grid
      grid-cols-2
      md:grid-cols-4
      gap-4
      ">

        {

          trades.length > 0 ? (

            trades.map((trade,index)=>(

              <div

                key={index}

                className={`

                h-24
                rounded-2xl
                flex
                flex-col
                items-center
                justify-center
                border

                ${

                  Number(trade.profit) > 0

                  ? "bg-green-500/20 border-green-500/20 text-green-400"

                  : Number(trade.profit) < 0

                  ? "bg-red-500/20 border-red-500/20 text-red-400"

                  : "bg-gray-500/20 border-gray-500/20 text-gray-300"

                }

                `}

              >

                <h3 className="text-2xl font-bold">

                  ${trade.profit}

                </h3>

                <p className="text-xs mt-1">

                  {trade.symbol || "TRADE"}

                </p>

              </div>

            ))

          ) : (

            <div className="
            col-span-4
            text-center
            text-gray-400
            py-10
            ">

              No Trade Data

            </div>

          )

        }

      </div>

    </div>

  );

}

