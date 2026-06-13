export default function Market() {

  return (
    
    <>
       {/* =====================================================
            LIVE MARKET TICKER
        ===================================================== */}

        <div
          className="
          absolute
          top-24
          w-full
          overflow-hidden
          border-y
          border-white/10
          bg-black/30
          backdrop-blur-xl
          z-20
          "
        >

          <div
            className="
            flex
            gap-20
            whitespace-nowrap
            animate-[ticker_20s_linear_infinite]
            py-3
            text-sm
            font-medium
            "
          >

            <span className="text-green-400">
              BTC +2.54%
            </span>

            <span className="text-red-400">
              ETH -1.32%
            </span>

            <span className="text-green-400">
              NIFTY +0.87%
            </span>

            <span className="text-green-400">
              GOLD +1.14%
            </span>

            <span className="text-red-400">
              NASDAQ -0.65%
            </span>

            <span className="text-green-400">
              BANKNIFTY +1.20%
            </span>

          </div>

        </div>

        </>

      )
    }
