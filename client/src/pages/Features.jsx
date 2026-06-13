import Navbar from "../components/layout/Navbar";

import {
  Link,
} from "react-router-dom";



import dash from "../assets/dashboard.png";

import trade from "../assets/trades.png";

import anal from "../assets/analytics.png";

import jour from "../assets/journal.png";

import prof from "../assets/profile.png";

import subs from "../assets/subscription.png";



export default function Features() {

  // =====================================================
  // FEATURES
  // =====================================================

  const features = [

    {

      title: "Live Dashboard",

      desc:
      "Beautiful real-time dashboard with trading statistics and AI-powered insights.",

      img: dash,

      icon: "🚀",

      link: "/dashboard",

    },




    {

      title: "Trade Add Buy Sell",

      desc:
      "Save every trade with screenshots, emotions, execution notes and risk management.",

      img: trade,

      icon: "📒",

      link: "/trades",

    },




    {

      title: "Analytics",

      desc:
      "Track win rate, drawdown, profit factor and deep trading performance professionally.",

      img: anal,

      icon: "📊",

      link: "/analytics",

    },




    {

      title: "Trading Journal",

      desc:
      "Access your trading journal securely from any device with smooth syncing.",

      img: jour,

      icon: "📝",

      link: "/journal",

    },




    {

      title: "Profile",

      desc:
      "Manage your trader profile, upload avatar and customize account settings.",

      img: prof,

      icon: "👤",

      link: "/profile",

    },




    {

      title: "Subscription Plans",

      desc:
      "Flexible plans with monthly, yearly and lifetime premium access.",

      img: subs,

      icon: "💳",

      link: "/subscription",

    },

  ];




  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
      min-h-screen

      bg-[#050816]

      text-white

      overflow-x-hidden
      "
    >




      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div
        className="
        w-full

        max-w-7xl

        mx-auto

        px-4
        sm:px-6
        lg:px-8

        py-4
        sm:py-6
        lg:py-8
        "
      >




        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <div className="w-full">

          <Navbar />

        </div>







        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
          mt-10
          sm:mt-12

          text-center
          "
        >

          {/* BADGE */}

          <div
            className="
            inline-flex

            items-center

            gap-3

            bg-purple-500/10

            border
            border-purple-500/20

            px-5
            py-3

            rounded-2xl
            "
          >

            <span
              className="
              w-3
              h-3

              rounded-full

              bg-green-400

              animate-pulse
              "
            />



            <span
              className="
              text-purple-300

              text-sm
              sm:text-base

              font-medium
              "
            >

              Professional Trading Features

            </span>

          </div>







          {/* TITLE */}

          <h1
            className="
            text-4xl
            sm:text-5xl
            lg:text-6xl
            xl:text-7xl

            font-black

            mt-8

            leading-tight

            break-words
            "
          >

            Explore Powerful

            <span
              className="
              bg-gradient-to-r
              from-purple-500
              to-blue-500

              bg-clip-text
              text-transparent
              "
            >

              {" "}Trading Tools

            </span>

          </h1>







          {/* DESCRIPTION */}

          <p
            className="
            text-gray-400

            mt-6

            text-base
            sm:text-lg
            lg:text-xl

            leading-8

            max-w-3xl

            mx-auto
            "
          >

            Explore powerful tools designed
            for professional traders to track,
            analyze and improve trading performance.

          </p>

        </div>







        {/* =====================================================
            FEATURES GRID
        ===================================================== */}

        <div
          className="
          grid

          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3

          gap-5
          sm:gap-6
          lg:gap-8

          mt-14
          sm:mt-16
          "
        >

          {

            features.map((feature, index) => (

              <div

                key={index}

                className="
                group

                relative

                bg-white/5

                border
                border-white/10

                rounded-3xl

                p-5
                sm:p-6
                lg:p-7

                overflow-hidden

                backdrop-blur-xl

                hover:border-purple-500/40

                hover:bg-purple-500/5

                transition-all
                duration-300

                hover:-translate-y-1
                "
              >




                {/* GLOW */}

                <div
                  className="
                  absolute
                  inset-0

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-500

                  bg-gradient-to-br
                  from-purple-500/10
                  to-blue-500/10
                  "
                />







                {/* CONTENT */}

                <div
                  className="
                  relative
                  z-10
                  "
                >

                  {/* IMAGE */}

                  <div
                    className="
                    relative

                    rounded-2xl

                    overflow-hidden

                    bg-white/5

                    border
                    border-white/10

                    mb-6
                    "
                  >

                    <img

                      src={feature.img}

                      alt={feature.title}

                      className="
                      w-full

                      h-[190px]
                      sm:h-[220px]

                      object-cover

                      transition-all
                      duration-500

                      group-hover:scale-[1.03]
                      "
                    />



                    {/* ICON */}

                    <div
                      className="
                      absolute

                      top-4
                      right-4

                      w-12
                      h-12

                      rounded-2xl

                      bg-black/40

                      backdrop-blur-xl

                      flex
                      items-center
                      justify-center

                      text-2xl
                      "
                    >

                      {feature.icon}

                    </div>

                  </div>







                  {/* TITLE */}

                  <h2
                    className="
                    text-2xl
                    sm:text-3xl

                    font-bold

                    leading-tight
                    "
                  >

                    {feature.title}

                  </h2>







                  {/* DESC */}

                  <p
                    className="
                    text-gray-400

                    mt-4

                    leading-7

                    text-sm
                    sm:text-base
                    "
                  >

                    {feature.desc}

                  </p>







                  {/* BUTTON */}

                  <Link

                    to={feature.link}

                    className="
                    inline-flex

                    items-center
                    justify-center

                    mt-8

                    px-6
                    py-3

                    rounded-2xl

                    bg-gradient-to-r
                    from-purple-500
                    to-blue-500

                    hover:opacity-90

                    text-white

                    font-semibold

                    transition-all
                    duration-300

                    hover:scale-[1.02]

                    active:scale-95

                    shadow-[0_0_30px_rgba(168,85,247,0.25)]
                    "
                  >

                    Explore Feature

                  </Link>

                </div>

              </div>

            ))

          }

        </div>







        {/* =====================================================
            CTA
        ===================================================== */}

        <div
          className="
          mt-16
          sm:mt-20

          relative

          overflow-hidden

          bg-gradient-to-r
          from-purple-600/20
          to-blue-500/20

          border
          border-purple-500/20

          rounded-3xl

          p-8
          sm:p-10
          lg:p-14

          text-center
          "
        >

          {/* GLOW */}

          <div
            className="
            absolute
            inset-0

            bg-gradient-to-r
            from-purple-500/10
            to-blue-500/10

            blur-3xl
            "
          />







          {/* CONTENT */}

          <div
            className="
            relative
            z-10
            "
          >

            <h2
              className="
              text-3xl
              sm:text-4xl
              lg:text-5xl

              font-black

              leading-tight
              "
            >

              Upgrade Your Trading Journey 🚀

            </h2>







            <p
              className="
              text-gray-300

              mt-5

              max-w-2xl

              mx-auto

              leading-8

              text-base
              sm:text-lg
              "
            >

              Unlock premium analytics,
              unlimited trades,
              AI insights,
              smart reports and more.

            </p>







            {/* BUTTON */}

            <Link

              to="/plan"

              className="
              inline-flex

              items-center
              justify-center

              mt-10

              px-8
              py-4

              rounded-2xl

              bg-purple-600
              hover:bg-purple-700

              text-white

              font-semibold

              text-lg

              transition-all
              duration-300

              hover:scale-[1.02]

              active:scale-95

              shadow-[0_0_40px_rgba(168,85,247,0.35)]
              "
            >

              Explore Plans

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}