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



export default function Hero({ isLoggedIn }) {

  // =====================================================
  // STATES
  // =====================================================

  const [stats, setStats] =
  useState({

    totalTrades: 0,
    winRate: 0,
    totalProfit: 0,

  });




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



      if (!token) {
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



      const trades =
      response.data || [];



      // TOTAL TRADES

      const totalTrades =
      trades.length;



      // WINS

      const wins =
      trades.filter(

        (trade) =>

        Number(trade.profit) > 0

      ).length;



      // TOTAL PROFIT

      const totalProfit =
      trades.reduce(

        (acc, trade) =>

        acc +
        Number(
          trade.profit || 0
        ),

        0

      );



      // WIN RATE

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

        totalTrades,
        winRate,
        totalProfit,

      });

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =====================================================
  // AUTO LOAD
  // =====================================================

  useEffect(() => {

    if (isLoggedIn) {

      fetchTrades();

    }

  }, [isLoggedIn]);




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
          opacity-40
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
          bg-black/50
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
          opacity-40
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



          <div className="
          absolute
          bottom-20
          right-1/4
          w-2
          h-2
          bg-cyan-400
          rounded-full
          animate-ping
          " />

        </div>




        {/* =====================================================
            GLASS NAVBAR
        ===================================================== */}

        <nav
          className="
          fixed
          top-0
          left-0
          w-full
          z-50
          backdrop-blur-2xl
          bg-white/5
          border-b
          border-white/10
          "
        >
{/* 
          <div
            className="
            max-w-7xl
            mx-auto
            px-6
            py-5
            flex
            items-center
            justify-between
            "
          >

            <h1
              className="
              text-2xl
              font-black
              bg-gradient-to-r
              from-purple-400
              to-fuchsia-500
              bg-clip-text
              text-transparent
              "
            >

              Raftar Trader FX

            </h1>




            <div
              className="
              hidden
              md:flex
              items-center
              gap-10
              text-gray-300
              "
            >

              <a href="#">
                Features
              </a>

              <a href="#">
                Pricing
              </a>

              <a href="#">
                Dashboard
              </a>

            </div>




            <Link

              to="/register"

              className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-fuchsia-600
              font-semibold
              hover:scale-105
              transition-all
              duration-300
              "

            >

              Get Started

            </Link>

          </div> */}

        </nav>




        




        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div
          className="
          relative
          z-30
          max-w-7xl
          mx-auto
          px-6
          pt-48
          pb-20
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-20
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
              px-5
              py-3
              rounded-2xl
              mb-8
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



              <span className="text-purple-300">

                Smart Trading Journal Platform

                <br />

                Powered by Raftar Trader FX

              </span>

            </div>




            {/* TITLE */}

            <h1
              className="
              text-5xl
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




            {/* DESCRIPTION */}

            <p
              className="
              text-gray-300
              text-lg
              md:text-xl
              leading-10
              mt-8
              max-w-2xl
              "
            >

              Track your trades,
              analyze your performance,
              improve psychology,
              and become a profitable trader
              with AI-powered analytics.

            </p>




            {/* BUTTONS */}

            <div
              className="
              flex
              flex-wrap
              gap-5
              mt-10
              "
            >

              {

                isLoggedIn ? (

                  <Link

                    to="/dashboard"

                    className="
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
              flex
              flex-wrap
              gap-6
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

                <h2 className="text-3xl font-bold">

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

                <h2 className="text-3xl font-bold">

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




            {/* DASHBOARD CARD */}

            <div
              className="
              relative
              bg-white/5
              border
              border-white/10
              backdrop-blur-2xl
              rounded-[40px]
              p-8
              shadow-2xl
              "
            >

              {/* HEADER */}

              <div
                className="
                flex
                items-center
                justify-between
                "
              >

                <div>

                  <h2
                    className="
                    text-4xl
                    font-bold
                    "
                  >

                    Trading Dashboard

                  </h2>



                  <p
                    className="
                    text-gray-400
                    mt-2
                    "
                  >

                    {

                      isLoggedIn

                      ? "Live Performance"

                      : "Demo Performance"

                    }

                  </p>

                </div>




                <div
                  className="
                  bg-green-500/20
                  text-green-400
                  px-5
                  py-3
                  rounded-2xl
                  "
                >

                  {

                    isLoggedIn

                    ? "Active"

                    : "Demo"

                  }

                </div>

              </div>




              {/* PROFIT */}

              <div
                className="
                bg-black/20
                rounded-3xl
                p-8
                mt-8
                "
              >

                <p className="text-gray-400">
                  Total Profit
                </p>



                <h2
                  className={`
                  text-6xl
                  font-black
                  mt-3

                  ${

                    isLoggedIn

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
                      isLoggedIn
                      ? stats.totalProfit
                      : 7058
                    }
                    duration={3}
                  />

                </h2>

              </div>




              {/* STATS */}

              <div
                className="
                grid
                grid-cols-2
                gap-5
                mt-6
                "
              >

                {/* WIN RATE */}

                <div
                  className="
                  bg-black/20
                  rounded-3xl
                  p-6
                  "
                >

                  <p className="text-gray-400">
                    Win Rate
                  </p>



                  <h2 className="
                  text-5xl
                  font-bold
                  mt-3
                  ">

                    <CountUp
                      end={
                        isLoggedIn
                        ? Number(stats.winRate)
                        : 74
                      }
                      duration={3}
                    />

                    %

                  </h2>

                </div>




                {/* TRADES */}

                <div
                  className="
                  bg-black/20
                  rounded-3xl
                  p-6
                  "
                >

                  <p className="text-gray-400">
                    Trades
                  </p>



                  <h2 className="
                  text-5xl
                  font-bold
                  mt-3
                  ">

                    <CountUp
                      end={
                        isLoggedIn
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




        {/* =====================================================
            CUSTOM CSS
        ===================================================== */}

        <style>

          {`

          @keyframes ticker {

            0% {

              transform:
              translateX(100%);

            }

            100% {

              transform:
              translateX(-100%);

            }

          }

          `}

        </style>

      </section>

    </>

  );

}