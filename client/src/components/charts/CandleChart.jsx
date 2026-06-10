export default function CandleChart() {

  const candles = [
    {
      time: "09:00",
      open: 3340,
      close: 3355,
      high: 3362,
      low: 3332,
      bullish: true,
    },
    {
      time: "10:00",
      open: 3355,
      close: 3345,
      high: 3360,
      low: 3338,
      bullish: false,
    },
    {
      time: "11:00",
      open: 3345,
      close: 3370,
      high: 3378,
      low: 3342,
      bullish: true,
    },
  ];

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="mb-8">

        <h2 className="text-2xl font-bold">
          Candle Overview
        </h2>

      </div>

      <div className="flex items-end gap-6 h-[300px]">

        {candles.map((candle, index) => (

          <div
            key={index}
            className="flex flex-col items-center">

            <div className="relative flex items-center justify-center h-[220px]">

              <div className="absolute w-[2px] h-full bg-white/50" />

              <div
                className={`w-12 rounded-md z-10 ${
                  candle.bullish
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
                style={{
                  height: `${Math.abs(
                    candle.close - candle.open
                  ) * 6}px`,
                }}
              />

            </div>

            <p className="text-sm text-gray-400 mt-4">

              {candle.time}

            </p>

          </div>

        ))}

      </div>

    </div>

  );
}