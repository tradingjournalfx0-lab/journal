import { useEffect,useState } from "react";

// import axios from "axios";
import api from "../../services/api";


import PricingCard from "./PricingCard";

export default function PlanFeatures() {




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




      // SET PLAN

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





  return (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">




      {/* FREE */}

      <PricingCard

        title="Free"

        price="0"

        active={

          currentPlan === "Free"

        }

        amount={0}

        features={[

          "20 trades/month",

          "Basic analytics",

          "Trade history",

          "Community support",

        ]}

      />





      {/* PRO */}

      <PricingCard

        title="Pro"

        price="19"

        active={

          currentPlan === "Pro"

        }

        amount={19}

        features={[

          "Unlimited trades",

          "AI analytics",

          "Advanced charts",

          "Export PDF",

          "Priority support",

        ]}

      />





      {/* LIFETIME */}

      <PricingCard

        title="Lifetime"

        price="99"

        active={

          currentPlan === "Lifetime"

        }

        amount={99}

        features={[

          "Everything unlocked",

          "Lifetime access",

          "Future updates",

          "Premium indicators",

          "VIP support",

        ]}

      />

    </div>

  );

}