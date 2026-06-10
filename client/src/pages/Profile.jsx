import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

import ProfileCard from "../components/profile/ProfileCard";

import ProfileForm from "../components/profile/ProfileForm";

import AvatarUpload from "../components/profile/AvatarUpload";

import BrokerInfo from "../components/profile/BrokerInfo";

import BillingHistory from "../components/subscription/BillingHistory";

export default function Profile() {




  // =========================
  // REFRESH STATE
  // =========================

  const [refresh,setRefresh] =
  useState(false);




  // =========================
  // REFRESH FUNCTION
  // =========================

  const refreshProfile =
  ()=>{

    setRefresh(

      prev => !prev

    );

  };




  return (

    <div className="flex min-h-screen bg-[#050816] text-white">




      {/* SIDEBAR */}

      <Sidebar />




      {/* MAIN */}

      <div className="flex-1 ml-64 p-8">




        {/* NAVBAR */}

        <Navbar />




        {/* HEADER */}

        <div className="mt-8">

          <h1 className="text-4xl font-bold">

            Profile

          </h1>

          <p className="text-gray-400 mt-2">

            Manage your trader account.

          </p>

        </div>




        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">




          {/* PROFILE CARD */}

          <ProfileCard

            refresh={refresh}

          />




          {/* PROFILE FORM */}

          <ProfileForm

            refreshProfile={

              refreshProfile

            }

          />




          {/* AVATAR */}

          <AvatarUpload

            refreshProfile={

              refreshProfile

            }

          />




          {/* BROKER */}

          <BrokerInfo

            refresh={refresh}

          />

          {/* Biling History */}
                  <div className="mt-2">
          
                    <BillingHistory />
          
                  </div>

        </div>

      </div>

    </div>

  );

}