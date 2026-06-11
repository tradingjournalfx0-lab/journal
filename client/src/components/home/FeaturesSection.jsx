import dashboardImg from "../../assets/dashboard.png";
import tradesImg from "../../assets/trades.png";
import analyticsImg from "../../assets/analytics.png";
import journalImg from "../../assets/journal.png";

export default function FeaturesSection() {

  // =========================
  // FEATURES
  // =========================

  const features = [

    {
      title: "Dashboard",

      desc:
      "Live trading performance dashboard with real-time analytics and smart statistics.",

      icon: "📊",

      img:dashboardImg,

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
    }

  ];



  return (

    <div className="
    max-w-7xl
    mx-auto
    px-4 sm:px-6 lg:px-8
    
    ">

      {/* =========================
          TOP
      ========================= */}

      <div className="text-center">

        <div className="
        inline-flex
        items-center
        gap-3
        bg-purple-500/10
        border border-purple-500/20
        px-5 py-3
        rounded-2xl
        ">

          <span className="
          w-3 h-3
          rounded-full
          bg-green-400
          " />

          <span className="text-purple-300">

            Powerful Trading Features

          </span>

        </div>



        <h1 className="
        text-4xl
        sm:text-5xl
        lg:text-6xl
        font-black
        mt-8
        leading-tight
        ">

          Everything You Need For

          <span className="
          bg-gradient-to-r
          from-purple-500
          to-blue-500
          bg-clip-text
          text-transparent
          ">

            {" "}Trading{" "}

          </span>

          Success

        </h1>



        <p className="
        text-gray-400
        text-lg sm:text-xl
        leading-9
        mt-8
        max-w-3xl
        mx-auto
        ">

          Track trades, analyze performance,
          manage journals and improve your
          trading psychology with powerful tools.

        </p>

      </div>



      {/* =========================
          FEATURES
      ========================= */}

      <div className="mt-24">

        {

          features.map((item, index) => (

            <div

              key={index}

              className={`
              grid
              grid-cols-1
              ${
                index % 2 === 0
                ? "lg:grid-cols-[0.85fr_1.15fr]"
                : "lg:grid-cols-[1.15fr_0.85fr]"
              }
              gap-12 lg:gap-16
              items-center
              mb-32
              `}

            >

              {/* =========================
                  IMAGE LEFT
              ========================= */}

              {

                index % 2 !== 0 && (

                  <div className="relative">

                    {/* GLOW */}

                    <div className="
                    absolute
                    inset-0
                    bg-purple-500/20
                    blur-[120px]
                    " />



                   {/* IMAGE CARD */}

                     <div className="
                      relative
                       bg-white/5
                    border border-white/10
                        backdrop-blur-xl
                        rounded-[35px]
                       overflow-hidden
                      flex
                     items-center
                    justify-center
                    h-[420px]
                   p-4
                    ">

             <img
                 src={item.img}
                alt=""
                className="
                max-w-full
                max-h-full
                object-cover
                 rounded-[25px]
                    "
                    />

                </div>

                  </div>

                )

              }



              {/* =========================
                  TEXT
              ========================= */}

              <div>

                {/* TAG */}

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
                  rounded-full
                  bg-green-400
                  " />

                  <span className="text-purple-300">

                    Premium Feature

                  </span>

                </div>



                {/* TITLE */}

                <h1 className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-black
                leading-tight
                ">

                  {item.icon}

                  {" "}

                  <span className="
                  bg-gradient-to-r
                  from-purple-500
                  to-blue-500
                  bg-clip-text
                  text-transparent
                  ">

                    {item.title}

                  </span>

                </h1>



                {/* DESCRIPTION */}

                <p className="
                text-gray-400
                text-lg sm:text-xl
                leading-9
                mt-8
                max-w-lg
                ">

                  {item.desc}

                </p>



                {/* BUTTON */}

                <button className="
                mt-10
                px-8 py-5
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-blue-500
                hover:opacity-90
                transition-all
                font-semibold
                text-lg
                shadow-[0_0_40px_rgba(168,85,247,0.35)]
                ">

                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Explore Feature
                  </a>
                    

                </button>

              </div>



              {/* =========================
                  IMAGE RIGHT
              ========================= */}

              {

                index % 2 === 0 && (

                  <div className="relative">

                    {/* GLOW */}

                    <div className="
                    absolute
                    inset-0
                    bg-purple-500/20
                    blur-[120px]
                    " />



                  {/* IMAGE CARD */}

                    <div className="
                    relative
                    bg-white/5
                    border border-white/10
                    backdrop-blur-xl
                    rounded-[35px]
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                    h-[420px]
                    p-4
                    ">

                    <img
                      src={item.img}
                      alt=""
                      className="
                      max-w-full
                      max-h-full
                      object-contain
                      rounded-[25px]
                  
                      "
                    />
                  
                  </div>


                  </div>

                )

              }

            </div>

          ))

        }

      </div>

    </div>

  );

}