import {
  useState,
  useMemo,
} from "react";

import {
  Search,
  Filter,
} from "lucide-react";



export default function TradeFilters({

  trades = [],

  setFilteredTrades,

}) {

  // =====================================================
  // STATES
  // =====================================================

  const [searchTerm, setSearchTerm] =
  useState("");

  const [strategy, setStrategy] =
  useState("");

  const [session, setSession] =
  useState("");




  // =====================================================
  // FILTER LOGIC
  // =====================================================

  useMemo(() => {

    const filtered =

    trades.filter((trade) => {

      // ===============================================
      // SEARCH
      // ===============================================

      const matchSearch =

        trade?.symbol
        ?.toLowerCase()

        ?.includes(

          searchTerm.toLowerCase()

        );




      // ===============================================
      // STRATEGY
      // ===============================================

      const matchStrategy =

        strategy

        ? trade?.strategy === strategy

        : true;




      // ===============================================
      // SESSION
      // ===============================================

      const matchSession =

        session

        ? trade?.session === session

        : true;




      return (

        matchSearch &&

        matchStrategy &&

        matchSession

      );

    });




    setFilteredTrades(
      filtered
    );

  }, [

    trades,

    searchTerm,

    strategy,

    session,

    setFilteredTrades,

  ]);




  // =====================================================
  // INPUT STYLE
  // =====================================================

  const inputStyle = `

  w-full

  bg-white/5

  border
  border-white/10

  rounded-2xl

  px-4
  py-3

  outline-none

  text-white

  placeholder:text-gray-500

  focus:border-purple-500
  focus:bg-white/[0.07]

  transition-all
  duration-300

  text-sm
  sm:text-base

  `;




  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
      w-full

      bg-white/5

      border
      border-white/10

      rounded-3xl

      p-4
      sm:p-5

      backdrop-blur-xl

      overflow-hidden
      "
    >




      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
        flex
        items-center

        gap-3

        mb-5
        "
      >

        {/* ICON */}

        <div
          className="
          w-11
          h-11

          rounded-2xl

          bg-purple-500/10

          border
          border-purple-500/20

          flex
          items-center
          justify-center

          text-purple-400
          "
        >

          <Filter size={20} />

        </div>




        {/* TEXT */}

        <div>

          <h2
            className="
            text-lg
            sm:text-xl

            font-bold
            "
          >

            Trade Filters

          </h2>



          <p
            className="
            text-gray-400

            text-xs
            sm:text-sm

            mt-1
            "
          >

            Filter and search your trades

          </p>

        </div>

      </div>




      {/* =====================================================
          FILTER GRID
      ===================================================== */}

      <div
        className="
        grid

        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3

        gap-4
        "
      >




        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className="
          relative
          "
        >

          {/* ICON */}

          <Search
            size={18}
            className="
            absolute

            left-4
            top-1/2

            -translate-y-1/2

            text-gray-500
            "
          />




          {/* INPUT */}

          <input

            type="text"

            placeholder="Search Symbol..."

            value={searchTerm}

            onChange={(e) =>

              setSearchTerm(
                e.target.value
              )

            }

            className={`

            ${inputStyle}

            pl-11

            `}

          />

        </div>




        {/* =================================================
            STRATEGY
        ================================================= */}

        <select

          value={strategy}

          onChange={(e) =>

            setStrategy(
              e.target.value
            )

          }

          className={inputStyle}

        >

          <option value="">

            All Strategies

          </option>

          <option value="CRT">

            CRT

          </option>

          <option value="SMC">

            SMC

          </option>

          <option value="Scalping">

            Scalping

          </option>

          <option value="Swing">

            Swing

          </option>

          <option value="Breakout">

            Breakout

          </option>

        </select>




        {/* =================================================
            SESSION
        ================================================= */}

        <select

          value={session}

          onChange={(e) =>

            setSession(
              e.target.value
            )

          }

          className={inputStyle}

        >

          <option value="">

            All Sessions

          </option>

          <option value="London">

            London

          </option>

          <option value="New York">

            New York

          </option>

          <option value="Asia">

            Asia

          </option>

        </select>

      </div>

    </div>

  );

}