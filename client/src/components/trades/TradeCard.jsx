export default function TradeCard({ trade }) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-300">




      {/* TOP */}

      <div className="flex items-center justify-between">




        {/* LEFT */}

        <div>

          {/* SYMBOL */}

          <h3 className="text-2xl font-bold text-white">

            {trade?.symbol
              ? trade.symbol
              : "N/A"}

          </h3>




          {/* STRATEGY */}

          <p className="text-gray-400 text-sm mt-1">

            {trade?.strategy
              ? trade.strategy
              : "No Strategy"}

          </p>




          {/* SESSION */}

          <div className="mt-3 inline-block px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-semibold">

            {trade?.session
              ? trade.session
              : "No Session"}

          </div>

        </div>




        {/* SIDE */}

        <div
          className={`px-4 py-2 rounded-xl font-semibold

            ${trade?.side === "BUY"

              ? "bg-green-500/20 text-green-400"

              : "bg-red-500/20 text-red-400"

            }`}>

          {trade?.side
            ? trade.side
            : "N/A"}

        </div>

      </div>




      {/* ENTRY EXIT */}

      <div className="grid grid-cols-2 gap-4 mt-6">




        {/* ENTRY */}

        <div>

          <p className="text-gray-400 text-sm">

            Entry

          </p>

          <h4 className="font-bold text-lg">

            {trade?.entry ?? 0}

          </h4>

        </div>




        {/* EXIT */}

        <div>

          <p className="text-gray-400 text-sm">

            Exit

          </p>

          <h4 className="font-bold text-lg">

            {trade?.exit ?? 0}

          </h4>

        </div>

      </div>




      {/* PROFIT */}

      <div className="mt-6">

        <p className="text-gray-400 text-sm">

          Profit

        </p>

        <h2
          className={`text-3xl font-bold

            ${Number(trade?.profit) > 0

              ? "text-green-400"

              : "text-red-400"

            }`}>

          ${Number(trade?.profit || 0)}

        </h2>

      </div>

    </div>

  );

}