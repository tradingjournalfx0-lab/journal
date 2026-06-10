import { useEffect,useState } from "react";

import axios from "axios";

export default function ProfileCard({

  refresh,

}) {




  // =========================
  // STATES
  // =========================

  const [profile,setProfile] =
  useState(null);

  const [stats,setStats] =
  useState({

    totalTrades:0,

    winRate:0,

    totalProfit:0,

  });




  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile =
  async()=>{

    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      const response =
      await axios.get(

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




  // =========================
  // FETCH TRADES
  // =========================

  const fetchTrades =
  async()=>{

    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      const response =
      await axios.get(

        "/api/trades",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      const trades =
      response.data;




      const totalTrades =
      trades.length;




      const wins =
      trades.filter(

        (trade)=>

        Number(trade.profit) > 0

      ).length;




      const totalProfit =
      trades.reduce(

        (acc,trade)=>

          acc + Number(
            trade.profit || 0
          ),

        0

      );




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
  // AUTO REFRESH
  // =========================

  useEffect(()=>{

    fetchProfile();

    fetchTrades();

  },[refresh]);




  // =========================
  // LOADING
  // =========================

  if(!profile){

    return (

      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-gray-400">

        Loading Profile...

      </div>

    );

  }




  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">




      <div className="flex flex-col items-center text-center">




        {/* AVATAR */}

        <img
           src={

                profile?.avatar

                ? `/${profile.avatar}`

                : "/avatar.png"

              

          }
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
        />




        {/* NAME */}

        <h2 className="text-3xl font-bold mt-6">

          {profile.fullName || "Trader"}

        </h2>




        {/* ACCOUNT */}

        <p className="text-purple-400 mt-2">

          {profile.accountType || "Professional"} Trader

        </p>




        {/* COUNTRY */}

        <p className="text-gray-500 mt-2">

          {profile.country || "No Country"}

        </p>




        {/* BIO */}

        <p className="text-gray-400 mt-4 max-w-md">

          {profile.bio ||

            "Passionate forex and crypto trader focused on risk management and consistency."

          }

        </p>




        {/* STATS */}

        <div className="grid grid-cols-3 gap-5 w-full mt-10">




          {/* TRADES */}

          <div className="bg-black/20 rounded-2xl p-5">

            <h3 className="text-2xl font-bold">

              {stats.totalTrades}

            </h3>

            <p className="text-gray-400 text-sm mt-1">

              Trades

            </p>

          </div>




          {/* WIN RATE */}

          <div className="bg-black/20 rounded-2xl p-5">

            <h3 className="text-2xl font-bold text-green-400">

              {stats.winRate}%

            </h3>

            <p className="text-gray-400 text-sm mt-1">

              Win Rate

            </p>

          </div>




          {/* PROFIT */}

          <div className="bg-black/20 rounded-2xl p-5">

            <h3
              className={`text-2xl font-bold

                ${stats.totalProfit >= 0

                  ? "text-purple-400"

                  : "text-red-400"

                }`}>

              ${stats.totalProfit}

            </h3>

            <p className="text-gray-400 text-sm mt-1">

              Profit

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}