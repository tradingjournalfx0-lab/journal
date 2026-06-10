import {
  useEffect,
  useState,
} from "react";

export default function useTheme() {

  const [theme,setTheme] =
    useState("dark");

  useEffect(()=>{

    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    if(savedTheme){

      setTheme(savedTheme);

      document.documentElement
      .classList.add(savedTheme);

    }

  },[]);

  const toggleTheme = ()=>{

    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);

    localStorage.setItem(
      "theme",
      newTheme
    );

    document.documentElement
    .classList.remove(
      theme
    );

    document.documentElement
    .classList.add(
      newTheme
    );

  };

  return {

    theme,
    toggleTheme,

  };

}