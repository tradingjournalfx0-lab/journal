
import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import api from "../../services/api";

export default function ResetPasswordForm(){

  const navigate =
  useNavigate();

  const [formData,setFormData] =
  useState({

    email:"",
    password:"",

  });



  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };



  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    try{

      const response =
      await api.post(

        "/auth/reset-password",

        formData

      );



      alert(

        response.data.message

      );



      navigate("/login");

    }catch(error){

      alert(

        error.response?.data?.message ||

        "Reset failed ❌"

      );

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

      <h2 className="
      text-4xl
      font-black
      mb-8
      ">

        Reset Password

      </h2>



      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

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
          "
        />



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
          "
        />



        <button
          type="submit"
          className="
          w-full
          bg-purple-600
          hover:bg-purple-700
          p-4
          rounded-2xl
          font-semibold
          "
        >

          Reset Password

        </button>

      </form>

    </div>

  );

}

