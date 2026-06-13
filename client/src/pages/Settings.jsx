import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";



import Sidebar from
"../components/layout/Sidebar";

import Navbar from
"../components/layout/Navbar";



export default function Settings() {

  // =====================================================
  // STATES
  // =====================================================

  const [settings, setSettings] =
  useState({

    darkMode: true,

    notifications: true,

    autoRefresh: true,

    emailAlerts: false,

    compactMode: false,

  });




  const [loading, setLoading] =
  useState(false);




  // =====================================================
  // FETCH SETTINGS
  // =====================================================

  const fetchSettings =
  async () => {

    try {

      const token =
      localStorage.getItem(
        "token"
      );



      if (!token) return;




      // =================================================
      // API
      // =================================================

      const response =
      await api.get(

        "/settings",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      console.log(
        "SETTINGS:",
        response.data
      );




      // =================================================
      // HANDLE RESPONSE
      // =================================================

      const data =

      response.data?.data ||

      response.data;




      if (data) {

        setSettings({

          darkMode:
          data.darkMode ?? true,

          notifications:
          data.notifications ?? true,

          autoRefresh:
          data.autoRefresh ?? true,

          emailAlerts:
          data.emailAlerts ?? false,

          compactMode:
          data.compactMode ?? false,

        });

      }

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {

    fetchSettings();

  }, []);




  // =====================================================
  // TOGGLE SETTINGS
  // =====================================================

  const toggleSetting =
  async (key) => {

    const updatedSettings = {

      ...settings,

      [key]:
      !settings[key],

    };




    // =================================================
    // UI UPDATE
    // =================================================

    setSettings(
      updatedSettings
    );



    setLoading(true);




    try {

      const token =
      localStorage.getItem(
        "token"
      );



      await api.post(

        "/settings",

        updatedSettings,

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );



      alert(
        "Settings Update Failed"
      );

    }

    finally {

      setLoading(false);

    }

  };




  // =====================================================
  // TOGGLE SWITCH
  // =====================================================

  const ToggleSwitch = ({
    enabled,
    onClick,
    activeColor,
  }) => (

    <button

      onClick={onClick}

      disabled={loading}

      className={`

      w-16
      h-8

      rounded-full

      relative

      transition-all
      duration-300

      shrink-0

      ${

        enabled

        ? activeColor

        : "bg-gray-600"

      }

      ${

        loading

        ? "opacity-50 cursor-not-allowed"

        : ""

      }

      `}

    >

      <div

        className={`

        w-6
        h-6

        bg-white

        rounded-full

        absolute
        top-1

        transition-all
        duration-300

        ${

          enabled

          ? "right-1"

          : "left-1"

        }

        `}

      />

    </button>

  );




  // =====================================================
  // SETTINGS ITEM
  // =====================================================

  const SettingItem = ({

    title,
    description,

    enabled,

    onClick,

    activeColor,

    icon,

  }) => (

    <div
      className="
      flex
      flex-col

      sm:flex-row
      sm:items-center
      sm:justify-between

      gap-5

      bg-white/5

      border
      border-white/10

      rounded-3xl

      p-5
      sm:p-6

      backdrop-blur-xl

      overflow-hidden
      "
    >

      {/* =================================================
          LEFT
      ================================================= */}

      <div
        className="
        flex
        items-start

        gap-4

        min-w-0
        "
      >

        {/* ICON */}

        <div
          className="
          w-14
          h-14

          rounded-2xl

          bg-purple-500/10

          border
          border-purple-500/20

          flex
          items-center
          justify-center

          text-2xl

          shrink-0
          "
        >

          {icon}

        </div>




        {/* TEXT */}

        <div
          className="
          min-w-0
          "
        >

          <h3
            className="
            text-lg
            sm:text-xl

            font-semibold

            break-words
            "
          >

            {title}

          </h3>



          <p
            className="
            text-gray-400

            text-sm
            sm:text-base

            mt-2

            leading-7

            break-words
            "
          >

            {description}

          </p>

        </div>

      </div>




      {/* =================================================
          RIGHT
      ================================================= */}

      <ToggleSwitch

        enabled={enabled}

        onClick={onClick}

        activeColor={activeColor}

      />

    </div>

  );




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

                Settings

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

                Customize your trading dashboard,
                notifications,
                AI preferences,
                and account experience.

              </p>

            </div>




            {/* =================================================
                BADGES
            ================================================= */}

            <div
              className="
              flex
              flex-wrap

              items-center

              gap-3
              "
            >

              {/* AUTO */}

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

                ● Auto Sync Enabled

              </div>




              {/* AI */}

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

                AI Preferences Active

              </div>

            </div>

          </div>




          {/* =====================================================
              SETTINGS GRID
          ===================================================== */}

          <div
            className="
            grid

            grid-cols-1
            lg:grid-cols-2

            gap-4
            sm:gap-6

            mt-6
            sm:mt-8
            "
          >

            {/* DARK MODE */}

            <SettingItem

              title="Dark Mode"

              description="Enable premium dark trading theme for better night viewing experience."

              enabled={settings.darkMode}

              onClick={() =>

                toggleSetting(
                  "darkMode"
                )

              }

              activeColor="bg-purple-600"

              icon="🌙"

            />




            {/* NOTIFICATIONS */}

            <SettingItem

              title="Notifications"

              description="Receive instant trade alerts and account activity notifications."

              enabled={settings.notifications}

              onClick={() =>

                toggleSetting(
                  "notifications"
                )

              }

              activeColor="bg-green-600"

              icon="🔔"

            />




            {/* AUTO REFRESH */}

            <SettingItem

              title="Auto Refresh"

              description="Automatically refresh live trades, analytics, and dashboard data."

              enabled={settings.autoRefresh}

              onClick={() =>

                toggleSetting(
                  "autoRefresh"
                )

              }

              activeColor="bg-blue-600"

              icon="🔄"

            />




            {/* EMAIL ALERTS */}

            <SettingItem

              title="Email Alerts"

              description="Get important trade and subscription updates directly on email."

              enabled={settings.emailAlerts}

              onClick={() =>

                toggleSetting(
                  "emailAlerts"
                )

              }

              activeColor="bg-pink-600"

              icon="📧"

            />




            {/* COMPACT MODE */}

            <SettingItem

              title="Compact Mode"

              description="Use compact dashboard layout for smaller screens and better productivity."

              enabled={settings.compactMode}

              onClick={() =>

                toggleSetting(
                  "compactMode"
                )

              }

              activeColor="bg-orange-600"

              icon="📱"

            />

          </div>




          {/* =====================================================
              FOOTER CARD
          ===================================================== */}

          <div
            className="
            mt-6
            sm:mt-8

            bg-gradient-to-r
            from-purple-500/10
            to-fuchsia-500/10

            border
            border-purple-500/20

            rounded-3xl

            p-6
            sm:p-8

            overflow-hidden
            "
          >

            <h2
              className="
              text-2xl
              sm:text-3xl

              font-bold

              break-words
              "
            >

              Trading Preferences

            </h2>



            <p
              className="
              text-gray-300

              mt-4

              leading-8

              text-sm
              sm:text-base

              max-w-3xl

              break-words
              "
            >

              Personalize your trading
              environment with advanced
              dashboard settings,
              live notifications,
              AI-powered preferences,
              and responsive layouts
              optimized for every device.

            </p>

          </div>

        </main>

      </div>

    </div>

  );

}