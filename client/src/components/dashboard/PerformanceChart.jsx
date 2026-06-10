export default function PerformanceChart({

  stats,

}) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Performance

      </h2>

      <p className="text-gray-400 mb-8">

        Win/Loss overview

      </p>

      <div className="flex items-end gap-10 h-60">

        {/* WINS */}

        <div className="flex flex-col items-center">

          <div

            className="w-24 bg-green-500 rounded-t-2xl"

            style={{

              height:
              `${stats.wins * 30}px`

            }}

          />

          <h3 className="mt-4 text-xl font-bold">

            {stats.wins}

          </h3>

          <p className="text-gray-400">

            Wins

          </p>

        </div>



        {/* LOSSES */}

        <div className="flex flex-col items-center">

          <div

            className="w-24 bg-red-500 rounded-t-2xl"

            style={{

              height:
              `${stats.losses * 30}px`

            }}

          />

          <h3 className="mt-4 text-xl font-bold">

            {stats.losses}

          </h3>

          <p className="text-gray-400">

            Losses

          </p>

        </div>

      </div>

    </div>

  );

}