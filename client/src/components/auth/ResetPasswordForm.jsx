
import { useState } from "react";

import {

  useNavigate,

  useSearchParams,

} from "react-router-dom";

import api from "../../services/api";

export default function ResetPasswordForm(){




  // =========================
  // NAVIGATE
  // =========================

  const navigate =
  useNavigate();




  // =========================
  // URL PARAMS
  // =========================

  const [searchParams] =
  useSearchParams();




  const email =
  searchParams.get("email") || "";





  // =========================
  // STATES
  // =========================

  const [formData,setFormData] =
  useState({

    email,

    password:"",

  });




  const [loading,setLoading] =
  useState(false);





  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };





  // =========================
  // SUBMIT
  // =========================

  const handleSubmit =
  async(e)=>{

    e.preventDefault();





    try{

      setLoading(true);






      const response =
      await api.post(

        "/auth/reset-password",

        formData

      );






      alert(

        response.data.message ||

        "Password reset successful ✅"

      );






      navigate("/login");

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );






      alert(

        error.response?.data?.message ||

        "Reset failed ❌"

      );

    }finally{

      setLoading(false);

    }

  };





  return(

    <div className="
    w-full
    max-w-md
    bg-white/5
    border border-white/10
    rounded-3xl
    p-8
    ">




      {/* TITLE */}

      <h2 className="
      text-4xl
      font-black
      mb-8
      text-white
      ">

        Reset Password

      </h2>





      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >




        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="
          w-full
          p-4
          rounded-2xl
          bg-black/20
          border border-white/10
          outline-none
          text-white
          "
        />





        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="New Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="
          w-full
          p-4
          rounded-2xl
          bg-black/20
          border border-white/10
          outline-none
          text-white
          "
        />





        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-purple-600
          hover:bg-purple-700
          p-4
          rounded-2xl
          font-semibold
          transition-all
          disabled:opacity-50
          "
        >

          {

            loading

            ?

            "Resetting..."

            :

            "Reset Password"

          }

        </button>

      </form>

    </div>

  );

}

