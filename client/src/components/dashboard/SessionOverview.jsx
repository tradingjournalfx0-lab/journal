export default function SessionOverview({

  trades,

}) {

  const london =
  trades.filter(

    (trade)=>
    trade.session === "London"

  );

  const newYork =
  trades.filter(

    (trade)=>
    trade.session === "New York"

  );

  const asia =
  trades.filter(

    (trade)=>
    trade.session === "Asia"

  );



  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Session Overview

      </h2>

      <p className="text-gray-400 mb-8">

        Session-wise performance

      </p>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span>

            London

          </span>

          <span className="text-blue-400 font-bold">

            {london.length}

          </span>

        </div>

        <div className="flex justify-between">

          <span>

            New York

          </span>

          <span className="text-purple-400 font-bold">

            {newYork.length}

          </span>

        </div>

        <div className="flex justify-between">

          <span>

            Asia

          </span>

          <span className="text-green-400 font-bold">

            {asia.length}

          </span>

        </div>

      </div>

    </div>

  );

}