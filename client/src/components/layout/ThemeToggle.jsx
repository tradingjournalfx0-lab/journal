import { Moon,Sun } from "lucide-react";

import { useEffect,useState } from "react";

export default function ThemeToggle() {




  // =========================
  // STATES
  // =========================

  const [dark,setDark] =
  useState(true);




  // =========================
  // LOAD SAVED THEME
  // =========================

  useEffect(()=>{

    const savedTheme =
    localStorage.getItem(

      "theme"

    );

    if(savedTheme === "light"){

      setDark(false);

      document.body.classList.add(

        "light"

      );

    }else{

      setDark(true);

      document.body.classList.remove(

        "light"

      );

    }

  },[]);




  // =========================
  // TOGGLE THEME
  // =========================

  const handleTheme =
  ()=>{

    const newDark =
    !dark;

    setDark(

      newDark

    );



    if(newDark){

      document.body.classList.remove(

        "light"

      );

      localStorage.setItem(

        "theme",

        "dark"

      );

    }else{

      document.body.classList.add(

        "light"

      );

      localStorage.setItem(

        "theme",

        "light"

      );

    }

  };




  return (

    <button

      onClick={handleTheme}

      className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">

      {dark ? (

        <Moon size={20} />

      ) : (

        <Sun size={20} />

      )}

    </button>

  );

}