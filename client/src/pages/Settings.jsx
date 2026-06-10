import { useEffect,useState } from "react";

import axios from "axios";

import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

export default function Settings() {




  // =========================
  // STATES
  // =========================

  const [settings,setSettings] =
  useState({

    darkMode:true,

    notifications:true,

  });

  const [loading,setLoading] =
  useState(false);




  // =========================
  // FETCH SETTINGS
  // =========================

  const fetchSettings =
  async()=>{

    try{

      const response =
      await axios.get(

        "/api/settings"

      );

      if(response.data){

        setSettings({

          darkMode:
          response.data.darkMode,

          notifications:
          response.data.notifications,

        });

      }

    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchSettings();

  },[]);




  // =========================
  // TOGGLE SETTINGS
  // =========================

  const toggleSetting =
  async(key)=>{

    const updatedSettings = {

      ...settings,

      [key]:
      !settings[key],

    };

    setSettings(

      updatedSettings

    );

    setLoading(true);

    try{

      await axios.post(

        "/api/settings",

        updatedSettings

      );

    }catch(error){

      console.log(error);

      alert(

        "Settings Update Failed"

      );

    }finally{

      setLoading(false);

    }

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

            Settings

          </h1>

          <p className="text-gray-400 mt-2">

            Customize your application settings.

          </p>

        </div>



        {/* SETTINGS CARD */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-8">

          <div className="space-y-6">

            {/* DARK MODE */}

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-semibold">

                  Dark Mode

                </h3>

                <p className="text-gray-400 text-sm mt-1">

                  Enable dark theme

                </p>

              </div>



              <button

                onClick={()=>

                  toggleSetting(

                    "darkMode"

                  )

                }

                disabled={loading}

                className={`w-16 h-8 rounded-full relative transition-all

                  ${settings.darkMode

                    ? "bg-purple-600"

                    : "bg-gray-600"

                  }`}>

                <div

                  className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all

                    ${settings.darkMode

                      ? "right-1"

                      : "left-1"

                    }`}

                />

              </button>

            </div>



            {/* NOTIFICATIONS */}

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-semibold">

                  Notifications

                </h3>

                <p className="text-gray-400 text-sm mt-1">

                  Receive trade alerts

                </p>

              </div>



              <button

                onClick={()=>

                  toggleSetting(

                    "notifications"

                  )

                }

                disabled={loading}

                className={`w-16 h-8 rounded-full relative transition-all

                  ${settings.notifications

                    ? "bg-green-600"

                    : "bg-gray-600"

                  }`}>

                <div

                  className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all

                    ${settings.notifications

                      ? "right-1"

                      : "left-1"

                    }`}

                />

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}