import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";



import Sidebar from
"../components/layout/Sidebar";

import Navbar from
"../components/layout/Navbar";

import PricingCard from
"../components/subscription/PricingCard";

import SubscriptionStatus from
"../components/subscription/SubscriptionStatus";

import BillingHistory from
"../components/subscription/BillingHistory";



export default function Subscription() {

  // =====================================================
  // STATES
  // =====================================================

  const [currentPlan, setCurrentPlan] =
  useState("Free");

  const [loading, setLoading] =
  useState(true);




  // =====================================================
  // FETCH SUBSCRIPTION
  // =====================================================

  const fetchSubscription =
  async () => {

    try {

      // =================================================
      // TOKEN
      // =================================================

      const token =
      localStorage.getItem(
        "token"
      );



      if (!token) {

        setLoading(false);

        return;

      }



      // =================================================
      // API
      // =================================================

      const response =
      await api.get(

        "/subscription",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      console.log(
        "SUBSCRIPTION:",
        response.data
      );



      // =================================================
      // PLAN
      // =================================================

      const plan =

      response.data?.plan ||

      response.data?.data?.plan ||

      "Free";



      setCurrentPlan(
        plan
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
  // LOAD
  // =====================================================

  useEffect(() => {

    fetchSubscription();




    // =================================================
    // LIVE REFRESH
    // =================================================

    const interval =

    setInterval(() => {

      fetchSubscription();

    }, 5000);




    return () => {

      clearInterval(
        interval
      );

    };

  }, []);




  // =====================================================
  // PLANS
  // =====================================================

  const plans = [

    {

      title: "1 Month",

      price: 19,

      amount: 19,

      duration: "1 Month",

      popular: false,

      features: [

        "Unlimited trades",

        "Basic analytics",

        "Trade history",

        "Community support",

      ],

    },




    {

      title: "6 Months",

      price: 79,

      amount: 79,

      duration: "6 Months",

      popular: true,

      features: [

        "Unlimited trades",

        "AI analytics",

        "Advanced reports",

        "Export PDF",

        "Priority support",

      ],

    },




    {

      title: "1 Year",

      price: 149,

      amount: 149,

      duration: "1 Year",

      popular: false,

      features: [

        "Everything in Pro",

        "Premium indicators",

        "Advanced dashboard",

        "VIP support",

      ],

    },




    {

      title: "Lifetime",

      price: 299,

      amount: 299,

      duration: "Lifetime",

      popular: false,

      features: [

        "Lifetime access",

        "All future updates",

        "Everything unlocked",

        "VIP support",

        "Premium indicators",

      ],

    },

  ];




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



          <h2
            className="
            text-xl
            sm:text-2xl
            font-semibold
            "
          >

            Loading Subscription...

          </h2>

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
            lg:flex-row
            lg:items-center
            lg:justify-between

            gap-5
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

                Subscription

              </h1>



              <p
                className="
                text-gray-400

                mt-3

                text-sm
                sm:text-base
                lg:text-lg

                leading-7

                max-w-2xl
                "
              >

                Upgrade your trading
                experience with
                premium analytics,
                AI insights,
                and advanced tools.

              </p>

            </div>




            {/* RIGHT BADGES */}

            <div
              className="
              flex
              flex-wrap

              items-center

              gap-3
              "
            >

              <div
                className="
                bg-green-500/10

                border
                border-green-500/20

                px-5
                py-3

                rounded-2xl

                text-green-400

                text-sm
                sm:text-base

                font-medium

                whitespace-nowrap
                "
              >

                ● Active Plan:
                {" "}
                {currentPlan}

              </div>



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

                font-medium

                whitespace-nowrap
                "
              >

                Premium Features Enabled

              </div>

            </div>

          </div>




          {/* =====================================================
              SUBSCRIPTION STATUS
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8

            bg-white/5

            border
            border-white/10

            rounded-3xl

            backdrop-blur-xl

            overflow-hidden
            "
          >

            <SubscriptionStatus />

          </div>




          {/* =====================================================
              BILLING HISTORY
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8

            bg-white/5

            border
            border-white/10

            rounded-3xl

            backdrop-blur-xl

            overflow-hidden
            "
          >

            <div
              className="
              px-6
              py-5

              border-b
              border-white/10
              "
            >

              <h2
                className="
                text-xl
                sm:text-2xl

                font-bold
                "
              >

                Billing History

              </h2>



              <p
                className="
                text-gray-400

                mt-2

                text-sm
                sm:text-base
                "
              >

                View invoices,
                subscriptions,
                and payment history.

              </p>

            </div>




            <div
              className="
              p-2
              sm:p-4

              w-full
              min-w-0
              "
            >

              <BillingHistory />

            </div>

          </div>




          {/* =====================================================
              PRICING PLANS
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8
            "
          >

            <div
              className="
              mb-8
              "
            >

              <h2
                className="
                text-2xl
                sm:text-3xl

                font-bold
                "
              >

                Choose Your Plan

              </h2>



              <p
                className="
                text-gray-400

                mt-3

                text-sm
                sm:text-base
                "
              >

                Unlock advanced tools,
                AI analytics,
                premium indicators,
                and trading insights.

              </p>

            </div>




            {/* =================================================
                PLANS GRID
            ================================================= */}

            <div
              className="
              grid

              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4

              gap-6
              "
            >

              {

                plans.map(

                  (
                    plan,
                    index
                  ) => (

                    <div
                      key={index}

                      className="
                      relative
                      min-w-0
                      "
                    >

                      {/* POPULAR */}

                      {

                        plan.popular && (

                          <div
                            className="
                            absolute
                            -top-3

                            left-1/2
                            -translate-x-1/2

                            z-10

                            bg-gradient-to-r
                            from-purple-600
                            to-fuchsia-600

                            text-white

                            text-xs
                            font-bold

                            px-4
                            py-2

                            rounded-full

                            shadow-lg

                            whitespace-nowrap
                            "
                          >

                            MOST POPULAR

                          </div>

                        )

                      }




                      {/* CARD */}

                      <div
                        className="
                        h-full

                        bg-white/5

                        border
                        border-white/10

                        rounded-3xl

                        backdrop-blur-xl

                        overflow-hidden

                        transition-all
                        duration-300

                        hover:scale-[1.02]
                        hover:border-purple-500/30
                        "
                      >

                        <PricingCard

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

                          features={
                            plan.features
                          }

                        />

                      </div>

                    </div>

                  )

                )

              }

            </div>

          </div>

        </main>

      </div>

    </div>

  );

}