import {
  useEffect,
  useState,
  useRef,
} from "react";

import logo from "../../assets/icon.png";

import api from "../../services/api";

import {
  useNavigate,
  Link,
} from "react-router-dom";



export default function HomeNavbar() {

  // =====================================================
  // STATES
  // =====================================================

  const [profile, setProfile] =
  useState(null);

  const [showMenu, setShowMenu] =
  useState(false);

  const [mobileMenu, setMobileMenu] =
  useState(false);




  // =====================================================
  // NAVIGATE
  // =====================================================

  const navigate =
  useNavigate();




  // =====================================================
  // REFS
  // =====================================================

  const dropdownRef =
  useRef(null);




  // =====================================================
  // TOKEN
  // =====================================================

  const token =
  localStorage.getItem(
    "token"
  );



  const isLoggedIn =
  !!token;




  // =====================================================
  // FETCH PROFILE
  // =====================================================

  const fetchProfile =
  async()=>{

    try{

      if(!token){

        return;

      }




      // =================================================
      // API
      // =================================================

      const response =
      await api.get(

        "/profile",

        {

          headers:{

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      console.log(

        "PROFILE:",

        response.data

      );




      // =================================================
      // SAVE PROFILE
      // =================================================

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




  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(()=>{

    if(token){

      fetchProfile();

    }

  },[token]);




  // =====================================================
  // OUTSIDE CLICK
  // =====================================================

  useEffect(()=>{

    const handleClickOutside =
    (event)=>{

      if(

        dropdownRef.current &&

        !dropdownRef.current.contains(
          event.target
        )

      ){

        setShowMenu(false);

      }

    };



    document.addEventListener(

      "mousedown",

      handleClickOutside

    );



    return ()=>{

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

    };

  },[]);




  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout =
  ()=>{

    localStorage.removeItem(
      "token"
    );



    localStorage.removeItem(
      "userId"
    );



    setShowMenu(false);

    setMobileMenu(false);




    alert(
      "Logged Out ✅"
    );



    navigate("/login");

  };




  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
      sticky
      top-0
      z-50

      border-b
      border-white/10

      bg-[#050816]/80

      backdrop-blur-2xl

      w-full
      max-w-full

      overflow-visible
      "
    >




      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <div
        className="
        max-w-7xl

        mx-auto

        flex
        items-center
        justify-between

        gap-4

        px-4
        sm:px-6
        lg:px-8

        py-4

        relative
        "
      >




        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link

          to="/"

          className="
          flex
          items-center

          gap-3

          min-w-0

          shrink-0
          "

        >

          {/* LOGO */}

          <img

            src={logo}

            alt="logo"

            className="
            w-10
            h-10

            sm:w-11
            sm:h-11

            lg:w-12
            lg:h-12

            object-contain

            shrink-0
            "

          />




          {/* TEXT */}

          <div
            className="
            min-w-0
            "
          >

            <h1
              className="
              text-lg
              sm:text-xl
              lg:text-2xl

              font-black

              bg-gradient-to-r
              from-purple-400
              via-pink-500
              to-fuchsia-500

              bg-clip-text
              text-transparent

              truncate
              "
            >

              Trading Journal

            </h1>



            <p
              className="
              hidden
              sm:block

              text-xs

              text-gray-400

              truncate
              "
            >

              Powered by Raftar Trader FX

            </p>

          </div>

        </Link>




        {/* =====================================================
            DESKTOP MENU
        ===================================================== */}

        <div
          className="
          hidden
          lg:flex

          items-center

          gap-8
          "
        >

          <Link
            to="/"
            className="
            text-gray-300
            hover:text-purple-400
            transition-all
            duration-300
            "
          >
            Home
          </Link>

          <Link
            to="/feature"
            className="
            text-gray-300
            hover:text-purple-400
            transition-all
            duration-300
            "
          >
            Features
          </Link>

          <Link
            to="/plan"
            className="
            text-gray-300
            hover:text-purple-400
            transition-all
            duration-300
            "
          >
            Pricing
          </Link>

          <a
            href="#about"
            className="
            text-gray-300
            hover:text-purple-400
            transition-all
            duration-300
            "
          >
            About
          </a>

        </div>




        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div
          className="
          hidden
          md:flex

          items-center

          gap-4

          shrink-0
          "
        >

          {

            isLoggedIn ? (

              <>

                {/* DASHBOARD */}

                <Link

                  to="/dashboard"

                  className="
                  px-5
                  py-3

                  rounded-2xl

                  bg-purple-600
                  hover:bg-purple-700

                  transition-all
                  duration-300

                  font-semibold

                  shadow-lg
                  shadow-purple-500/20
                  "

                >

                  Dashboard

                </Link>







                {/* PROFILE */}

                <div
                  ref={dropdownRef}
                  className="
                  relative
                  "
                >

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

                    rounded-2xl

                    border
                    border-white/10

                    cursor-pointer

                    hover:bg-white/10

                    transition-all
                    duration-300
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
                      w-11
                      h-11

                      rounded-full

                      object-cover

                      border
                      border-white/10

                      shrink-0
                      "

                    />







                    {/* INFO */}

                    <div
                      className="
                      hidden
                      lg:block
                      "
                    >

                      <h4
                        className="
                        font-semibold

                        text-white

                        max-w-[140px]

                        truncate
                        "
                      >

                        {

                          profile?.fullName ||

                          profile?.name ||

                          "Trader"

                        }

                      </h4>



                      <p
                        className="
                        text-xs
                        text-gray-400
                        "
                      >

                        {

                          profile?.accountType ||

                          "Personal"

                        }

                      </p>

                    </div>

                  </div>







                  {/* =====================================================
                      DROPDOWN
                  ===================================================== */}

                  {

                    showMenu && (

                      <div
                        className="
                        absolute
                        right-0

                        top-full

                        mt-3

                        w-56

                        bg-[#0b1120]/95

                        backdrop-blur-2xl

                        border
                        border-white/10

                        rounded-2xl

                        overflow-hidden

                        shadow-2xl

                        z-[9999]
                        "
                      >

                        {/* PROFILE */}

                        <button

                          onClick={()=>{

                            navigate("/profile");

                            setShowMenu(false);

                          }}

                          className="
                          w-full

                          text-left

                          px-5
                          py-4

                          hover:bg-white/5

                          transition-all
                          duration-300
                          "

                        >

                          👤 Profile

                        </button>




                        {/* SETTINGS */}

                        <button

                          onClick={()=>{

                            navigate("/settings");

                            setShowMenu(false);

                          }}

                          className="
                          w-full

                          text-left

                          px-5
                          py-4

                          hover:bg-white/5

                          transition-all
                          duration-300
                          "

                        >

                          ⚙️ Settings

                        </button>




                        {/* LOGOUT */}

                        <button

                          onClick={handleLogout}

                          className="
                          w-full

                          text-left

                          px-5
                          py-4

                          hover:bg-red-500/10

                          text-red-400

                          transition-all
                          duration-300
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
                  px-5
                  py-3

                  rounded-2xl

                  bg-white/10
                  hover:bg-white/20

                  transition-all
                  duration-300

                  font-medium
                  "

                >

                  Login

                </Link>







                {/* REGISTER */}

                <Link

                  to="/register"

                  className="
                  px-5
                  py-3

                  rounded-2xl

                  bg-purple-600
                  hover:bg-purple-700

                  transition-all
                  duration-300

                  font-semibold

                  shadow-lg
                  shadow-purple-500/20
                  "

                >

                  Get Started

                </Link>

              </>

            )

          }

        </div>







        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button

          onClick={()=>

            setMobileMenu(

              !mobileMenu

            )

          }

          className="
          md:hidden

          w-11
          h-11

          rounded-xl

          bg-white/5

          border
          border-white/10

          flex
          items-center
          justify-center

          text-2xl
          text-white

          shrink-0
          "

        >

          {

            mobileMenu

            ? "✕"

            : "☰"

          }

        </button>

      </div>







      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {

        mobileMenu && (

          <div
            className="
            md:hidden

            border-t
            border-white/10

            px-4
            py-5

            space-y-5

            bg-[#050816]/95

            backdrop-blur-2xl

            w-full
            max-w-full

            overflow-hidden
            "
          >

            <Link
              to="/"
              onClick={()=>setMobileMenu(false)}
              className="
              block
              text-gray-300
              hover:text-purple-400
              transition-all
              "
            >
              Home
            </Link>

            <Link
              to="/feature"
              onClick={()=>setMobileMenu(false)}
              className="
              block
              text-gray-300
              hover:text-purple-400
              transition-all
              "
            >
              Features
            </Link>

            <Link
              to="/plan"
              onClick={()=>setMobileMenu(false)}
              className="
              block
              text-gray-300
              hover:text-purple-400
              transition-all
              "
            >
              Pricing
            </Link>

            <a
              href="#about"
              className="
              block
              text-gray-300
              hover:text-purple-400
              transition-all
              "
            >
              About
            </a>

            {

              isLoggedIn && (

                <div
                  className="
                  flex
                  items-center

                  gap-3

                  pt-4

                  border-t
                  border-white/10
                  "
                >

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
                    w-12
                    h-12

                    rounded-full

                    object-cover
                    "

                  />



                  <div
                    className="
                    min-w-0
                    "
                  >

                    <h4
                      className="
                      font-semibold
                      truncate
                      "
                    >

                      {

                        profile?.fullName ||

                        profile?.name ||

                        "Trader"

                      }

                    </h4>



                    <p
                      className="
                      text-sm
                      text-gray-400
                      "
                    >

                      {

                        profile?.accountType ||

                        "Personal"

                      }

                    </p>

                  </div>

                </div>

              )

            }

            <div
              className="
              flex
              flex-col

              gap-4

              pt-4
              "
            >

              {

                isLoggedIn ? (

                  <>

                    <Link

                      to="/dashboard"

                      onClick={()=>setMobileMenu(false)}

                      className="
                      px-5
                      py-3

                      rounded-2xl

                      bg-purple-600

                      text-center

                      font-semibold
                      "

                    >

                      Dashboard

                    </Link>




                    <button

                      onClick={handleLogout}

                      className="
                      px-5
                      py-3

                      rounded-2xl

                      bg-red-500

                      font-semibold
                      "

                    >

                      Logout

                    </button>

                  </>

                ) : (

                  <>

                    <Link

                      to="/login"

                      onClick={()=>setMobileMenu(false)}

                      className="
                      px-5
                      py-3

                      rounded-2xl

                      bg-white/10

                      text-center
                      "

                    >

                      Login

                    </Link>




                    <Link

                      to="/register"

                      onClick={()=>setMobileMenu(false)}

                      className="
                      px-5
                      py-3

                      rounded-2xl

                      bg-purple-600

                      text-center

                      font-semibold
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