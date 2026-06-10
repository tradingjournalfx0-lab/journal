import { useEffect,useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {




  // =========================
  // STATES
  // =========================

  const [profile,setProfile] =
  useState(null);

  const [showMenu,setShowMenu] =
  useState(false);

  const navigate =
  useNavigate();




  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile =
  async()=>{

    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      const response =
      await axios.get(

        "http://localhost:5000/api/profile",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

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
  // AUTO REFRESH
  // =========================

  useEffect(()=>{

    fetchProfile();




    // REALTIME REFRESH

    const interval =

    setInterval(()=>{

      fetchProfile();

    },2000);




    return ()=>{

      clearInterval(interval);

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




    alert(

      "Logged Out ✅"

    );




    navigate(

      "/login"

    );

  };




  return (

    <div className="h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between px-8">




      {/* LEFT */}

      <div>

        <h2 className="text-2xl font-bold">

          Dashboard

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Welcome back trader 👋

        </p>       
      </div>

      <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 px-5 py-3 rounded-2xl ">

              <span className="w-3 h-3 bg-green-400 rounded-full" />

              <span className="text-purple-300">

                Smart Trading Journal Platform <br/>
                Powered by Raftar Trader FX

              </span>

            </div>




      {/* RIGHT */}

      <div className="flex items-center gap-4">




        {/* THEME */}

        <ThemeToggle />

         {/* Home */}

           <a href="/" >Home</a>


        {/* MT5 */}

        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl border border-green-500/20">

          MT5 Connected

        </div>




        {/* PROFILE */}

        <div className="relative">

          <div

            onClick={()=>

              setShowMenu(

                !showMenu

              )

            }

            className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/10 cursor-pointer">




            {/* AVATAR */}

            <img
              src={

                profile?.avatar

                ? `http://localhost:5000/${profile.avatar}`

                : "/avatar.png"

              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />




            {/* INFO */}

            <div>

              <h4 className="font-semibold">

                {profile?.fullName ||

                  ""

                }

              </h4>

              <p className="text-xs text-gray-400">

                {profile?.accountType ||

                  ""

                }

              </p>

            </div>

          </div>




          {/* DROPDOWN */}

          {showMenu && (

            <div className="absolute right-0 mt-3 w-52 bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">




              {/* PROFILE */}

              <button

                onClick={()=>

                  navigate("/profile")

                }

                className="w-full text-left px-5 py-4 hover:bg-white/5 transition-all">

                👤 Profile

              </button>




              {/* SETTINGS */}

              <button

                onClick={()=>

                  navigate("/settings")

                }

                className="w-full text-left px-5 py-4 hover:bg-white/5 transition-all">

                ⚙️ Settings

              </button>




              {/* LOGOUT */}

              <button

                onClick={handleLogout}

                className="w-full text-left px-5 py-4 hover:bg-red-500/10 text-red-400 transition-all">

                🚪 Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );

}