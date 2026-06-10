
import {

  useEffect,
  useState,

} from "react";

// import axios from "axios";
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




  // ======================
  // STATES
  // ======================

  const [trades,setTrades] =
  useState([]);

  const [loading,setLoading] =
  useState(true);

  const [profile,setProfile] =
  useState(null);

  const [stats,setStats] =
  useState({

    totalProfit:0,

    totalTrades:0,

    wins:0,

    losses:0,

    winRate:0,

  });




  // ======================
  // FETCH PROFILE
  // ======================

  const fetchProfile =
  async()=>{

    try{

      const token =
      localStorage.getItem(

        "token"

      );



      const response =
      await api.get(

        "/api/profile",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );



      setProfile(

        response.data

      );

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // ======================
  // FETCH TRADES
  // ======================

  const fetchTrades =
  async()=>{

    try{

      const token =
      localStorage.getItem(

        "token"

      );



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



      setTrades(

        response.data

      );



      calculateStats(

        response.data

      );

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );

    }finally{

      setLoading(false);

    }

  };




  // ======================
  // LOAD DATA
  // ======================

  useEffect(()=>{

    fetchProfile();

    fetchTrades();



    // LIVE AUTO REFRESH

    const interval =

    setInterval(()=>{

      fetchTrades();

    },5000);



    return ()=>{

      clearInterval(

        interval

      );

    };

  },[]);




  // ======================
  // CALCULATE STATS
  // ======================

  const calculateStats =
  (data)=>{

    let totalProfit = 0;

    let wins = 0;

    let losses = 0;




    data.forEach((trade)=>{

      totalProfit +=
      Number(

        trade.profit || 0

      );



      if(

        Number(trade.profit) > 0

      ){

        wins++;

      }else{

        losses++;

      }

    });




    const totalTrades =
    data.length;




    const winRate =
    totalTrades > 0

    ? (

        (wins / totalTrades)

        * 100

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




  // ======================
  // LOADING SCREEN
  // ======================

  if(loading){

    return(

      <div className="
      h-screen
      flex
      items-center
      justify-center
      bg-[#050816]
      text-white
      text-2xl
      ">

        Loading Dashboard...

      </div>

    );

  }




  // ======================
  // UI
  // ======================

  return (

    <div className="
    flex
    min-h-screen
    bg-[#050816]
    text-white
    ">




      {/* SIDEBAR */}

      <Sidebar />





      {/* MAIN */}

      <div className="
      flex-1
      lg:ml-64
      p-4 sm:p-6 lg:p-8
      ">




        {/* NAVBAR */}

        <Navbar />





        {/* PAGE HEADER */}

        <div className="mt-8">

          <h1 className="
          text-4xl sm:text-5xl
          font-bold
          ">

            Dashboard

          </h1>



          <p className="
          text-gray-400
          mt-2
          text-lg
          ">

            Welcome back{" "}

            {

              profile?.fullName ||

              profile?.name ||

              "Trader"

            } 👋

          </p>

        </div>





        {/* STATS */}

        <StatsCards

          stats={stats}

        />





        {/* CHARTS */}

        <div className="
        grid
        grid-cols-1 xl:grid-cols-2
        gap-6
        mt-8
        ">

          {/* EQUITY CURVE */}

          <EquityChart

            trades={trades}

          />




          {/* PERFORMANCE */}

          <PerformanceChart

            stats={stats}

          />

        </div>





        {/* RECENT + SESSION */}

        <div className="
        grid
        grid-cols-1 xl:grid-cols-2
        gap-6
        mt-8
        ">

          {/* RECENT TRADES */}

          <RecentTrades

            trades={trades}

          />




          {/* SESSION OVERVIEW */}

          <SessionOverview

            trades={trades}

          />

        </div>





        {/* EMPTY STATE */}

        {

          trades.length === 0 && (

            <div className="
            mt-10
            bg-white/5
            border border-white/10
            rounded-3xl
            p-10
            text-center
            ">

              <h2 className="
              text-3xl
              font-bold
              ">

                No Trades Yet

              </h2>



              <p className="
              text-gray-400
              mt-4
              ">

                Start adding trades
                to see live analytics.

              </p>

            </div>

          )

        }

      </div>

    </div>

  );

}

