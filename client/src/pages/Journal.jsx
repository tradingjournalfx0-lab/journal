import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";



import Sidebar from
"../components/layout/Sidebar";

import Navbar from
"../components/layout/Navbar";

import JournalEditor from
"../components/journal/JournalEditor";

import JournalList from
"../components/journal/JournalList";



export default function Journal() {

  // =====================================================
  // STATES
  // =====================================================

  const [journals, setJournals] =
  useState([]);

  const [loading, setLoading] =
  useState(true);




  // =====================================================
  // FETCH JOURNALS
  // =====================================================

  const fetchJournals =
  async () => {

    try {

      // =================================================
      // TOKEN
      // =================================================

      const token =
      localStorage.getItem(
        "token"
      );



      if (!token) {

        setLoading(false);

        return;

      }



      // =================================================
      // API
      // =================================================

      const response =
      await api.get(

        "/journals",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      console.log(
        "JOURNALS:",
        response.data
      );



      // =================================================
      // HANDLE RESPONSE
      // =================================================

      const journalData =

      Array.isArray(response.data)

      ? response.data

      : Array.isArray(response.data.data)

      ? response.data.data

      : Array.isArray(response.data.journals)

      ? response.data.journals

      : [];



      // =================================================
      // SAVE DATA
      // =================================================

      setJournals(
        journalData
      );

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

    finally {

      setLoading(false);

    }

  };




  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {

    fetchJournals();




    // =================================================
    // LIVE AUTO REFRESH
    // =================================================

    const interval =

    setInterval(() => {

      fetchJournals();

    }, 5000);




    return () => {

      clearInterval(
        interval
      );

    };

  }, []);




  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loading) {

    return (

      <div
        className="
        min-h-screen

        bg-[#050816]

        flex
        items-center
        justify-center

        text-white

        px-4
        "
      >

        <div
          className="
          flex
          flex-col
          items-center
          gap-5
          "
        >

          {/* LOADER */}

          <div
            className="
            w-16
            h-16

            border-4
            border-purple-500/20
            border-t-purple-500

            rounded-full

            animate-spin
            "
          />



          {/* TEXT */}

          <h2
            className="
            text-xl
            sm:text-2xl

            font-semibold
            "
          >

            Loading Journal...

          </h2>

        </div>

      </div>

    );

  }




  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
      flex

      min-h-screen

      bg-[#050816]
      text-white

      w-full
      max-w-full

      overflow-hidden
      "
    >




      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />




      {/* =====================================================
          MAIN WRAPPER
      ===================================================== */}

      <div
        className="
        flex-1

        flex
        flex-col

        w-full
        min-w-0

        lg:ml-72
        "
      >




        {/* =====================================================
            NAVBAR
        ===================================================== */}

        <div
          className="
          sticky
          top-0
          z-40

          px-4
          sm:px-6
          lg:px-8

          pt-4

          bg-[#050816]/80

          backdrop-blur-xl
          "
        >

          <Navbar />

        </div>




        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main
          className="
          flex-1

          w-full
          min-w-0

          px-4
          sm:px-6
          lg:px-8

          py-6
          sm:py-8

          overflow-visible
          "
        >




          {/* =====================================================
              HEADER
          ===================================================== */}

          <div
            className="
            flex
            flex-col
            xl:flex-row

            xl:items-center
            xl:justify-between

            gap-6
            "
          >

            {/* LEFT */}

            <div
              className="
              min-w-0
              "
            >

              <h1
                className="
                text-3xl
                sm:text-4xl
                lg:text-5xl

                font-black

                break-words
                "
              >

                Trading Journal

              </h1>



              <p
                className="
                text-gray-400

                mt-3

                text-sm
                sm:text-base
                lg:text-lg

                leading-7

                max-w-2xl
                "
              >

                Track emotions,
                trading psychology,
                mistakes,
                lessons,
                and improve your
                trading discipline.

              </p>

            </div>




            {/* =================================================
                RIGHT BADGES
            ================================================= */}

            <div
              className="
              flex
              flex-wrap

              items-center

              gap-3
              "
            >

              {/* AI */}

              <div
                className="
                bg-purple-500/10

                border
                border-purple-500/20

                px-4
                py-2

                rounded-2xl

                text-purple-300

                text-sm
                font-medium

                whitespace-nowrap
                "
              >

                AI Journal Insights

              </div>




              {/* LIVE */}

              <div
                className="
                bg-green-500/10

                border
                border-green-500/20

                px-4
                py-2

                rounded-2xl

                text-green-400

                text-sm
                font-medium

                whitespace-nowrap
                "
              >

                Live Sync Enabled

              </div>

            </div>

          </div>




          {/* =====================================================
              GRID
          ===================================================== */}

          <div
            className="
            grid

            grid-cols-1
            xl:grid-cols-2

            gap-4
            sm:gap-6

            mt-6
            sm:mt-8
            "
          >

            {/* =================================================
                EDITOR
            ================================================= */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              backdrop-blur-xl

              p-2

              overflow-hidden
              "
            >

              <JournalEditor

                refreshJournals={
                  fetchJournals
                }

              />

            </div>




            {/* =================================================
                JOURNAL LIST
            ================================================= */}

            <div
              className="
              min-w-0

              bg-white/5

              border
              border-white/10

              rounded-3xl

              backdrop-blur-xl

              overflow-hidden
              "
            >

              {

                loading ? (

                  <div
                    className="
                    p-10

                    text-center

                    text-gray-400

                    flex
                    flex-col

                    items-center
                    justify-center

                    gap-5

                    min-h-[400px]
                    "
                  >

                    {/* LOADER */}

                    <div
                      className="
                      w-14
                      h-14

                      border-4
                      border-purple-500/20
                      border-t-purple-500

                      rounded-full

                      animate-spin
                      "
                    />



                    {/* TEXT */}

                    <p
                      className="
                      text-lg
                      "
                    >

                      Loading Journals...

                    </p>

                  </div>

                ) : journals.length > 0 ? (

                  <JournalList

                    journals={journals}

                    refreshJournals={
                      fetchJournals
                    }

                  />

                ) : (

                  <div
                    className="
                    p-6
                    sm:p-10

                    text-center

                    flex
                    flex-col

                    items-center
                    justify-center

                    min-h-[400px]
                    "
                  >

                    {/* ICON */}

                    <div
                      className="
                      w-24
                      h-24

                      rounded-full

                      bg-purple-500/10

                      border
                      border-purple-500/20

                      flex
                      items-center
                      justify-center

                      text-5xl
                      "
                    >

                      📔

                    </div>



                    {/* TITLE */}

                    <h2
                      className="
                      text-2xl
                      sm:text-3xl

                      font-bold

                      mt-6
                      "
                    >

                      No Journal Entries

                    </h2>



                    {/* TEXT */}

                    <p
                      className="
                      text-gray-400

                      mt-4

                      max-w-lg

                      leading-8

                      text-sm
                      sm:text-base
                      "
                    >

                      Start writing your
                      trading thoughts,
                      emotions,
                      mistakes,
                      and lessons
                      to improve consistency.

                    </p>

                  </div>

                )

              }

            </div>

          </div>

        </main>

      </div>

    </div>

  );

}