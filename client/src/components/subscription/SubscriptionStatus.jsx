
import { useEffect,useState } from "react";

import axios from "axios";

export default function SubscriptionStatus() {




  // =========================
  // STATES
  // =========================

  const [subscription,setSubscription] =
  useState({

    plan:"Free",

    status:"Inactive",

    expiry:"N/A",

    trades:"0/month",

  });




  const [loading,setLoading] =
  useState(true);





  // =========================
  // FETCH SUBSCRIPTION
  // =========================

  const fetchSubscription =
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

        "http://localhost:5000/api/subscription",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      // DATA

      if(response.data){

        setSubscription({

          // PLAN

          plan:
          response.data.plan || "Free",




          // STATUS

          status:
          response.data.status || "Inactive",




          // EXPIRY

          expiry:

          response.data.plan === "Lifetime"

          ? "Lifetime Access"

          : response.data.expiry

          ? new Date(

              response.data.expiry

            ).toLocaleDateString(

              "en-IN",

              {

                day:"2-digit",

                month:"short",

                year:"numeric",

              }

            )

          : "N/A",




          // TRADES

          trades:
          response.data.trades || "20/month",

        });

      }

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

    fetchSubscription();




    // LIVE REFRESH

    const interval =

    setInterval(()=>{

      fetchSubscription();

    },5000);




    return ()=>{

      clearInterval(interval);

    };

  },[]);





  // =========================
  // LOADING
  // =========================

  if(loading){

    return (

      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-gray-400">

        Loading Subscription...

      </div>

    );

  }






  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">




      {/* HEADER */}

      <div className="flex items-center justify-between">




        <div>

          <h2 className="text-3xl font-bold">

            Subscription Status

          </h2>

          <p className="text-gray-400 mt-2">

            Manage your active plan

          </p>

        </div>




        {/* STATUS */}

        <div

          className={`px-5 py-3 rounded-2xl font-semibold

          ${subscription.status === "Active"

            ? "bg-green-500/20 text-green-400"

            : "bg-red-500/20 text-red-400"

          }`}>

          {subscription.status}

        </div>

      </div>





      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">




        {/* PLAN */}

        <div className="bg-black/20 rounded-2xl p-5">

          <p className="text-gray-400 text-sm">

            Current Plan

          </p>

          <h3 className="text-3xl font-bold mt-2 text-purple-400">

            {subscription.plan}

          </h3>

        </div>





        {/* EXPIRY */}

        <div className="bg-black/20 rounded-2xl p-5">

          <p className="text-gray-400 text-sm">

            Expiry Date

          </p>

          <h3 className="text-2xl font-bold mt-2">

            {subscription.expiry}

          </h3>

        </div>





        {/* LIMIT */}

        <div className="bg-black/20 rounded-2xl p-5">

          <p className="text-gray-400 text-sm">

            Trade Limit

          </p>

          <h3 className="text-2xl font-bold mt-2">

            {subscription.trades}

          </h3>

        </div>

      </div>





      {/* BUTTONS */}

      <div className="mt-10 flex gap-4">




        {/* UPGRADE */}

        <button

          className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-2xl transition-all">

          Upgrade Plan

        </button>





        {/* HISTORY */}

        <button

          className="bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl transition-all">

          Billing History

        </button>

      </div>

    </div>

  );

}

