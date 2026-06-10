
import { useState } from "react";

import { Link } from "react-router-dom";

import api from "../../services/api";

export default function ForgotPassword() {

  // =========================
  // STATE
  // =========================

  const [email, setEmail] =
  useState("");

  const [loading, setLoading] =
  useState(false);



  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // =========================
      // API
      // =========================

      const response =
      await api.post(

        "/auth/forgot-password",

        {

          email,

        }

      );



      alert(

        response.data.message ||

        "Password reset link sent ✅"

      );

    } catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );



      alert(

        error.response?.data?.message ||

        "Failed to send reset link ❌"

      );

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="
    w-full
    max-w-md
    bg-white/5
    border border-white/10
    rounded-3xl
    p-8
    backdrop-blur-xl
    shadow-2xl
    ">

      {/* =========================
          TOP
      ========================= */}

      <div className="text-center mb-10">

        <div className="
        w-20 h-20
        mx-auto
        rounded-3xl
        bg-gradient-to-r
        from-purple-500
        to-blue-500
        flex
        items-center
        justify-center
        text-4xl
        shadow-[0_0_50px_rgba(168,85,247,0.35)]
        ">

          🔒

        </div>



        <h2 className="
        text-4xl
        font-black
        mt-6
        ">

          Forgot Password

        </h2>



        <p className="
        text-gray-400
        mt-4
        leading-7
        ">

          Enter your email address
          and we’ll send you a password
          reset link.

        </p>

      </div>



      {/* =========================
          FORM
      ========================= */}

      <form

        onSubmit={handleSubmit}

        className="space-y-6"

      >

        {/* EMAIL */}

        <div>

          <label className="
          text-sm
          text-gray-400
          ">

            Email Address

          </label>



          <input

            type="email"

            required

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            placeholder="Enter email"

            className="
            w-full
            mt-3
            bg-black/20
            border border-white/10
            rounded-2xl
            p-4
            outline-none
            focus:border-purple-500
            transition-all
            text-white
            "

          />

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
          duration-300
          py-4
          rounded-2xl
          font-semibold
          text-lg
          shadow-[0_0_40px_rgba(168,85,247,0.35)]
          disabled:opacity-50
          "

        >

          {

            loading

            ? "Sending..."

            : "Send Reset Link"

          }

        </button>

      </form>



      {/* =========================
          BOTTOM
      ========================= */}

      <div className="
      flex
      items-center
      justify-center
      mt-8
      text-gray-400
      ">

        Remember your password?

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

  );

}

