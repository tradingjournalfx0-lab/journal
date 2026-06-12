
import {

  Link,
  useNavigate,

} from "react-router-dom";

// seo page
import HomeSeo from "../../seopage/HomeSeo";

import {

  useEffect,
  useState,

} from "react";

import HomeNavbar
from "./HomeNavbar";

import FeaturesSection
from "./FeaturesSection";

import Footer
from "../../Footer";

export default function Home() {




  // =========================
  // NAVIGATE
  // =========================

  const navigate =
  useNavigate();




  // =========================
  // LOGIN STATE
  // =========================

  const [isLoggedIn,setIsLoggedIn] =
  useState(false);




  // =========================
  // CHECK LOGIN
  // =========================

  useEffect(()=>{

    const checkLogin = ()=>{

      const token =
      localStorage.getItem(

        "token"

      );

      setIsLoggedIn(

        !!token

      );

    };



    // INITIAL CHECK

    checkLogin();



    // AUTO REFRESH

    window.addEventListener(

      "storage",

      checkLogin

    );



    return ()=>{

      window.removeEventListener(

        "storage",

        checkLogin

      );

    };

  },[]);




  // =========================
  // LOGOUT
  // =========================

  const handleLogout =
  ()=>{

    localStorage.removeItem(

      "token"

    );



    localStorage.removeItem(

      "userId"

    );



    setIsLoggedIn(false);




    alert(

      "Logout Successful"

    );



    navigate("/");

  };




  return (

    <div className="
    min-h-screen
    bg-[#050816]
    text-white
    overflow-hidden
    ">

        {/* SEO */}
        <HomeSeo />
      {/* =========================
          NAVBAR
      ========================= */}

      <HomeNavbar />





      {/* =========================
          HERO SECTION
      ========================= */}

      <div className="
      max-w-7xl
      mx-auto
      px-4 sm:px-6 lg:px-8
      pt-16 sm:pt-20 lg:pt-24
      pb-16 sm:pb-20
      ">

        <div className="
        grid
        grid-cols-1 lg:grid-cols-2
        gap-10 lg:gap-16
        items-center
        ">




          {/* =========================
              LEFT
          ========================= */}

          <div>

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
              bg-green-400
              rounded-full
              " />

              <span className="
              text-purple-300
              ">

                Smart Trading Journal Platform

                <br />

                Powered by Raftar Trader FX

              </span>

            </div>





            {/* TITLE */}

            <h1 className="
            text-5xl sm:text-6xl
            font-black
            leading-tight
            ">

              Master Your

              <span className="
              text-purple-500
              ">

                {" "}Trading{" "}

              </span>

              Journey

            </h1>





            {/* DESCRIPTION */}

            <p className="
            text-gray-400
            text-lg sm:text-xl
            leading-9
            mt-8
            max-w-2xl
            ">

              Track your trades,
              analyze your performance,
              improve psychology,
              and become a profitable trader
              with AI-powered analytics.

            </p>





            {/* BUTTONS */}

            <div className="
            flex
            flex-wrap
            gap-5
            mt-10
            ">

              {

                isLoggedIn ? (

                  <Link

                    to="/dashboard"

                    className="
                    px-8 py-5
                    rounded-2xl
                    bg-purple-600
                    hover:bg-purple-700
                    transition-all
                    font-semibold
                    text-lg
                    "

                  >

                    Open Dashboard

                  </Link>

                ) : (

                  <>

                    <Link

                      to="/register"

                      className="
                      px-8 py-5
                      rounded-2xl
                      bg-purple-600
                      hover:bg-purple-700
                      transition-all
                      font-semibold
                      text-lg
                      "

                    >

                      Start Free

                    </Link>





                    <Link

                      to="/plan"

                      className="
                      px-8 py-5
                      rounded-2xl
                      bg-white/10
                      hover:bg-white/20
                      transition-all
                      font-semibold
                      text-lg
                      "

                    >

                      View Pricing

                    </Link>

                  </>

                )

              }

            </div>

          </div>





          {/* =========================
              RIGHT
          ========================= */}

          <div className="relative">

            <div className="
            absolute
            inset-0
            bg-purple-500/20
            blur-[120px]
            " />





            <div className="
            relative
            bg-white/5
            border border-white/10
            backdrop-blur-xl
            rounded-[40px]
            p-8
            ">

              <div className="
              flex
              items-center
              justify-between
              ">

                <div>

                  <h2 className="
                  text-3xl
                  font-bold
                  ">

                    Trading Dashboard

                  </h2>



                  <p className="
                  text-gray-400
                  mt-2
                  ">

                    Live Performance

                  </p>

                </div>



                <div className="
                bg-green-500/20
                text-green-400
                px-5 py-3
                rounded-2xl
                ">

                  Active

                </div>

              </div>





              {/* PROFIT */}

              <div className="
              bg-black/20
              rounded-3xl
              p-8
              mt-8
              ">

                <p className="
                text-gray-400
                ">

                  Total Profit

                </p>



                <h2 className="
                text-5xl
                font-bold
                text-green-400
                mt-3
                ">

                  +$7,058

                </h2>

              </div>





              {/* STATS */}

              <div className="
              grid
              grid-cols-2
              gap-5
              mt-6
              ">

                <div className="
                bg-black/20
                rounded-3xl
                p-6
                ">

                  <p className="
                  text-gray-400
                  ">

                    Win Rate

                  </p>



                  <h2 className="
                  text-4xl
                  font-bold
                  mt-3
                  ">

                    74%

                  </h2>

                </div>





                <div className="
                bg-black/20
                rounded-3xl
                p-6
                ">

                  <p className="
                  text-gray-400
                  ">

                    Trades

                  </p>



                  <h2 className="
                  text-4xl
                  font-bold
                  mt-3
                  ">

                    196

                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>





      {/* FEATURES */}

      <FeaturesSection />





      {/* FOOTER */}

      <Footer />

    </div>

  );

}

