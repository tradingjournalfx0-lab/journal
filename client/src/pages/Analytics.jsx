
import {

  useEffect,
  useState,

} from "react";

// import axios from "axios";
import api from "../services/api";


import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

import WinRateChart from "../components/analytics/WinRateChart";

import MonthlyProfit from "../components/analytics/MonthlyProfit";

import DrawdownChart from "../components/analytics/DrawdownChart";

import HeatMap from "../components/analytics/HeatMap";

import SessionStats from "../components/analytics/SessionStats";

import PsychologyStats from "../components/analytics/PsychologyStats";

import RiskRewardChart from "../components/analytics/RiskRewardChart";

export default function Analytics() {




  // =========================
  // STATES
  // =========================

  const [analytics,setAnalytics] =
  useState(null);

  const [loading,setLoading] =
  useState(true);

  const [profile,setProfile] =
  useState(null);

  const [lastUpdate,setLastUpdate] =
  useState("");

  const [refreshKey,setRefreshKey] =
  useState(0);




  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile =
  async()=>{

    try{

      const token =
      localStorage.getItem(

        "token"

      );



      const response =
      await api.get(

        "/profile",

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




  // =========================
  // FETCH ANALYTICS
  // =========================

  const fetchAnalytics =
  async()=>{

    try{

      const token =
      localStorage.getItem(

        "token"

      );



      const response =
      await api.get(

        "/analytics",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );



      setAnalytics(

        response.data

      );



      setRefreshKey(

        prev => prev + 1

      );



      setLastUpdate(

        new Date().toLocaleTimeString()

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




  // =========================
  // AUTO LOAD
  // =========================

  useEffect(()=>{

    fetchProfile();

    fetchAnalytics();




    // LIVE REFRESH

    const interval =

    setInterval(

      fetchAnalytics,

      3000

    );




    return ()=>{

      clearInterval(

        interval

      );

    };

  },[]);




  // =========================
  // LOADING
  // =========================

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

        Loading Analytics...

      </div>

    );

  }




  // =========================
  // NO DATA
  // =========================

  if(!analytics){

    return(

      <div className="
      h-screen
      flex
      items-center
      justify-center
      bg-[#050816]
      text-red-400
      text-2xl
      ">

        Failed To Load Analytics

      </div>

    );

  }




  // =========================
  // UI
  // =========================

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





        {/* HEADER */}

        <div className="
        mt-8
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
        ">

          <div>

            <h1 className="
            text-4xl
            sm:text-5xl
            font-bold
            ">

              Analytics

            </h1>



            <p className="
            text-gray-400
            mt-2
            text-lg
            ">

              Analyze your trading performance,

              {

                profile?.fullName ||

                profile?.name ||

                "Trader"

              } 📊

            </p>

          </div>





          {/* LIVE */}

          <div className="
          bg-green-500/10
          border border-green-500/20
          px-5 py-3
          rounded-2xl
          text-green-400
          flex
          items-center
          gap-3
          w-fit
          ">

            <span className="
            w-3 h-3
            bg-green-400
            rounded-full
            animate-pulse
            " />

            Live Updated

            <span className="
            text-gray-400
            text-sm
            ">

              {lastUpdate}

            </span>

          </div>

        </div>





        {/* EMPTY */}

        {

          analytics.totalTrades === 0 ? (

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

                No Analytics Yet

              </h2>



              <p className="
              text-gray-400
              mt-4
              ">

                Add trades to unlock
                advanced analytics.

              </p>

            </div>

          ) : (

            <div className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
            mt-8
            ">




              {/* WIN RATE */}

              <WinRateChart

                key={`win-${refreshKey}`}

                analytics={analytics}

              />





              {/* MONTHLY */}

              <MonthlyProfit

                key={`monthly-${refreshKey}`}

                analytics={analytics}

              />





              {/* DRAWDOWN */}

              <DrawdownChart

                key={`draw-${refreshKey}`}

                analytics={analytics}

              />





              {/* HEATMAP */}

              <HeatMap

                key={`heat-${refreshKey}`}

                analytics={analytics}

              />





              {/* SESSION */}

              <SessionStats

                key={`session-${refreshKey}`}

                analytics={analytics}

              />





              {/* PSYCHOLOGY */}

              <PsychologyStats

                key={`psy-${refreshKey}`}

                analytics={analytics}

              />





              {/* RISK */}

              <RiskRewardChart

                key={`risk-${refreshKey}`}

                analytics={analytics}

              />

            </div>

          )

        }

      </div>

    </div>

  );

}

