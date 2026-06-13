import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import api from "../../services/api";

import ThemeToggle from "./ThemeToggle";



export default function Navbar() {

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

  const menuRef =
  useRef();




  // =====================================================
  // FETCH PROFILE
  // =====================================================

  const fetchProfile =
  async () => {

    try {

      const token =
      localStorage.getItem(
        "token"
      );



      if (!token) {

        return;

      }




      // =================================================
      // API
      // =================================================

      const response =
      await api.get(

        "/profile",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      setProfile(
        response.data
      );

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =====================================================
  // AUTO LOAD
  // =====================================================

  useEffect(() => {

    fetchProfile();

  }, []);




  // =====================================================
  // CLOSE DROPDOWN OUTSIDE CLICK
  // =====================================================

  useEffect(() => {

    const handleClickOutside =
    (event) => {

      if (

        menuRef.current &&

        !menuRef.current.contains(
          event.target
        )

      ) {

        setShowMenu(false);

      }

    };



    document.addEventListener(

      "mousedown",

      handleClickOutside

    );



    return () => {

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

    };

  }, []);




  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout =
  () => {

    localStorage.removeItem(
      "token"
    );



    localStorage.removeItem(
      "userId"
    );



    setShowMenu(false);

    setMobileMenu(false);




    navigate(
      "/login"
    );

  };




  // =====================================================
  // UI
  // =====================================================

  return (

    <>

      <div
        className="
        sticky
        top-0
        z-40

        w-full
        max-w-full

        overflow-visible

        bg-white/5

        backdrop-blur-2xl

        border
        border-white/10

        rounded-2xl

        px-4
        sm:px-6
        lg:px-8

        py-4
        "
      >

        <div
          className="
          flex
          items-center
          justify-between

          gap-4

          relative
          "
        >




          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className="
            min-w-0
            "
          >

            <h2
              className="
              text-xl
              sm:text-2xl
              lg:text-3xl

              font-bold

              truncate
              "
            >

              Dashboard

            </h2>



            <p
              className="
              text-gray-400

              text-xs
              sm:text-sm

              mt-1

              truncate
              "
            >

              Welcome back trader 👋

            </p>

          </div>




          {/* =================================================
              CENTER BADGE
          ================================================= */}

          <div
            className="
            hidden
            xl:inline-flex

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

              bg-green-400

              rounded-full

              animate-pulse
              "
            />



            <span
              className="
              text-purple-200

              text-sm

              font-semibold

              leading-6
              "
            >

              Smart Trading Journal Platform

              <br />

              Powered by Raftar Trader FX

            </span>

          </div>




          {/* =================================================
              RIGHT
          ================================================= */}

          <div
            className="
            flex
            items-center

            gap-2
            md:gap-3
            lg:gap-4

            shrink-0
            "
          >

            {/* THEME */}

            <ThemeToggle />




            {/* HOME */}

            <Link

              to="/"

              className="
              hidden
              sm:flex

              items-center
              justify-center

              px-4
              py-2

              rounded-xl

              bg-white/5

              border
              border-white/10

              hover:bg-white/10

              transition-all

              text-sm
              font-medium
              "

            >

              Home

            </Link>




            {/* MOBILE MENU BUTTON */}

            <button

              onClick={() =>

                setMobileMenu(
                  !mobileMenu
                )

              }

              className="
              lg:hidden

              flex
              items-center
              justify-center

              w-10
              h-10

              rounded-xl

              bg-white/5

              border
              border-white/10
              "

            >

              {

                mobileMenu

                ? "✕"

                : "☰"

              }

            </button>




            {/* PROFILE */}

            <div
              className="
              relative
              "
              ref={menuRef}
            >

              <div

                onClick={() =>

                  setShowMenu(
                    !showMenu
                  )

                }

                className="
                flex
                items-center

                gap-3

                bg-white/5
                hover:bg-white/10

                p-2

                rounded-2xl

                border
                border-white/10

                cursor-pointer

                transition-all

                min-w-0
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
                        profile?.fullName || "Trader"
                      }&background=7c3aed&color=fff`

                  }

                  alt="avatar"

                  className="
                  w-10
                  h-10

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
                  sm:block

                  min-w-0
                  "
                >

                  <h4
                    className="
                    font-semibold

                    text-sm

                    truncate

                    max-w-[120px]
                    "
                  >

                    {

                      profile?.fullName ||

                      "Trader"

                    }

                  </h4>



                  <p
                    className="
                    text-xs
                    text-gray-400

                    truncate
                    "
                  >

                    {

                      profile?.accountType ||

                      "Premium"

                    }

                  </p>

                </div>

              </div>




              {/* =================================================
                  DROPDOWN
              ================================================= */}

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

                      onClick={() => {

                        navigate(
                          "/profile"
                        );

                        setShowMenu(false);

                      }}

                      className="
                      w-full

                      text-left

                      px-5
                      py-4

                      hover:bg-white/5

                      transition-all

                      text-sm
                      "

                    >

                      👤 Profile

                    </button>




                    {/* SETTINGS */}

                    <button

                      onClick={() => {

                        navigate(
                          "/settings"
                        );

                        setShowMenu(false);

                      }}

                      className="
                      w-full

                      text-left

                      px-5
                      py-4

                      hover:bg-white/5

                      transition-all

                      text-sm
                      "

                    >

                      ⚙️ Settings

                    </button>




                    {/* LOGOUT */}

                    <button

                      onClick={
                        handleLogout
                      }

                      className="
                      w-full

                      text-left

                      px-5
                      py-4

                      hover:bg-red-500/10

                      text-red-400

                      transition-all

                      text-sm
                      "

                    >

                      🚪 Logout

                    </button>

                  </div>

                )

              }

            </div>

          </div>

        </div>




        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        {

          mobileMenu && (

            <div
              className="
              lg:hidden

              mt-4

              border-t
              border-white/10

              pt-4

              flex
              flex-col

              gap-3
              "
            >

              <Link

                to="/"

                onClick={() =>

                  setMobileMenu(false)

                }

                className="
                px-4
                py-3

                rounded-xl

                bg-white/5

                border
                border-white/10

                text-sm
                "

              >

                🏠 Home

              </Link>




              <Link

                to="/profile"

                onClick={() =>

                  setMobileMenu(false)

                }

                className="
                px-4
                py-3

                rounded-xl

                bg-white/5

                border
                border-white/10

                text-sm
                "

              >

                👤 Profile

              </Link>




              <Link

                to="/settings"

                onClick={() =>

                  setMobileMenu(false)

                }

                className="
                px-4
                py-3

                rounded-xl

                bg-white/5

                border
                border-white/10

                text-sm
                "

              >

                ⚙️ Settings

              </Link>




              {/* LOGOUT */}

              <button

                onClick={handleLogout}

                className="
                px-4
                py-3

                rounded-xl

                bg-red-500/10

                border
                border-red-500/20

                text-red-400

                text-sm
                text-left
                "

              >

                🚪 Logout

              </button>

            </div>

          )

        }

      </div>

    </>

  );

}