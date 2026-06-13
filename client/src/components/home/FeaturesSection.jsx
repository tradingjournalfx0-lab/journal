import {
  Link,
} from "react-router-dom";

import dashboardImg from "../../assets/dashboard.png";
import tradesImg from "../../assets/trades.png";
import analyticsImg from "../../assets/analytics.png";
import journalImg from "../../assets/journal.png";



export default function FeaturesSection() {

  // =====================================================
  // FEATURES
  // =====================================================

  const features = [

    {
      title: "Dashboard",

      desc:
      "Live trading performance dashboard with real-time analytics and smart statistics.",

      icon: "📊",

      img: dashboardImg,

      link: "/dashboard",
    },




    {
      title: "Trades",

      desc:
      "Manage and track all your trades professionally with detailed entries and setups.",

      icon: "📈",

      img: tradesImg,

      link: "/trades",
    },




    {
      title: "Analytics",

      desc:
      "Advanced AI trade analysis with smart reports and performance insights.",

      icon: "📉",

      img: analyticsImg,

      link: "/analytics",
    },




    {
      title: "Journal",

      desc:
      "Save your complete trading journey, emotions, screenshots and notes.",

      icon: "📔",

      img: journalImg,

      link: "/journal",
    },

  ];




  // =====================================================
  // UI
  // =====================================================

  return (

    <section
      className="
      w-full

      bg-white
      dark:bg-[#050816]

      text-black
      dark:text-white

      transition-all
      duration-300

      overflow-hidden
      "
    >

      <div
        className="
        max-w-7xl

        mx-auto

        px-4
        sm:px-6
        lg:px-8

        py-20
        sm:py-24
        lg:py-28
        "
      >




        {/* =====================================================
            TOP
        ===================================================== */}

        <div
          className="
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
              text-purple-600
              dark:text-purple-300

              text-sm
              sm:text-base

              font-medium
              "
            >

              Powerful Trading Features

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

            Everything You Need For

            <span
              className="
              bg-gradient-to-r
              from-purple-500
              to-blue-500

              bg-clip-text
              text-transparent
              "
            >

              {" "}Trading{" "}

            </span>

            Success

          </h1>







          {/* DESCRIPTION */}

          <p
            className="
            text-gray-600
            dark:text-gray-400

            text-base
            sm:text-lg
            lg:text-xl

            leading-8
            sm:leading-9

            mt-8

            max-w-3xl

            mx-auto
            "
          >

            Track trades, analyze performance,
            manage journals and improve your
            trading psychology with powerful tools.

          </p>

        </div>







        {/* =====================================================
            FEATURES
        ===================================================== */}

        <div
          className="
          mt-20
          sm:mt-24
          lg:mt-28
          "
        >

          {

            features.map((item, index) => (

              <div

                key={index}

                className={`
                grid

                grid-cols-1

                ${
                  index % 2 === 0

                  ? "lg:grid-cols-[0.9fr_1.1fr]"

                  : "lg:grid-cols-[1.1fr_0.9fr]"
                }

                gap-10
                lg:gap-16

                items-center

                mb-24
                lg:mb-32
                `}
              >




                {/* =====================================================
                    IMAGE LEFT
                ===================================================== */}

                {

                  index % 2 !== 0 && (

                    <FeatureImage
                      item={item}
                    />

                  )

                }







                {/* =====================================================
                    TEXT
                ===================================================== */}

                <div
                  className="
                  order-2
                  lg:order-none

                  min-w-0
                  "
                >

                  {/* TAG */}

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

                    mb-8
                    "
                  >

                    <span
                      className="
                      w-3
                      h-3

                      rounded-full

                      bg-green-400
                      "
                    />



                    <span
                      className="
                      text-purple-600
                      dark:text-purple-300

                      text-sm
                      sm:text-base

                      font-medium
                      "
                    >

                      Premium Feature

                    </span>

                  </div>







                  {/* TITLE */}

                  <h2
                    className="
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    xl:text-6xl

                    font-black

                    leading-tight

                    break-words
                    "
                  >

                    {item.icon}

                    {" "}

                    <span
                      className="
                      bg-gradient-to-r
                      from-purple-500
                      to-blue-500

                      bg-clip-text
                      text-transparent
                      "
                    >

                      {item.title}

                    </span>

                  </h2>







                  {/* DESCRIPTION */}

                  <p
                    className="
                    text-gray-600
                    dark:text-gray-400

                    text-base
                    sm:text-lg
                    lg:text-xl

                    leading-8
                    sm:leading-9

                    mt-8

                    max-w-2xl
                    "
                  >

                    {item.desc}

                  </p>







                  {/* BUTTON */}

                  <Link

                    to={item.link}

                    className="
                    inline-flex

                    items-center
                    justify-center

                    mt-10

                    px-7
                    sm:px-8

                    py-4
                    sm:py-5

                    rounded-2xl

                    bg-gradient-to-r
                    from-purple-500
                    to-blue-500

                    hover:opacity-90

                    transition-all
                    duration-300

                    hover:scale-[1.02]

                    active:scale-95

                    font-semibold

                    text-base
                    sm:text-lg

                    text-white

                    shadow-[0_0_40px_rgba(168,85,247,0.35)]
                    "
                  >

                    Explore Feature

                  </Link>

                </div>







                {/* =====================================================
                    IMAGE RIGHT
                ===================================================== */}

                {

                  index % 2 === 0 && (

                    <FeatureImage
                      item={item}
                    />

                  )

                }

              </div>

            ))

          }

        </div>

      </div>

    </section>

  );

}






// =====================================================
// FEATURE IMAGE COMPONENT
// =====================================================

function FeatureImage({ item }) {

  return (

    <div
      className="
      relative

      order-1
      lg:order-none

      min-w-0
      "
    >

      {/* GLOW */}

      <div
        className="
        absolute
        inset-0

        bg-purple-500/20

        blur-[100px]

        rounded-full
        "
      />




      {/* IMAGE CARD */}

      <div
        className="
        relative

        bg-black/5
        dark:bg-white/5

        border
        border-black/10
        dark:border-white/10

        backdrop-blur-xl

        rounded-[28px]
        sm:rounded-[35px]

        overflow-hidden

        flex
        items-center
        justify-center

        h-[260px]
        sm:h-[340px]
        lg:h-[420px]

        p-3
        sm:p-4

        transition-all
        duration-300
        "
      >

        <img

          src={item.img}

          alt={item.title}

          className="
          w-full
          h-full

          object-cover

          rounded-[18px]
          sm:rounded-[25px]

          transition-all
          duration-500

          hover:scale-[1.02]
          "

        />

      </div>

    </div>

  );

}