import { useEffect,useState } from "react";

// import axios from "axios";
import api from "../../services/api";


// import Sidebar from "../components/layout/Sidebar";

// import Navbar from "../components/layout/Navbar";

import PricingCard from "../subscription/PricingCard";





// import BillingHistory from "../components/subscription/BillingHistory";

export default function Plan() {




  // =========================
  // STATES
  // =========================

  const [currentPlan,setCurrentPlan] =
  useState("Free");




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
      await api.get(

        "/subscription",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      if(

        response.data?.plan

      ){

        setCurrentPlan(

          response.data.plan

        );

      }

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =========================
  // LOAD
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
  // PLANS
  // =========================

  const plans = [

    {

      title:"1 Month",

      price:199,

      amount:199,

      duration:"1 Month",

      features:[

        "Unlimited trades",

        "Basic analytics",

        "Trade history",

        "Community support",

      ],

    },




    {

      title:"6 Months",

      price:799,

      amount:799,

      duration:"6 Months",

      features:[

        "Unlimited trades",

        "AI analytics",

        "Advanced reports",

        "Export PDF",

        "Priority support",

      ],

    },




    {

      title:"1 Year",

      price:1499,

      amount:1499,

      duration:"1 Year",

      features:[

        "Everything in Pro",

        "Premium indicators",

        "Advanced dashboard",
        "Export PDF",

        "VIP support",

      ],

    },




    {

      title:"Lifetime",

      price:9999,

      amount:9999,

      duration:"Lifetime",

      features:[

        "Lifetime access",

        "All future updates",

        "Everything unlocked",

        "VIP support",

        "Premium indicators",

      ],

    },

  ];





  return (

    <div className=" min-h-screen bg-[#050816] text-white p-">




      {/* SIDEBAR */}

      {/* <Sidebar /> */}




      {/* MAIN */}

      <div className="flex-1  p-8">




        {/* NAVBAR */}

        {/* <Navbar /> */}
             




        {/* HEADER */}

        <div className="mt-8">

          <h1 className="text-4xl font-bold">

            Subscription

          </h1>

          <p className="text-gray-400 mt-2">

            Upgrade your trading experience.

          </p>

        </div>





        {/* STATUS */}
{/* 
        <div className="mt-8">

          <SubscriptionStatus />

        </div> */}

      {/* Biling History */}
        {/* <div className="mt-8">

          <BillingHistory />

        </div> */}


        {/* PLANS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">




          {plans.map((plan,index)=>(

            <PricingCard

              key={index}

              title={plan.title}

              price={plan.price}

              amount={plan.amount}

              duration={plan.duration}




              active={

                currentPlan === plan.title ||

                (

                  currentPlan === "Pro" &&

                  plan.title === "1 Month"

                )

              }




              features={plan.features}

            />

          ))}

        </div>

      </div>

    </div>

  );

}