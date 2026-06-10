
import {

  useEffect,
  useState,

} from "react";

import logo from "../../assets/icon.png";

import api from "../../services/api";

import {

  useNavigate,
  Link

} from "react-router-dom";

export default function HomeNavbar() {

  // =========================
  // STATES
  // =========================

  const [profile,setProfile] =
  useState(null);

  const [showMenu,setShowMenu] =
  useState(false);

  const [mobileMenu,setMobileMenu] =
  useState(false);

  const navigate =
  useNavigate();

  const token =
  localStorage.getItem(

    "token"

  );

  const isLoggedIn =
  !!token;



  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile =
  async()=>{

    try{

      const response =
      await api.get(

        "/api/profile"

      );



      console.log(

        "PROFILE:",

        response.data

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
  // AUTO FETCH
  // =========================

  useEffect(()=>{

    if(token){

      fetchProfile();

    }

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



    alert(

      "Logged Out ✅"

    );



    navigate(

      "/login"

    );

  };



  return (

    <div className="
    border-b
    border-white/10
    ">





      {/* =========================
          NAVBAR
      ========================= */}

      <div className="
      max-w-7xl
      mx-auto
      flex
      items-center
      justify-between
      px-4 sm:px-6 lg:px-8
      py-5
      ">






        {/* =========================
            LOGO
        ========================= */}

        <Link

          to="/"

          className="
          text-xl sm:text-2xl lg:text-3xl
          flex
          gap-3
          items-center
          font-bold
          text-purple-500
          "

        >

          <img

            src={logo}

            alt="logo"

            className="
            w-10 h-10
            sm:w-12 sm:h-12
            object-contain
            "

          />

          <span>

            Trading Journal FX

          </span>

        </Link>







        {/* =========================
            DESKTOP MENU
        ========================= */}

        <div className="
        hidden
        lg:flex
        items-center
        gap-8
        ">

          <Link
            to="/"
            className="
            hover:text-purple-400
            transition-all
            "
          >

            Home

          </Link>



          <Link
            to="/feature"
            className="
            hover:text-purple-400
            transition-all
            "
          >

            Features

          </Link>



          <Link
            to="/plan"
            className="
            hover:text-purple-400
            transition-all
            "
          >

            Pricing

          </Link>



          <a
            href="#about"
            className="
            hover:text-purple-400
            transition-all
            "
          >

            About

          </a>

        </div>







        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="
        hidden
        md:flex
        items-center
        gap-4
        ">

          {

            isLoggedIn ? (

              <>

                {/* DASHBOARD */}

                <Link

                  to="/dashboard"

                  className="
                  px-5 py-3
                  rounded-2xl
                  bg-purple-600
                  hover:bg-purple-700
                  transition-all
                  "

                >

                  Dashboard

                </Link>







                {/* PROFILE */}

                <div className="relative">

                  <div

                    onClick={()=>

                      setShowMenu(

                        !showMenu

                      )

                    }

                    className="
                    flex
                    items-center
                    gap-3
                    bg-white/5
                    p-2
                    rounded-xl
                    border border-white/10
                    cursor-pointer
                    "

                  >




                    {/* AVATAR */}

                    <img

                      src={

                        profile?.avatar

                        ? profile.avatar.startsWith("http")

                          ? profile.avatar

                          : `http://localhost:5000/uploads/${profile.avatar}`

                        : `https://ui-avatars.com/api/?name=${
                            profile?.fullName ||
                            profile?.name ||
                            "Trader"
                          }&background=7c3aed&color=fff`

                      }

                      alt="avatar"

                      className="
                      w-10 h-10
                      rounded-full
                      object-cover
                      border border-white/10
                      "

                    />







                    {/* INFO */}

                    <div>

                      <h4 className="
                      font-semibold
                      text-white
                      ">

                        {

                          profile?.fullName ||

                          profile?.name ||

                          "Trader"

                        }

                      </h4>



                      <p className="
                      text-xs
                      text-gray-400
                      ">

                        {

                          profile?.accountType ||

                          "Personal"

                        } Trader

                      </p>

                    </div>

                  </div>







                  {/* =========================
                      DROPDOWN
                  ========================= */}

                  {

                    showMenu && (

                      <div className="
                      absolute
                      right-0
                      mt-3
                      w-52
                      bg-[#0b1120]
                      border border-white/10
                      rounded-2xl
                      overflow-hidden
                      shadow-2xl
                      z-50
                      ">

                        <button

                          onClick={()=>

                            navigate(

                              "/profile"

                            )

                          }

                          className="
                          w-full
                          text-left
                          px-5 py-4
                          hover:bg-white/5
                          transition-all
                          "

                        >

                          👤 Profile

                        </button>



                        <button

                          onClick={()=>

                            navigate(

                              "/settings"

                            )

                          }

                          className="
                          w-full
                          text-left
                          px-5 py-4
                          hover:bg-white/5
                          transition-all
                          "

                        >

                          ⚙️ Settings

                        </button>



                        <button

                          onClick={handleLogout}

                          className="
                          w-full
                          text-left
                          px-5 py-4
                          hover:bg-red-500/10
                          text-red-400
                          transition-all
                          "

                        >

                          🚪 Logout

                        </button>

                      </div>

                    )

                  }

                </div>

              </>

            ) : (

              <>

                {/* LOGIN */}

                <Link

                  to="/login"

                  className="
                  px-5 py-3
                  rounded-2xl
                  bg-white/10
                  hover:bg-white/20
                  transition-all
                  "

                >

                  Login

                </Link>







                {/* REGISTER */}

                <Link

                  to="/register"

                  className="
                  px-5 py-3
                  rounded-2xl
                  bg-purple-600
                  hover:bg-purple-700
                  transition-all
                  "

                >

                  Get Started

                </Link>

              </>

            )

          }

        </div>







        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}

        <button

          onClick={()=>

            setMobileMenu(

              !mobileMenu

            )

          }

          className="
          md:hidden
          text-3xl
          text-white
          "

        >

          ☰

        </button>

      </div>







      {/* =========================
          MOBILE MENU
      ========================= */}

      {

        mobileMenu && (

          <div className="
          md:hidden
          border-t border-white/10
          px-4 py-5
          space-y-5
          bg-[#050816]
          ">

            <Link
              to="/"
              className="block hover:text-purple-400"
            >

              Home

            </Link>



            <Link
              to="/feature"
              className="block hover:text-purple-400"
            >

              Features

            </Link>



            <Link
              to="/plan"
              className="block hover:text-purple-400"
            >

              Pricing

            </Link>



            <a
              href="#about"
              className="block hover:text-purple-400"
            >

              About

            </a>







            {/* MOBILE PROFILE */}

            {

              isLoggedIn && (

                <div className="
                flex
                items-center
                gap-3
                pt-4
                border-t
                border-white/10
                ">

                  <img

                    src={

                      profile?.avatar

                      ? profile.avatar.startsWith("http")

                        ? profile.avatar

                        : `http://localhost:5000/uploads/${profile.avatar}`

                      : `https://ui-avatars.com/api/?name=${
                          profile?.fullName ||
                          profile?.name ||
                          "Trader"
                        }&background=7c3aed&color=fff`

                    }

                    alt="avatar"

                    className="
                    w-12 h-12
                    rounded-full
                    object-cover
                    "

                  />



                  <div>

                    <h4 className="font-semibold">

                      {

                        profile?.fullName ||

                        profile?.name ||

                        "Trader"

                      }

                    </h4>



                    <p className="
                    text-sm
                    text-gray-400
                    ">

                      {

                        profile?.accountType ||

                        "Personal"

                      }

                    </p>

                  </div>

                </div>

              )

            }







            {/* MOBILE BUTTONS */}

            <div className="
            flex
            flex-col
            gap-4
            pt-4
            ">

              {

                isLoggedIn ? (

                  <>

                    <Link

                      to="/dashboard"

                      className="
                      px-5 py-3
                      rounded-2xl
                      bg-purple-600
                      text-center
                      "

                    >

                      Dashboard

                    </Link>



                    <button

                      onClick={handleLogout}

                      className="
                      px-5 py-3
                      rounded-2xl
                      bg-red-500
                      "

                    >

                      Logout

                    </button>

                  </>

                ) : (

                  <>

                    <Link

                      to="/login"

                      className="
                      px-5 py-3
                      rounded-2xl
                      bg-white/10
                      text-center
                      "

                    >

                      Login

                    </Link>



                    <Link

                      to="/register"

                      className="
                      px-5 py-3
                      rounded-2xl
                      bg-purple-600
                      text-center
                      "

                    >

                      Get Started

                    </Link>

                  </>

                )

              }

            </div>

          </div>

        )

      }

    </div>

  );

}

