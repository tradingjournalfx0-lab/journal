import {
  LayoutDashboard,
  CandlestickChart,
  BarChart3,
  BookOpen,
  User,
  CreditCard,
 Settings,
  Menu,
  X,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";



export default function Sidebar() {

  // =====================================================
  // STATES
  // =====================================================

  const [open, setOpen] =
  useState(false);




  // =====================================================
  // BODY SCROLL LOCK
  // =====================================================

  useEffect(() => {

    if (open) {

      document.body.style.overflow =
      "hidden";

    }

    else {

      document.body.style.overflow =
      "auto";

    }



    return () => {

      document.body.style.overflow =
      "auto";

    };

  }, [open]);




  // =====================================================
  // MENU ITEMS
  // =====================================================

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={22} />,
    },

    {
      name: "Trades",
      path: "/trades",
      icon: <CandlestickChart size={22} />,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={22} />,
    },

    {
      name: "Journal",
      path: "/journal",
      icon: <BookOpen size={22} />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <User size={22} />,
    },

    {
      name: "Subscription",
      path: "/subscription",
      icon: <CreditCard size={22} />,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={22} />,
    },

  ];




  return (

    <>

      {/* =====================================================
          MOBILE TOPBAR
      ===================================================== */}

      <div
        className="
        lg:hidden
        fixed
        top-0
        left-0
        right-0
        z-40

        h-16
        px-4

        flex
        items-center
        justify-between

        bg-[#050816]/95
        backdrop-blur-xl

        border-b
        border-white/10
        "
      >

        {/* LOGO */}

        <h1
          className="
          text-xl
          sm:text-2xl
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

          TradinJournal

        </h1>




        {/* MENU BUTTON */}

        <button

          onClick={() =>

            setOpen(!open)

          }

          className="
          w-11
          h-11

          rounded-xl

          bg-white/5
          border
          border-white/10

          flex
          items-center
          justify-center

          text-white

          shrink-0
          "

        >

          {

            open

            ? <X size={22} />

            : <Menu size={22} />

          }

        </button>

      </div>




      {/* =====================================================
          OVERLAY
      ===================================================== */}

      {

        open && (

          <div

            onClick={() =>

              setOpen(false)

            }

            className="
            lg:hidden

            fixed
            inset-0

            z-40

            bg-black/70
            backdrop-blur-sm
            "

          />

        )

      }




      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside

        className={`

        fixed
        top-0
        left-0

        z-50

        h-screen
        w-[280px]

        bg-[#0B1120]/95
        backdrop-blur-2xl

        border-r
        border-white/10

        transition-transform
        duration-300

        overflow-hidden

        ${

          open

          ? "translate-x-0"

          : "-translate-x-full lg:translate-x-0"

        }

        `}

      >




        {/* =====================================================
            INNER
        ===================================================== */}

        <div
          className="
          h-full

          flex
          flex-col

          px-5
          py-6

          overflow-y-scroll
          overflow-x-hidden

          [scrollbar-width:none]
          [-ms-overflow-style:none]

          [&::-webkit-scrollbar]:hidden
          "
        >




          {/* =====================================================
              HEADER
          ===================================================== */}

          <div
            className="
            flex
            items-start
            justify-between
            gap-3
            "
          >

            <div
              className="
              min-w-0
              "
            >

              <h1
                className="
                text-3xl
                font-black

                bg-gradient-to-r
                from-purple-400
                via-pink-500
                to-fuchsia-500

                bg-clip-text
                text-transparent

                break-words
                "
              >

                TradinJournal

              </h1>



              <p
                className="
                text-gray-400
                text-sm
                mt-2
                leading-6
                "
              >

                Powered by

                <span
                  className="
                  text-purple-400
                  ml-1
                  font-medium
                  "
                >

                  Raftar Trader FX

                </span>

              </p>

            </div>




            {/* CLOSE */}

            <button

              onClick={() =>

                setOpen(false)

              }

              className="
              lg:hidden

              w-10
              h-10

              rounded-xl

              bg-white/5
              border
              border-white/10

              flex
              items-center
              justify-center

              text-white

              shrink-0
              "

            >

              <X size={20} />

            </button>

          </div>




          {/* =====================================================
              MENU
          ===================================================== */}

          <div
            className="
            mt-10

            flex
            flex-col
            gap-3
            "
          >

            {

              menuItems.map(

                (
                  item,
                  index
                ) => (

                  <NavLink

                    key={index}

                    to={item.path}

                    onClick={() =>

                      setOpen(false)

                    }

                    className={

                      ({ isActive }) =>

                      `

                      flex
                      items-center
                      gap-4

                      px-4
                      py-4

                      rounded-2xl

                      transition-all
                      duration-300

                      border

                      overflow-hidden

                      ${

                        isActive

                        ? `

                          bg-gradient-to-r
                          from-purple-600
                          to-fuchsia-600

                          text-white

                          border-purple-500/30

                          shadow-lg
                          shadow-purple-500/20

                        `

                        : `

                          text-gray-300

                          border-transparent

                          hover:bg-white/5

                          hover:border-white/10

                          hover:text-white

                        `

                      }

                      `

                    }

                  >

                    {/* ICON */}

                    <div
                      className="
                      shrink-0
                      "
                    >

                      {item.icon}

                    </div>




                    {/* NAME */}

                    <span
                      className="
                      text-base
                      font-medium

                      truncate
                      "
                    >

                      {item.name}

                    </span>

                  </NavLink>

                )

              )

            }

          </div>




          {/* =====================================================
              FOOTER
          ===================================================== */}

          <div
            className="
            mt-auto
            pt-8
            "
          >

            <div
              className="
              p-5

              rounded-3xl

              bg-gradient-to-br
              from-purple-500/10
              to-fuchsia-500/10

              border
              border-purple-500/20
              "
            >

              <p
                className="
                text-sm
                text-gray-300
                leading-7
                "
              >

                🚀 Track trades,
                analyze performance,
                and improve your
                trading psychology
                with AI-powered analytics.

              </p>

            </div>

          </div>

        </div>

      </aside>

    </>

  );

}