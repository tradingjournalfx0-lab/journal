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

        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true"

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
          price:
          data.bitcoin.usd,
          change:
          data.bitcoin
          .usd_24h_change,
        },

        {
          name: "ETH",
          price:
          data.ethereum.usd,
          change:
          data.ethereum
          .usd_24h_change,
        },

        {
          name: "SOL",
          price:
          data.solana.usd,
          change:
          data.solana
          .usd_24h_change,
        },

        {
          name: "BNB",
          price:
          data.binancecoin.usd,
          change:
          data.binancecoin
          .usd_24h_change,
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
        border-white/10
        bg-black/40
        backdrop-blur-xl
        "
      >

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

                        {/* NAME */}

                        <span className="
                        text-white
                        ">

                          {item.name}

                        </span>




                        {/* PRICE */}

                        <span className="
                        text-gray-300
                        ">

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

        `}

      </style>

    </>

  );

}