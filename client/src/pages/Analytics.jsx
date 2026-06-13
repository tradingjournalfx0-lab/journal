import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";



import Sidebar from
"../components/layout/Sidebar";

import Navbar from
"../components/layout/Navbar";

import WinRateChart from
"../components/analytics/WinRateChart";

import MonthlyProfit from
"../components/analytics/MonthlyProfit";

import DrawdownChart from
"../components/analytics/DrawdownChart";

import HeatMap from
"../components/analytics/HeatMap";

import SessionStats from
"../components/analytics/SessionStats";

import PsychologyStats from
"../components/analytics/PsychologyStats";

import RiskRewardChart from
"../components/analytics/RiskRewardChart";



export default function Analytics() {

  // =====================================================
  // STATES
  // =====================================================

  const [analytics, setAnalytics] =
  useState(null);

  const [loading, setLoading] =
  useState(true);

  const [profile, setProfile] =
  useState(null);

  const [lastUpdate, setLastUpdate] =
  useState("");

  const [refreshKey, setRefreshKey] =
  useState(0);




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
  // FETCH ANALYTICS
  // =====================================================

  const fetchAnalytics =
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

        "/analytics",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      console.log(
        "ANALYTICS:",
        response.data
      );



      // =================================================
      // HANDLE RESPONSE TYPES
      // =================================================

      const analyticsData =

      response.data?.data ||

      response.data?.analytics ||

      response.data;



      setAnalytics(
        analyticsData
      );



      // =================================================
      // REFRESH KEY
      // =================================================

      setRefreshKey(

        prev => prev + 1

      );



      // =================================================
      // LAST UPDATE
      // =================================================

      setLastUpdate(

        new Date()
        .toLocaleTimeString()

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
  // AUTO LOAD
  // =====================================================

  useEffect(() => {

    fetchProfile();

    fetchAnalytics();




    // =================================================
    // LIVE REFRESH
    // =================================================

    const interval =

    setInterval(() => {

      fetchAnalytics();

    }, 5000);




    return () => {

      clearInterval(
        interval
      );

    };

  }, []);




  // =====================================================
  // LOADING
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

            border-4
            border-purple-500/20
            border-t-purple-500

            rounded-full

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

            Loading Analytics...

          </h2>

        </div>

      </div>

    );

  }




  // =====================================================
  // ERROR
  // =====================================================

  if (!analytics) {

    return (

      <div
        className="
        min-h-screen
        bg-[#050816]

        flex
        items-center
        justify-center

        px-4
        "
      >

        <div
          className="
          bg-red-500/10

          border
          border-red-500/20

          rounded-3xl

          p-10

          text-center

          max-w-lg
          "
        >

          {/* ICON */}

          <div
            className="
            text-6xl
            "
          >

            ⚠️

          </div>



          {/* TITLE */}

          <h2
            className="
            text-2xl
            sm:text-3xl

            font-bold

            text-red-400

            mt-5
            "
          >

            Failed To Load Analytics

          </h2>



          {/* TEXT */}

          <p
            className="
            text-gray-400

            mt-4

            leading-7
            "
          >

            Please check your
            backend connection
            and analytics API.

          </p>

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

                Analytics

              </h1>



              <p
                className="
                text-gray-400

                mt-3

                text-sm
                sm:text-base
                lg:text-lg

                leading-7
                break-words
                "
              >

                Analyze your trading
                performance,

                <span
                  className="
                  text-purple-400
                  font-semibold
                  ml-2
                  "
                >

                  {

                    profile?.fullName ||

                    profile?.name ||

                    "Trader"

                  }

                </span>

                {" "}📊

              </p>

            </div>




            {/* =================================================
                LIVE STATUS
            ================================================= */}

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

                px-5
                py-3

                rounded-2xl

                text-green-400

                flex
                items-center

                gap-3

                w-fit

                text-sm
                sm:text-base
                "
              >

                <span
                  className="
                  w-3
                  h-3

                  bg-green-400

                  rounded-full

                  animate-pulse
                  "
                />

                Live Updated

                <span
                  className="
                  text-gray-400

                  text-xs
                  sm:text-sm
                  "
                >

                  {lastUpdate}

                </span>

              </div>




              {/* AI */}

              <div
                className="
                bg-purple-500/10

                border
                border-purple-500/20

                px-5
                py-3

                rounded-2xl

                text-purple-300

                text-sm
                sm:text-base
                "
              >

                AI Analytics Enabled

              </div>

            </div>

          </div>




          {/* =====================================================
              EMPTY STATE
          ===================================================== */}

          {

            analytics.totalTrades === 0 ? (

              <div
                className="
                mt-10

                bg-white/5

                border
                border-white/10

                rounded-3xl

                p-6
                sm:p-10

                text-center

                backdrop-blur-xl
                "
              >

                {/* ICON */}

                <div
                  className="
                  w-24
                  h-24

                  mx-auto

                  rounded-full

                  bg-purple-500/10

                  border
                  border-purple-500/20

                  flex
                  items-center
                  justify-center

                  text-5xl
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

                  No Analytics Yet

                </h2>



                {/* TEXT */}

                <p
                  className="
                  text-gray-400

                  mt-4

                  max-w-xl

                  mx-auto

                  leading-8

                  text-sm
                  sm:text-base
                  "
                >

                  Add trades to unlock
                  advanced analytics,
                  performance insights,
                  drawdown analysis,
                  psychology tracking,
                  and AI reports.

                </p>

              </div>

            ) : (

              <div
                className="
                grid

                grid-cols-1
                xl:grid-cols-2

                gap-4
                sm:gap-6

                mt-8
                "
              >




                {/* WIN RATE */}

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

                  <WinRateChart

                    key={`win-${refreshKey}`}

                    analytics={analytics}

                  />

                </div>




                {/* MONTHLY */}

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

                  <MonthlyProfit

                    key={`monthly-${refreshKey}`}

                    analytics={analytics}

                  />

                </div>




                {/* DRAWDOWN */}

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

                  <DrawdownChart

                    key={`draw-${refreshKey}`}

                    analytics={analytics}

                  />

                </div>




                {/* HEATMAP */}

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

                  <HeatMap

                    key={`heat-${refreshKey}`}

                    analytics={analytics}

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

                  <SessionStats

                    key={`session-${refreshKey}`}

                    analytics={analytics}

                  />

                </div>




                {/* PSYCHOLOGY */}

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

                  <PsychologyStats

                    key={`psy-${refreshKey}`}

                    analytics={analytics}

                  />

                </div>




                {/* RISK */}

                <div
                  className="
                  min-w-0

                  xl:col-span-2

                  bg-white/5

                  border
                  border-white/10

                  rounded-3xl

                  p-2

                  backdrop-blur-xl

                  overflow-hidden
                  "
                >

                  <RiskRewardChart

                    key={`risk-${refreshKey}`}

                    analytics={analytics}

                  />

                </div>

              </div>

            )

          }

        </main>

      </div>

    </div>

  );

}