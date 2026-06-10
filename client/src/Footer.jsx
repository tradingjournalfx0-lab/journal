import { Link } from "react-router-dom";

import logo from "./assets/icon.png";

export default function Footer() {

  return (

    <footer className="
    border-t
    border-white/10
    bg-[#050816]
    mt-32
    ">

      <div className="
      max-w-7xl
      mx-auto
      px-4 sm:px-6 lg:px-8
      py-16
      ">

        {/* TOP */}

        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-12
        ">

          {/* LOGO & ABOUT */}

          <div>

            <div className="
            flex
            items-center
            gap-4
            ">

              {/* LOGO */}

              <div className="
              w-14 h-14
              rounded-2xl
              bg-gradient-to-r
              from-white-500
              
              flex
              items-center
              justify-center
              text-2xl
              font-bold
              shadow-[0_0_40px_rgba(168,85,247,0.35)]
              ">

                <img 
                src={logo}
                alt=""
                />

              </div>



              {/* TITLE */}

              <div>

                <h1 className="
                text-2xl
                font-black
                ">

                  <span className="
                  bg-gradient-to-r
                  from-purple-500
                  to-blue-500
                  bg-clip-text
                  text-transparent
                  ">

                    Trading

                  </span>

                  {" "}

                  <span className="text-yellow-400">

                    Journal FX

                  </span>

                </h1>

                <p className="text-gray-400 text-sm">

                  Raftar Trader Fx

                </p>

              </div>

            </div>



            {/* DESC */}

            <p className="
            text-gray-400
            leading-8
            mt-6
            ">

              Track trades, analyze performance,
              improve psychology and grow faster
              with AI-powered trading tools.

            </p>

          </div>



          {/* QUICK LINKS */}

          <div>

            <h2 className="
            text-xl
            font-bold
            mb-6
            ">

              Quick Links

            </h2>



            <div className="
            flex
            flex-col
            gap-4
            text-gray-400
            ">

              <Link
                to="/"
                className="hover:text-purple-400 transition-all"
              >

                Home

              </Link>



              <Link
                to="/dashboard"
                className="hover:text-purple-400 transition-all"
              >

                Dashboard

              </Link>



              <Link
                to="/plan"
                className="hover:text-purple-400 transition-all"
              >

                Pricing

              </Link>



              <Link
                to="/contact"
                className="hover:text-purple-400 transition-all"
              >

                Contact

              </Link>

            </div>

          </div>



          {/* FEATURES */}

          <div>

            <h2 className="
            text-xl
            font-bold
            mb-6
            ">

              Features

            </h2>



            <div className="
            flex
            flex-col
            gap-4
            text-gray-400
            ">

              <p className="hover:text-purple-400 transition-all">

                📊 Dashboard

              </p>



              <p className="hover:text-purple-400 transition-all">

                📈 Trades

              </p>



              <p className="hover:text-purple-400 transition-all">

                📉 Analytics

              </p>



              <p className="hover:text-purple-400 transition-all">

                📔 Journal

              </p>

            </div>

          </div>



          {/* NEWSLETTER */}

          <div>

            <h2 className="
            text-xl
            font-bold
            mb-6
            ">

              Newsletter

            </h2>



            <p className="
            text-gray-400
            leading-7
            mb-6
            ">

              Get latest trading updates,
              strategies and platform news.

            </p>



            {/* INPUT */}

            <div className="
            flex
            items-center
            bg-white/5
            border border-white/10
            rounded-2xl
            overflow-hidden
            ">

              <input
                type="email"
                placeholder="Enter email"
                required
                className="
                w-full
                bg-transparent
                px-5 py-4
                outline-none
                text-white
                "
              />



              <button className="
              px-6 py-4
              bg-gradient-to-r
              from-purple-500
              to-blue-500
              font-semibold
              hover:opacity-90
              transition-all
              ">

                Join

              </button>

            </div>

          </div>

        </div>



        {/* BOTTOM */}

        <div className="
        border-t
        border-white/10
        mt-16
        pt-8
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-6
        ">

          {/* COPYRIGHT */}

          <p className="text-gray-400 text-center">

            © 2026 Trading Journal.
            All Rights Reserved.

          </p>



          {/* SOCIALS */}

          <div className="
          flex
          items-center
          gap-5
          text-2xl
          ">

            <a
              href="#"
              className="
              hover:scale-110
              transition-all
              "
            >

              🌐

            </a>



            <a
              href="#"
              className="
              hover:scale-110
              transition-all
              "
            >

              📘

            </a>



            <a
              href="#"
              className="
              hover:scale-110
              transition-all
              "
            >

              🐦

            </a>



            <a
              href="#"
              className="
              hover:scale-110
              transition-all
              "
            >

              📸

            </a>

          </div>

        </div>

      </div>

    </footer>

  );

}