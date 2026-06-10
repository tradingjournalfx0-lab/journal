
export default function SessionStats({

  analytics,

}) {

  const sessions =

  analytics?.sessions || {};

  const total =

  analytics?.totalTrades || 1;

  const london =
  sessions.london || 0;

  const newYork =
  sessions.newYork || 0;

  const asia =
  sessions.asia || 0;

  return (

    <div className="
    bg-white/5
    border border-white/10
    rounded-3xl
    p-6
    ">

      <h2 className="text-2xl font-bold mb-6">

        Session Stats

      </h2>

      <div className="space-y-6">




        {/* LONDON */}

        <div>

          <div className="flex justify-between mb-2">

            <span>London</span>

            <span>{london}</span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full">

            <div

              className="h-3 bg-blue-500 rounded-full"

              style={{

                width:
                `${(london/total)*100}%`

              }}

            />

          </div>

        </div>





        {/* NEW YORK */}

        <div>

          <div className="flex justify-between mb-2">

            <span>New York</span>

            <span>{newYork}</span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full">

            <div

              className="h-3 bg-purple-500 rounded-full"

              style={{

                width:
                `${(newYork/total)*100}%`

              }}

            />

          </div>

        </div>





        {/* ASIA */}

        <div>

          <div className="flex justify-between mb-2">

            <span>Asia</span>

            <span>{asia}</span>

          </div>

          <div className="w-full h-3 bg-white/10 rounded-full">

            <div

              className="h-3 bg-green-500 rounded-full"

              style={{

                width:
                `${(asia/total)*100}%`

              }}

            />

          </div>

        </div>

      </div>

    </div>

  );

}

