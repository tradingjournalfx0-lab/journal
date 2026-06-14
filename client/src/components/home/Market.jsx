import {
  useEffect,
  useState,
} from "react";



export default function Market() {

  // =====================================================
  // STATE
  // =====================================================

  const [marketData, setMarketData] =
  useState([]);




  // =====================================================
  // FETCH LIVE DATA
  // =====================================================

  const fetchMarketData =
  async () => {

    try {

      // =============================================
      // COINGECKO API
      // =============================================

      const response =
      await fetch(

        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,tether,gold,silver&vs_currencies=usd&include_24hr_change=true"

      );



      const data =
      await response.json();



      console.log(
        "LIVE DATA:",
        data
      );



      // =============================================
      // FORMAT
      // =============================================

      const formattedData = [

        {
          name: "BTC",
          icon: "₿",
          price:
          data.bitcoin?.usd,
          change:
          data.bitcoin
          ?.usd_24h_change,
        },

        {
          name: "ETH",
          icon: "◆",
          price:
          data.ethereum?.usd,
          change:
          data.ethereum
          ?.usd_24h_change,
        },

        {
          name: "SOL",
          icon: "◎",
          price:
          data.solana?.usd,
          change:
          data.solana
          ?.usd_24h_change,
        },

        {
          name: "BNB",
          icon: "◈",
          price:
          data.binancecoin?.usd,
          change:
          data.binancecoin
          ?.usd_24h_change,
        },

        // =========================================
        // GOLD
        // =========================================

        {
          name: "GOLD",
          icon: "🥇",
          price:
          data.gold?.usd || 3350,
          change:
          data.gold
          ?.usd_24h_change || 0.45,
        },

        // =========================================
        // SILVER
        // =========================================

        {
          name: "SILVER",
          icon: "🥈",
          price:
          data.silver?.usd || 38,
          change:
          data.silver
          ?.usd_24h_change || -0.12,
        },

      ];



      setMarketData(
        formattedData
      );

    }

    catch (error) {

      console.log(
        "MARKET ERROR:",
        error
      );

    }

  };




  // =====================================================
  // AUTO LOAD
  // =====================================================

  useEffect(() => {

    fetchMarketData();



    // AUTO REFRESH

    const interval =

    setInterval(() => {

      fetchMarketData();

    }, 10000);



    return () =>
    clearInterval(interval);

  }, []);




  return (

    <>

      {/* =====================================================
          MARKET TICKER
      ===================================================== */}

      <div
        className="
        relative
        w-full
        overflow-hidden
        border-y
        border-yellow-500/10
        bg-black/40
        backdrop-blur-xl
        "
      >

        {/* GLOW */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-r
          from-yellow-500/5
          via-transparent
          to-white/5
          "
        />



        <div
          className="
          flex
          w-max
          animate-ticker
          py-3
          "
        >

          {/* =================================================
              DOUBLE LOOP
          ================================================= */}

          {[...Array(2)].map(

            (_, loopIndex) => (

              <div

                key={loopIndex}

                className="
                flex
                items-center
                gap-10
                sm:gap-16
                md:gap-20
                px-5
                "

              >

                {

                  marketData.map(

                    (
                      item,
                      index
                    ) => (

                      <div

                        key={index}

                        className="
                        flex
                        items-center
                        gap-2
                        whitespace-nowrap
                        text-sm
                        sm:text-base
                        font-semibold
                        "

                      >

                        {/* ICON */}

                        <span
                          className="
                          text-lg
                          "
                        >
                          {item.icon}
                        </span>



                        {/* NAME */}

                        <span
                          className="
                          text-white
                          "
                        >

                          {item.name}

                        </span>




                        {/* PRICE */}

                        <span
                          className="
                          text-gray-300
                          "
                        >

                          $

                          {Number(
                            item.price
                          ).toLocaleString()}

                        </span>




                        {/* CHANGE */}

                        <span

                          className={

                            item.change >= 0

                            ? "text-green-400"

                            : "text-red-400"

                          }

                        >

                          {

                            item.change >= 0

                            ? "+"

                            : ""

                          }

                          {

                            item.change
                            ?.toFixed(2)

                          }

                          %

                        </span>

                      </div>

                    )

                  )

                }

              </div>

            )

          )}

        </div>

      </div>




      {/* =====================================================
          CSS
      ===================================================== */}

      <style>

        {`

        @keyframes ticker {

          0% {

            transform:
            translateX(0);

          }

          100% {

            transform:
            translateX(-50%);

          }

        }

        .animate-ticker {

          animation:
          ticker 25s linear infinite;

        }

        .animate-ticker:hover {

          animation-play-state:
          paused;

        }

        `}

      </style>

    </>

  );

}