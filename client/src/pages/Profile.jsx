import {
  useState,
} from "react";



import Sidebar from
"../components/layout/Sidebar";

import Navbar from
"../components/layout/Navbar";

import ProfileCard from
"../components/profile/ProfileCard";

import ProfileForm from
"../components/profile/ProfileForm";

import AvatarUpload from
"../components/profile/AvatarUpload";

import BrokerInfo from
"../components/profile/BrokerInfo";

import BillingHistory from
"../components/subscription/BillingHistory";



export default function Profile() {

  // =====================================================
  // REFRESH STATE
  // =====================================================

  const [refresh, setRefresh] =
  useState(false);




  // =====================================================
  // REFRESH FUNCTION
  // =====================================================

  const refreshProfile =
  () => {

    setRefresh(

      prev => !prev

    );

  };




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

            xl:flex-row
            xl:items-center
            xl:justify-between

            gap-6
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

                Profile

              </h1>



              <p
                className="
                text-gray-400

                mt-3

                text-sm
                sm:text-base
                lg:text-lg

                leading-7
                "
              >

                Manage your trader profile,
                broker settings,
                billing,
                and account preferences.

              </p>

            </div>




            {/* =================================================
                STATUS BADGES
            ================================================= */}

            <div
              className="
              flex
              flex-wrap

              items-center

              gap-3
              "
            >

              {/* LIVE */}

              <div
                className="
                bg-green-500/10

                border
                border-green-500/20

                px-4
                py-2

                rounded-2xl

                text-green-400

                text-sm
                font-medium

                whitespace-nowrap
                "
              >

                Live Profile Sync

              </div>




              {/* SECURITY */}

              <div
                className="
                bg-purple-500/10

                border
                border-purple-500/20

                px-4
                py-2

                rounded-2xl

                text-purple-300

                text-sm
                font-medium

                whitespace-nowrap
                "
              >

                Secure Account

              </div>

            </div>

          </div>




          {/* =====================================================
              GRID
          ===================================================== */}

          <div
            className="
            grid

            grid-cols-1
            xl:grid-cols-2

            gap-4
            sm:gap-6

            mt-6
            sm:mt-8
            "
          >

            {/* =================================================
                PROFILE CARD
            ================================================= */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <ProfileCard

                refresh={refresh}

              />

            </div>




            {/* =================================================
                PROFILE FORM
            ================================================= */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <ProfileForm

                refreshProfile={
                  refreshProfile
                }

              />

            </div>




            {/* =================================================
                AVATAR
            ================================================= */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <AvatarUpload

                refreshProfile={
                  refreshProfile
                }

              />

            </div>




            {/* =================================================
                BROKER INFO
            ================================================= */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              backdrop-blur-xl

              overflow-hidden
              "
            >

              <BrokerInfo

                refresh={refresh}

              />

            </div>

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

            <BillingHistory />

          </div>

        </main>

      </div>

    </div>

  );

}