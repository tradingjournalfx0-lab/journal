
import {

  Link

} from "react-router-dom";

import {

  useEffect,
  useState,

} from "react";

// import axios from "axios";
import api from "../../services/api";

export default function Hero({ isLoggedIn }) {




  // =========================
  // STATES
  // =========================

  const [stats,setStats] =
  useState({

    totalTrades:0,

    winRate:0,

    totalProfit:0,

  });




  // =========================
  // FETCH LIVE STATS
  // =========================

  const fetchTrades =
  async()=>{

    try{

      const token =
      localStorage.getItem(

        "token"

      );



      if(!token){

        return;

      }



      const response =
      await api.get(

        "/trades",

        {

          headers:{

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

        (trade)=>

        Number(trade.profit) > 0

      ).length;



      // TOTAL PROFIT

      const totalProfit =
      trades.reduce(

        (acc,trade)=>

          acc + Number(
            trade.profit || 0
          ),

        0

      );



      // WIN RATE

      const winRate =
      totalTrades > 0

      ? (
          (wins / totalTrades)
          * 100
        ).toFixed(1)

      : 0;



      setStats({

        totalTrades,

        winRate,

        totalProfit,

      });

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =========================
  // AUTO LOAD
  // =========================

  useEffect(()=>{

    if(isLoggedIn){

      fetchTrades();

    }

  },[isLoggedIn]);




  return (

    <>

      {/* =========================
          HERO SECTION
      ========================= */}

      <div className="
      max-w-7xl
      mx-auto
      px-8
      pt-24
      pb-20
      ">

        <div className="
        grid
        grid-cols-1 xl:grid-cols-2
        gap-16
        items-center
        ">





          {/* =========================
              LEFT
          ========================= */}

          <div>

            <div className="
            inline-flex
            items-center
            gap-3
            bg-purple-500/10
            border border-purple-500/20
            px-5 py-3
            rounded-2xl
            mb-8
            ">

              <span className="
              w-3 h-3
              bg-green-400
              rounded-full
              " />

              <span className="
              text-purple-300
              ">

                Smart Trading Journal Platform

                <br />

                Powered by Raftar Trader FX

              </span>

            </div>





            {/* TITLE */}

            <h1 className="
            text-6xl
            font-black
            leading-tight
            ">

              Master Your

              <span className="
              text-purple-500
              ">

                {" "}Trading{" "}

              </span>

              Journey

            </h1>





            {/* DESCRIPTION */}

            <p className="
            text-gray-400
            text-xl
            leading-9
            mt-8
            max-w-2xl
            ">

              Track your trades,
              analyze your performance,
              improve psychology,
              and become a profitable trader
              with AI-powered analytics.

            </p>





            {/* BUTTONS */}

            <div className="
            flex
            flex-wrap
            gap-5
            mt-10
            ">

              {

                isLoggedIn ? (

                  <Link

                    to="/dashboard"

                    className="
                    px-8 py-5
                    rounded-2xl
                    bg-purple-600
                    hover:bg-purple-700
                    transition-all
                    font-semibold
                    text-lg
                    "

                  >

                    Open Dashboard

                  </Link>

                ) : (

                  <>

                    <Link

                      to="/register"

                      className="
                      px-8 py-5
                      rounded-2xl
                      bg-purple-600
                      hover:bg-purple-700
                      transition-all
                      font-semibold
                      text-lg
                      "

                    >

                      Start Free

                    </Link>





                    <Link

                      to="/subscription"

                      className="
                      px-8 py-5
                      rounded-2xl
                      bg-white/10
                      hover:bg-white/20
                      transition-all
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

          </div>





          {/* =========================
              RIGHT
          ========================= */}

          <div className="relative">

            <div className="
            absolute
            inset-0
            bg-purple-500/20
            blur-[120px]
            " />





            <div className="
            relative
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            rounded-[40px]
            p-8
            ">

              <div className="
              flex
              items-center
              justify-between
              ">

                <div>

                  <h2 className="
                  text-3xl
                  font-bold
                  ">

                    Trading Dashboard

                  </h2>



                  <p className="
                  text-gray-400
                  mt-2
                  ">

                    {

                      isLoggedIn

                      ? "Live Performance"

                      : "Demo Performance"

                    }

                  </p>

                </div>



                <div className="
                bg-green-500/20
                text-green-400
                px-5 py-3
                rounded-2xl
                ">

                  {

                    isLoggedIn

                    ? "Live"

                    : "Demo"

                  }

                </div>

              </div>





              {/* TOTAL PROFIT */}

              <div className="
              bg-black/20
              rounded-3xl
              p-8
              mt-8
              ">

                <p className="
                text-gray-400
                ">

                  Total Profit

                </p>



                <h2 className={`
                text-5xl
                font-bold
                mt-3

                ${

                  isLoggedIn

                  ? stats.totalProfit >= 0

                    ? "text-green-400"

                    : "text-red-400"

                  : "text-green-400"

                }

                `}>

                  {

                    isLoggedIn

                    ? `$${stats.totalProfit}`

                    : "+$7,058"

                  }

                </h2>

              </div>





              {/* STATS */}

              <div className="
              grid
              grid-cols-2
              gap-5
              mt-6
              ">

                {/* WIN RATE */}

                <div className="
                bg-black/20
                rounded-3xl
                p-6
                ">

                  <p className="
                  text-gray-400
                  ">

                    Win Rate

                  </p>



                  <h2 className="
                  text-4xl
                  font-bold
                  mt-3
                  ">

                    {

                      isLoggedIn

                      ? `${stats.winRate}%`

                      : "74%"

                    }

                  </h2>

                </div>





                {/* TRADES */}

                <div className="
                bg-black/20
                rounded-3xl
                p-6
                ">

                  <p className="
                  text-gray-400
                  ">

                    Trades

                  </p>



                  <h2 className="
                  text-4xl
                  font-bold
                  mt-3
                  ">

                    {

                      isLoggedIn

                      ? stats.totalTrades

                      : "196"

                    }

                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

