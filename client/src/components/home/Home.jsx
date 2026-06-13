
import {

  Link,
  useNavigate,

} from "react-router-dom";

// seo page
import HomeSeo from "../../seopage/HomeSeo";

import {

  useEffect,
  useState,

} from "react";

import HomeNavbar
from "./HomeNavbar";

import FeaturesSection
from "./FeaturesSection";

import Footer
from "../../Footer";
import Hero from "./Hero";
import Market from "./Market";
 

export default function Home() {




  // =========================
  // NAVIGATE
  // =========================

  const navigate =
  useNavigate();




  // =========================
  // LOGIN STATE
  // =========================

  const [isLoggedIn,setIsLoggedIn] =
  useState(false);




  // =========================
  // CHECK LOGIN
  // =========================

  useEffect(()=>{

    const checkLogin = ()=>{

      const token =
      localStorage.getItem(

        "token"

      );

      setIsLoggedIn(

        !!token

      );

    };



    // INITIAL CHECK

    checkLogin();



    // AUTO REFRESH

    window.addEventListener(

      "storage",

      checkLogin

    );



    return ()=>{

      window.removeEventListener(

        "storage",

        checkLogin

      );

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



    localStorage.removeItem(

      "userId"

    );



    setIsLoggedIn(false);




    alert(

      "Logout Successful"

    );



    navigate("/");

  };




  return (

    <div className="
    min-h-screen
    bg-[#050816]
    text-white
    overflow-hidden
    ">

        {/* SEO */}
        <HomeSeo />
      {/* =========================
          NAVBAR
      ========================= */}

      <HomeNavbar />


      <Hero  />
      
     <Market/>




 



      {/* FEATURES */}

      <FeaturesSection />





      {/* FOOTER */}

      <Footer />

    </div>

  );

}

