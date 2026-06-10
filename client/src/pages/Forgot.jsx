import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ForgotPassword from "../components/auth/ForgotPassword";

import HomeNavbar from "../components/home/HomeNavbar";

export default function Forgot() {

  // =========================
  // NAVIGATE
  // =========================

  const navigate =
  useNavigate();



  // =========================
  // CHECK LOGIN
  // =========================

  useEffect(() => {

    const token =
    localStorage.getItem(

      "token"

    );



    // ALREADY LOGIN

    if (token) {

      navigate(

        "/dashboard"

      );

    }

  }, [navigate]);



  return (

    <div className="
    min-h-screen
    bg-[#050816]
    text-white
    ">

      {/* =========================
          NAVBAR
      ========================= */}

      <HomeNavbar />



      {/* =========================
          LOGIN AREA
      ========================= */}

      <div className="
      flex
      items-center
      justify-center
      px-5
      
      ">

        <ForgotPassword/>

      </div>

    </div>

  );

}