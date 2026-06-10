export default function StatsCards({

  stats,

}) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

      {/* TOTAL PROFIT */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h3 className="text-gray-400">

          Total Profit

        </h3>

        <h2 className={`text-5xl font-bold mt-4

          ${stats.totalProfit >= 0

            ? "text-green-400"

            : "text-red-400"

          }`}>

          ${stats.totalProfit}

        </h2>

      </div>



      {/* WIN RATE */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h3 className="text-gray-400">

          Win Rate

        </h3>

        <h2 className="text-5xl font-bold mt-4 text-blue-400">

          {stats.winRate}%

        </h2>

      </div>



      {/* WINNING */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h3 className="text-gray-400">

          Winning Trades

        </h3>

        <h2 className="text-5xl font-bold mt-4 text-purple-400">

          {stats.wins}

        </h2>

      </div>



      {/* TOTAL */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h3 className="text-gray-400">

          Total Trades

        </h3>

        <h2 className="text-5xl font-bold mt-4">

          {stats.totalTrades}

        </h2>

      </div>

    </div>

  );

}