export default function RecentTrades({

  trades,

}) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">

          Recent Trades

        </h2>

      </div>

      <div className="space-y-5">

        {trades.slice(0,5).map((trade)=>(

          <div

            key={trade._id}

            className="flex items-center justify-between border-b border-white/5 pb-4">

            <div>

              <h3 className="font-semibold">

                {trade.symbol}

              </h3>

              <p className={`text-sm

                ${trade.side === "BUY"

                  ? "text-green-400"

                  : "text-red-400"

                }`}>

                {trade.side}

              </p>

            </div>

            <div className={`font-bold

              ${trade.profit > 0

                ? "text-green-400"

                : "text-red-400"

              }`}>

              {trade.profit > 0

                ? `+$${trade.profit}`

                : `-$${Math.abs(trade.profit)}`

              }

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}