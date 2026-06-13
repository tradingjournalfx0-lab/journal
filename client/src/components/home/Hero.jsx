import { Link } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

import CountUp
from "react-countup";

import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";



export default function Hero() {

  // =====================================================
  // STATES
  // =====================================================

  const [stats, setStats] =
  useState({

    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,

  });



  const [liveMode, setLiveMode] =
  useState(false);




  // =====================================================
  // MOUSE PARALLAX
  // =====================================================

  const mouseX =
  useMotionValue(0);

  const mouseY =
  useMotionValue(0);



  const rotateX =
  useTransform(
    mouseY,
    [-300, 300],
    [10, -10]
  );



  const rotateY =
  useTransform(
    mouseX,
    [-300, 300],
    [-10, 10]
  );



  const handleMouseMove =
  (e) => {

    const rect =
    e.currentTarget
    .getBoundingClientRect();

    mouseX.set(
      e.clientX -
      rect.left -
      rect.width / 2
    );

    mouseY.set(
      e.clientY -
      rect.top -
      rect.height / 2
    );

  };




  // =====================================================
  // FETCH LIVE STATS
  // =====================================================

  const fetchTrades =
  async () => {

    try {

      const token =
      localStorage.getItem(
        "token"
      );



      console.log(
        "TOKEN:",
        token
      );



      // =========================================
      // NO TOKEN
      // =========================================

      if (!token) {

        setLiveMode(false);

        return;

      }



      // =========================================
      // API CALL
      // =========================================

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
        "API RESPONSE:",
        response.data
      );



      // =========================================
      // HANDLE ALL API FORMATS
      // =========================================

      const trades =

      Array.isArray(response.data)

      ? response.data

      : Array.isArray(response.data.data)

      ? response.data.data

      : Array.isArray(response.data.trades)

      ? response.data.trades

      : [];



      console.log(
        "FINAL TRADES:",
        trades
      );



      // =========================================
      // TOTAL TRADES
      // =========================================

      const totalTrades =
      trades.length;



      // =========================================
      // WINS
      // =========================================

      const wins =
      trades.filter(

        (trade) =>

        Number(
          trade.profit
        ) > 0

      ).length;



      // =========================================
      // TOTAL PROFIT
      // =========================================

      const totalProfit =
      trades.reduce(

        (acc, trade) =>

        acc +
        Number(
          trade.profit || 0
        ),

        0

      );



      // =========================================
      // WIN RATE
      // =========================================

      const winRate =

      totalTrades > 0

      ? (

          (
            wins /
            totalTrades
          ) * 100

        ).toFixed(1)

      : 0;



      // =========================================
      // UPDATE STATS
      // =========================================

      setStats({

        totalTrades,
        winRate,
        totalProfit,

      });



      // =========================================
      // LIVE MODE
      // =========================================

      setLiveMode(
        totalTrades > 0
      );

    }

    catch (error) {

      console.log(

        "API ERROR:",

        error.response?.data ||

        error.message

      );



      setLiveMode(false);

    }

  };




  // =====================================================
  // AUTO LOAD
  // =====================================================

  useEffect(() => {

    fetchTrades();

  }, []);




  return (

    <>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section

        onMouseMove={
          handleMouseMove
        }

        className="
        relative
        min-h-screen
        overflow-hidden
        overflow-x-hidden
        bg-black
        text-white
        "
      >




        {/* =====================================================
            BACKGROUND VIDEO
        ===================================================== */}

        <video

          autoPlay
          muted
          loop
          playsInline

          className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          opacity-30
          md:opacity-40
          "

        >

          <source
            src="/bg.mp4"
            type="video/mp4"
          />

        </video>




        {/* =====================================================
            OVERLAY
        ===================================================== */}

        <div
          className="
          absolute
          inset-0
          bg-black/60
          "
        />




        {/* =====================================================
            ANIMATED GRADIENT
        ===================================================== */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-r
          from-purple-900/40
          via-black/40
          to-fuchsia-900/40
          animate-pulse
          "
        />




        {/* =====================================================
            PARTICLES
        ===================================================== */}

        <div
          className="
          absolute
          inset-0
          overflow-hidden
          opacity-20
          "
        >

          <div className="
          absolute
          top-20
          left-20
          w-2
          h-2
          bg-white
          rounded-full
          animate-ping
          " />



          <div className="
          absolute
          top-40
          right-40
          w-2
          h-2
          bg-purple-400
          rounded-full
          animate-pulse
          " />



          <div className="
          absolute
          bottom-40
          left-1/3
          w-3
          h-3
          bg-fuchsia-400
          rounded-full
          animate-bounce
          " />

        </div>




        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div
          className="
          relative
          z-30
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pt-28
          md:pt-32
          pb-10
          md:pb-15
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-5
          md:gap-10
          xl:gap-15
          items-center
          "
        >




          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div>

            <div
              className="
              inline-flex
              items-center
              gap-3
              bg-purple-500/10
              border
              border-purple-500/20
              backdrop-blur-xl
              px-1
              sm:px-5
              py-3
              rounded-2xl
              mb-1
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



              <span className="
              text-purple-300
              text-sm
              sm:text-base
              ">

                Smart Trading Journal Platform

                <br />

                Powered by Raftar Trader FX

              </span>

            </div>




            {/* =====================================================
                TITLE
            ===================================================== */}

            <h1
              className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              xl:text-7xl
              font-black
              leading-tight
              "
            >

              Master Your

              <br />

              <span
                className="
                bg-gradient-to-r
                from-purple-400
                via-fuchsia-400
                to-pink-400
                bg-clip-text
                text-transparent
                "
              >

                Trading

              </span>

              {" "}Journey

            </h1>




            {/* =====================================================
                DESCRIPTION
            ===================================================== */}

            <p
              className="
              text-gray-300
              text-base
              sm:text-lg
              md:text-xl
              leading-8
              md:leading-10
              mt-4
              max-w-2xl
              "
            >

              Track your trades,
              analyze your performance,
              improve psychology,
              and become a profitable trader
              with AI-powered analytics.

            </p>




            {/* =====================================================
                BUTTONS
            ===================================================== */}

            <div
              className="
              flex
              flex-col
              sm:flex-row
              flex-wrap
              gap-4
              sm:gap-5
              w-full
              sm:w-auto
              mt-5
              "
            >

              {

                liveMode ? (

                  <Link

                    to="/dashboard"

                    className="
                    w-full
                    sm:w-auto
                    text-center
                    px-8
                    py-5
                    rounded-2xl
                    bg-gradient-to-r
                    from-purple-600
                    to-fuchsia-600
                    hover:scale-105
                    transition-all
                    duration-300
                    font-semibold
                    text-lg
                    shadow-2xl
                    shadow-purple-500/30
                    "

                  >

                    Open Dashboard

                  </Link>

                ) : (

                  <>

                    <Link

                      to="/register"

                      className="
                      w-full
                      sm:w-auto
                      text-center
                      px-8
                      py-5
                      rounded-2xl
                      bg-gradient-to-r
                      from-purple-600
                      to-fuchsia-600
                      hover:scale-105
                      transition-all
                      duration-300
                      font-semibold
                      text-lg
                      shadow-2xl
                      shadow-purple-500/30
                      "

                    >

                      Start Free

                    </Link>




                    <Link

                      to="/subscription"

                      className="
                      w-full
                      sm:w-auto
                      text-center
                      px-8
                      py-5
                      rounded-2xl
                      bg-white/10
                      hover:bg-white/20
                      border
                      border-white/10
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      font-semibold
                      text-lg
                      "

                    >

                      View Pricing

                    </Link>

                  </>

                )

              }

            </div>




            {/* =====================================================
                FLOATING STATS
            ===================================================== */}

            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
              md:gap-6
              mt-14
              "
            >

              <div
                className="
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
                px-6
                py-5
                rounded-3xl
                animate-bounce
                "
              >

                <p className="text-gray-400">
                  Traders
                </p>

                <h2 className="
                text-2xl
                sm:text-3xl
                font-bold
                ">

                  <CountUp
                    end={12000}
                    duration={3}
                  />

                  +

                </h2>

              </div>




              <div
                className="
                bg-white/5
                border
                border-white/10
                backdrop-blur-xl
                px-6
                py-5
                rounded-3xl
                animate-pulse
                "
              >

                <p className="text-gray-400">
                  Accuracy
                </p>

                <h2 className="
                text-2xl
                sm:text-3xl
                font-bold
                ">

                  <CountUp
                    end={94}
                    duration={3}
                  />

                  %

                </h2>

              </div>

            </div>

          </div>




          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <motion.div

            style={{
              rotateX,
              rotateY,
            }}

            className="
            relative
            w-full
            "
          >

            <div
              className="
              absolute
              inset-0
              bg-purple-500/20
              blur-[120px]
              "
            />




            {/* =====================================================
                DASHBOARD CARD
            ===================================================== */}

            <div
              className="
              relative
              bg-white/5
              border
              border-white/10
              backdrop-blur-2xl
              rounded-[30px]
              md:rounded-[40px]
              p-5
              sm:p-6
              md:p-8
              shadow-2xl
              "
            >

              {/* =====================================================
                  HEADER
              ===================================================== */}

              <div
                className="
                flex
                items-center
                justify-between
                gap-4
                "
              >

                <div>

                  <h2
                    className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-bold
                    "
                  >

                    Trading Dashboard

                  </h2>



                  <p
                    className="
                    text-gray-400
                    mt-2
                    text-sm
                    sm:text-base
                    "
                  >

                    {

                      liveMode

                      ? "Live Performance"

                      : "Demo Performance"

                    }

                  </p>

                </div>




                <div
                  className="
                  bg-green-500/20
                  text-green-400
                  px-4
                  sm:px-5
                  py-2
                  sm:py-3
                  rounded-2xl
                  text-sm
                  sm:text-base
                  "
                >

                  {

                    liveMode

                    ? "Live"

                    : "Demo"

                  }

                </div>

              </div>




              {/* =====================================================
                  TOTAL PROFIT
              ===================================================== */}

              <div
                className="
                bg-black/20
                rounded-3xl
                p-5
                sm:p-6
                md:p-8
                mt-5
                "
              >

                <p className="
                text-gray-400
                ">

                  Total Profit

                </p>



                <h2
                  className={`
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  font-black
                  mt-3

                  ${

                    liveMode

                    ? stats.totalProfit >= 0

                      ? "text-green-400"

                      : "text-red-400"

                    : "text-green-400"

                  }

                  `}
                >

                  $

                  <CountUp
                    end={
                      liveMode
                      ? stats.totalProfit
                      : 7058
                    }
                    duration={3}
                  />

                </h2>

              </div>




              {/* =====================================================
                  STATS
              ===================================================== */}

              <div
                className="
                grid
                grid-cols-2
                gap-4
                sm:gap-5
                mt-6
                "
              >

                {/* =====================================================
                    WIN RATE
                ===================================================== */}

                <div
                  className="
                  bg-black/20
                  rounded-3xl
                  p-4
                  sm:p-6
                  "
                >

                  <p className="
                  text-gray-400
                  text-sm
                  sm:text-base
                  ">

                    Win Rate

                  </p>



                  <h2 className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-bold
                  mt-3
                  ">

                    <CountUp
                      end={
                        liveMode
                        ? Number(stats.winRate)
                        : 74
                      }
                      duration={3}
                    />

                    %

                  </h2>

                </div>




                {/* =====================================================
                    TRADES
                ===================================================== */}

                <div
                  className="
                  bg-black/20
                  rounded-3xl
                  p-4
                  sm:p-6
                  "
                >

                  <p className="
                  text-gray-400
                  text-sm
                  sm:text-base
                  ">

                    Trades

                  </p>



                  <h2 className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-bold
                  mt-3
                  ">

                    <CountUp
                      end={
                        liveMode
                        ? stats.totalTrades
                        : 196
                      }
                      duration={3}
                    />

                  </h2>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </>

  );

}