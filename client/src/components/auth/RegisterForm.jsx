import { useState } from "react";

import { Link, useNavigate }
from "react-router-dom";

import axios from "axios";

export default function RegisterForm() {

  // =========================
  // NAVIGATE
  // =========================

  const navigate =
  useNavigate();



  // =========================
  // STATES
  // =========================

  const [formData, setFormData] =
  useState({

    name: "",
    email: "",
    password: "",

  });



  // =========================
  // LOADING
  // =========================

  const [loading, setLoading] =
  useState(false);



  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };



  // =========================
  // REGISTER
  // =========================

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
      await axios.post(

        "/auth/register",

        formData

      );



      console.log(
        response.data
      );



      // SUCCESS

      alert(
        "Register Success ✅"
      );



      // REDIRECT LOGIN

      navigate(
        "/login"
      );

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );



      alert(

        error.response?.data?.message ||

        "Register Failed ❌"

      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="
    w-full
    max-w-md
    ">

      <form

        onSubmit={handleSubmit}

        className="
        bg-white/5
        border border-white/10
        backdrop-blur-xl
        rounded-3xl
        p-8
        shadow-2xl
        "

      >

        {/* TITLE */}

        <h2 className="
        text-4xl
        font-black
        mb-3
        ">

          Create Account

        </h2>



        <p className="
        text-gray-400
        mb-8
        ">

          Start your professional
          trading journey today

        </p>



        <div className="space-y-5">

          {/* NAME */}

          <input

            type="text"

            name="name"

            placeholder="Full Name"

            required

            onChange={handleChange}

            className="
            w-full
            p-4
            rounded-2xl
            bg-black/20
            border border-white/10
            outline-none
            focus:border-purple-500
            transition-all
            "

          />



          {/* EMAIL */}

          <input

            type="email"

            name="email"

            placeholder="Enter Email"

            required

            onChange={handleChange}

            className="
            w-full
            p-4
            rounded-2xl
            bg-black/20
            border border-white/10
            outline-none
            focus:border-purple-500
            transition-all
            "

          />



          {/* PASSWORD */}

          <input

            type="password"

            name="password"

            placeholder="Create Password"

            required

            onChange={handleChange}

            className="
            w-full
            p-4
            rounded-2xl
            bg-black/20
            border border-white/10
            outline-none
            focus:border-purple-500
            transition-all
            "

          />



          {/* BUTTON */}

          <button

            type="submit"

            disabled={loading}

            className="
            w-full
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            hover:opacity-90
            transition-all
            p-4
            rounded-2xl
            font-semibold
            text-lg
            disabled:opacity-50
            "

          >

            {

              loading
              ? "Creating Account..."
              : "Register"

            }

          </button>



          {/* LOGIN */}

          <div className="
          flex
          items-center
          justify-center
          pt-3
          ">

            <p className="text-gray-400">

              Already have an account?

            </p>



            <Link

              to="/login"

              className="
              ml-2
              text-purple-400
              hover:text-purple-300
              font-semibold
              "

            >

              Login

            </Link>

          </div>

        </div>

      </form>

    </div>

  );

}