import { useState } from "react";

import { useNavigate, Link }
from "react-router-dom";

import axios from "axios";

export default function LoginForm() {

  const navigate =
  useNavigate();



  // =========================
  // STATES
  // =========================

  const [formData, setFormData] =
  useState({

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
  // LOGIN
  // =========================

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response =
      await axios.post(

        "http://localhost:5000/api/auth/login",

        formData

      );



      console.log(
        response.data
      );



      // SAVE TOKEN

      if (response.data.token) {

        localStorage.setItem(

          "token",

          response.data.token

        );

      }



      // SAVE USER ID

      if (response.data.user?._id) {

        localStorage.setItem(

          "userId",

          response.data.user._id

        );

      }



      alert(
        "Login Success ✅"
      );



      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      );



      alert(

        error.response?.data?.message ||

        "Login Failed ❌"

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

          Welcome Back

        </h2>



        <p className="
        text-gray-400
        mb-8
        ">

          Login to your trading journal account

        </p>



        <div className="space-y-5">

          {/* EMAIL */}

          <input

            type="email"

            name="email"

            placeholder="Enter email"

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

            placeholder="Enter password"

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



          {/* FORGOT PASSWORD */}

          <div className="
          flex
          justify-end
          ">

            <Link

              to="/forgot-password"

              className="
              text-sm
              text-purple-400
              hover:text-purple-300
              transition-all
              "

            >

              Forgot Password?

            </Link>

          </div>



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
              ? "Logging In..."
              : "Login"

            }

          </button>



          {/* REGISTER */}

          <div className="
          flex
          items-center
          justify-center
          pt-3
          ">

            <p className="text-gray-400">

              Don't have an account?

            </p>



            <Link

              to="/register"

              className="
              ml-2
              text-purple-400
              hover:text-purple-300
              font-semibold
              "

            >

              Register

            </Link>

          </div>

        </div>

      </form>

    </div>

  );

}