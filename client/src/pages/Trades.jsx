import {
  useState,
  useEffect,
} from "react";

import api from "../services/api";



// =====================================================
// EXPORT FUNCTIONS
// =====================================================

import exportCSV from "../utils/exportCSV";
import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";



// =====================================================
// COMPONENTS
// =====================================================

import Sidebar from
"../components/layout/Sidebar";

import Navbar from
"../components/layout/Navbar";

import TradeFilters from
"../components/trades/TradeFilters";

import TradeTable from
"../components/trades/TradeTable";



export default function Trades() {

  // =====================================================
  // STATES
  // =====================================================

  const [trades, setTrades] =
  useState([]);

  const [loading, setLoading] =
  useState(true);




  // =====================================================
  // FETCH TRADES
  // =====================================================

  const fetchTrades =
  async () => {

    try {

      const token =
      localStorage.getItem(
        "token"
      );



      if (!token) {

        setLoading(false);

        return;

      }




      // =================================================
      // API
      // =================================================

      const response =
      await api.get(

        "/trades",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      console.log(
        "TRADES:",
        response.data
      );




      // =================================================
      // HANDLE RESPONSE
      // =================================================

      const tradesData =

      Array.isArray(response.data)

      ? response.data

      : Array.isArray(response.data.data)

      ? response.data.data

      : Array.isArray(response.data.trades)

      ? response.data.trades

      : [];



      setTrades(
        tradesData
      );

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

    finally {

      setLoading(false);

    }

  };




  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {

    fetchTrades();




    // =================================================
    // LIVE AUTO REFRESH
    // =================================================

    const interval =

    setInterval(() => {

      fetchTrades();

    }, 5000);




    return () => {

      clearInterval(
        interval
      );

    };

  }, []);




  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {

    return (

      <div
        className="
        min-h-screen

        bg-[#050816]

        flex
        items-center
        justify-center

        text-white

        px-4
        "
      >

        <div
          className="
          flex
          flex-col
          items-center
          gap-5
          "
        >

          {/* LOADER */}

          <div
            className="
            w-16
            h-16

            rounded-full

            border-4
            border-purple-500/20
            border-t-purple-500

            animate-spin
            "
          />



          {/* TEXT */}

          <h2
            className="
            text-xl
            sm:text-2xl

            font-semibold
            "
          >

            Loading Trades...

          </h2>

        </div>

      </div>

    );

  }




  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
      flex

      min-h-screen

      bg-[#050816]
      text-white

      w-full
      max-w-full

      overflow-hidden
      "
    >




      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />




      {/* =====================================================
          MAIN WRAPPER
      ===================================================== */}

      <div
        className="
        flex-1

        flex
        flex-col

        w-full
        min-w-0

        lg:ml-72
        "
      >




        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <div
          className="
          sticky
          top-0
          z-40

          px-4
          sm:px-6
          lg:px-8

          pt-4

          bg-[#050816]/80

          backdrop-blur-xl
          "
        >

          <Navbar />

        </div>




        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main
          className="
          flex-1

          w-full
          min-w-0

          px-4
          sm:px-6
          lg:px-8

          py-6
          sm:py-8
          "
        >




          {/* =====================================================
              PAGE HEADER
          ===================================================== */}

          <div
            className="
            flex
            flex-col
            xl:flex-row

            xl:items-center
            xl:justify-between

            gap-6
            "
          >

            {/* LEFT */}

            <div
              className="
              min-w-0
              "
            >

              <h1
                className="
                text-3xl
                sm:text-4xl
                lg:text-5xl

                font-black

                break-words
                "
              >

                Trades

              </h1>



              <p
                className="
                text-gray-400

                mt-3

                text-sm
                sm:text-base
                lg:text-lg

                leading-7
                "
              >

                Manage,
                analyze,
                and review
                all your
                trading activity.

              </p>

            </div>




            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div
              className="
              flex
              flex-wrap

              gap-3

              w-full
              xl:w-auto
              "
            >

              {/* CSV */}

              <button

                onClick={() =>

                  exportCSV(trades)

                }

                className="
                flex-1
                sm:flex-none

                min-w-[140px]

                bg-green-600
                hover:bg-green-700

                px-5
                py-3

                rounded-2xl

                font-semibold

                transition-all
                duration-300

                shadow-lg
                shadow-green-500/20

                text-sm
                sm:text-base
                "

              >

                Export CSV

              </button>




              {/* PDF */}

              <button

                onClick={() =>

                  exportPDF(trades)

                }

                className="
                flex-1
                sm:flex-none

                min-w-[140px]

                bg-red-600
                hover:bg-red-700

                px-5
                py-3

                rounded-2xl

                font-semibold

                transition-all
                duration-300

                shadow-lg
                shadow-red-500/20

                text-sm
                sm:text-base
                "

              >

                Export PDF

              </button>




              {/* EXCEL */}

              <button

                onClick={() =>

                  exportExcel(trades)

                }

                className="
                flex-1
                sm:flex-none

                min-w-[140px]

                bg-blue-600
                hover:bg-blue-700

                px-5
                py-3

                rounded-2xl

                font-semibold

                transition-all
                duration-300

                shadow-lg
                shadow-blue-500/20

                text-sm
                sm:text-base
                "

              >

                Export Excel

              </button>

            </div>

          </div>




          {/* =====================================================
              TOP INFO CARD
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8

            bg-gradient-to-r
            from-purple-500/10
            to-fuchsia-500/10

            border
            border-purple-500/20

            rounded-3xl

            p-5
            sm:p-6

            backdrop-blur-xl
            "
          >

            <div
              className="
              flex
              flex-col
              lg:flex-row

              lg:items-center
              lg:justify-between

              gap-5
              "
            >

              {/* TEXT */}

              <div>

                <h2
                  className="
                  text-xl
                  sm:text-2xl

                  font-bold
                  "
                >

                  Professional Trade Management

                </h2>



                <p
                  className="
                  text-gray-400

                  mt-2

                  leading-7

                  text-sm
                  sm:text-base
                  "
                >

                  Track,
                  edit,
                  analyze,
                  and export
                  all your trades
                  with AI-powered
                  trading analytics.

                </p>

              </div>




              {/* STATS */}

              <div
                className="
                flex
                flex-wrap

                gap-4
                "
              >

                {/* TOTAL */}

                <div
                  className="
                  px-5
                  py-4

                  rounded-2xl

                  bg-black/20

                  border
                  border-white/10
                  "
                >

                  <p
                    className="
                    text-gray-400
                    text-sm
                    "
                  >

                    Total Trades

                  </p>

                  <h3
                    className="
                    text-2xl
                    font-bold
                    mt-1
                    "
                  >

                    {trades.length}

                  </h3>

                </div>




                {/* PROFIT */}

                <div
                  className="
                  px-5
                  py-4

                  rounded-2xl

                  bg-black/20

                  border
                  border-white/10
                  "
                >

                  <p
                    className="
                    text-gray-400
                    text-sm
                    "
                  >

                    Net Profit

                  </p>

                  <h3
                    className="
                    text-2xl
                    font-bold
                    text-green-400
                    mt-1
                    "
                  >

                    $

                    {

                      trades.reduce(

                        (acc, trade) =>

                        acc +

                        Number(
                          trade.profit || 0
                        ),

                        0

                      ).toFixed(2)

                    }

                  </h3>

                </div>

              </div>

            </div>

          </div>




          {/* =====================================================
              FILTERS
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8

            w-full
            max-w-full
            "
          >

            <TradeFilters />

          </div>




          {/* =====================================================
              TABLE
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8

            w-full
            max-w-full
            "
          >

            <TradeTable

              trades={trades}

              refreshTrades={
                fetchTrades
              }

            />

          </div>

        </main>

      </div>

    </div>

  );

}