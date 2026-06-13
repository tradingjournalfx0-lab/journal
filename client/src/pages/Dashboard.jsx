import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";



import Navbar from
"../components/layout/Navbar";

import Sidebar from
"../components/layout/Sidebar";

import StatsCards from
"../components/dashboard/StatsCards";

import EquityChart from
"../components/dashboard/EquityChart";

import PerformanceChart from
"../components/dashboard/PerformanceChart";

import RecentTrades from
"../components/dashboard/RecentTrades";

import SessionOverview from
"../components/dashboard/SessionOverview";



export default function Dashboard() {

  // =====================================================
  // STATES
  // =====================================================

  const [trades, setTrades] =
  useState([]);

  const [loading, setLoading] =
  useState(true);

  const [profile, setProfile] =
  useState(null);

  const [stats, setStats] =
  useState({

    totalProfit: 0,

    totalTrades: 0,

    wins: 0,

    losses: 0,

    winRate: 0,

  });




  // =====================================================
  // FETCH PROFILE
  // =====================================================

  const fetchProfile =
  async () => {

    try {

      const token =
      localStorage.getItem(
        "token"
      );



      if (!token) return;



      const response =
      await api.get(

        "/profile",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      setProfile(
        response.data
      );

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




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



      // =================================================
      // HANDLE RESPONSE TYPES
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



      calculateStats(
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
  // LOAD DATA
  // =====================================================

  useEffect(() => {

    fetchProfile();

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
  // CALCULATE STATS
  // =====================================================

  const calculateStats =
  (data) => {

    let totalProfit = 0;

    let wins = 0;

    let losses = 0;




    data.forEach((trade) => {

      totalProfit +=
      Number(
        trade.profit || 0
      );



      if (

        Number(
          trade.profit
        ) > 0

      ) {

        wins++;

      }

      else {

        losses++;

      }

    });




    const totalTrades =
    data.length;




    const winRate =

    totalTrades > 0

    ? (

        (
          wins /
          totalTrades
        ) * 100

      ).toFixed(1)

    : 0;




    setStats({

      totalProfit,

      totalTrades,

      wins,

      losses,

      winRate,

    });

  };




  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {

    return (

      <div
        className="
        min-h-screen

        flex
        items-center
        justify-center

        bg-[#050816]

        text-white

        px-4
        text-center
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
            border-purple-500/30
            border-t-purple-500

            animate-spin
            "
          />



          {/* TEXT */}

          <h2
            className="
            text-lg
            sm:text-2xl

            font-semibold
            "
          >

            Loading Dashboard...

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
            PAGE CONTENT
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

          overflow-visible
          "
        >




          {/* =====================================================
              HEADER
          ===================================================== */}

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

                Dashboard

              </h1>



              <p
                className="
                text-gray-400

                mt-3

                text-sm
                sm:text-base
                lg:text-lg

                break-words
                leading-7
                "
              >

                Welcome back{" "}

                <span
                  className="
                  text-purple-400
                  font-semibold
                  "
                >

                  {

                    profile?.fullName ||

                    profile?.name ||

                    "Trader"

                  }

                </span>

                {" "}👋

              </p>

            </div>




            {/* RIGHT */}

            <div
              className="
              flex
              flex-wrap

              items-center

              gap-3
              "
            >

              {/* LIVE */}

              <div
                className="
                bg-green-500/10

                border
                border-green-500/20

                px-4
                py-2

                rounded-2xl

                text-green-400

                text-sm
                font-medium

                whitespace-nowrap
                "
              >

                ● Live Market

              </div>




              {/* AI */}

              <div
                className="
                bg-purple-500/10

                border
                border-purple-500/20

                px-4
                py-2

                rounded-2xl

                text-purple-300

                text-sm
                font-medium

                whitespace-nowrap
                "
              >

                AI Analytics Enabled

              </div>

            </div>

          </div>




          {/* =====================================================
              STATS
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8
            "
          >

            <StatsCards
              stats={stats}
            />

          </div>




          {/* =====================================================
              CHARTS
          ===================================================== */}

          <div
            className="
            grid

            grid-cols-1
            xl:grid-cols-2

            gap-4
            sm:gap-6

            mt-6
            sm:mt-8
            "
          >

            {/* EQUITY */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              p-2

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <EquityChart
                trades={trades}
              />

            </div>




            {/* PERFORMANCE */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              p-2

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <PerformanceChart
                stats={stats}
              />

            </div>

          </div>




          {/* =====================================================
              RECENT + SESSION
          ===================================================== */}

          <div
            className="
            grid

            grid-cols-1
            xl:grid-cols-2

            gap-4
            sm:gap-6

            mt-6
            sm:mt-8
            "
          >

            {/* RECENT */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              p-2

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <RecentTrades
                trades={trades}
              />

            </div>




            {/* SESSION */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              p-2

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <SessionOverview
                trades={trades}
              />

            </div>

          </div>




          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {

            trades.length === 0 && (

              <div
                className="
                mt-8
                sm:mt-10

                bg-white/5

                border
                border-white/10

                rounded-2xl
                sm:rounded-3xl

                p-6
                sm:p-10

                text-center

                backdrop-blur-xl
                "
              >

                {/* ICON */}

                <div
                  className="
                  w-20
                  h-20

                  mx-auto

                  rounded-full

                  bg-purple-500/10

                  border
                  border-purple-500/20

                  flex
                  items-center
                  justify-center

                  text-4xl
                  "
                >

                  📈

                </div>




                {/* TITLE */}

                <h2
                  className="
                  text-2xl
                  sm:text-3xl

                  font-bold

                  mt-6
                  "
                >

                  No Trades Yet

                </h2>




                {/* TEXT */}

                <p
                  className="
                  text-gray-400

                  mt-4

                  text-sm
                  sm:text-base

                  max-w-xl

                  mx-auto

                  leading-8
                  "
                >

                  Start adding trades
                  to unlock powerful analytics,
                  AI insights,
                  and performance tracking.

                </p>

              </div>

            )

          }

        </main>

      </div>

    </div>

  );

}