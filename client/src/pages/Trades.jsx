import { useState,useEffect } from "react";

// import axios from "axios";

import api from "../services/api";


import Sidebar from
"../components/layout/Sidebar";

import Navbar from
"../components/layout/Navbar";

import TradeFilters from
"../components/trades/TradeFilters";

import TradeTable from
"../components/trades/TradeTable";

import AddTradeModal from
"../components/trades/AddTradeModal";




// EXPORT FUNCTIONS
import exportCSV from "../utils/exportCSV";

import exportPDF from "../utils/exportPDF";

import exportExcel from "../utils/exportExcel";

// EXPORT FUNCTIONS

export default function Trades() {




  // =========================
  // STATES
  // =========================

  const [showModal,setShowModal] =
  useState(false);

  const [trades,setTrades] =
  useState([]);




  // =========================
  // FETCH TRADES
  // =========================

  const fetchTrades =
  async()=>{

    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      console.log(

        "TOKEN:",

        token

      );




      // API

      const response =
      await api.get(

        "/trades",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      // SAVE DATA

      setTrades(

        response.data

      );

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =========================
  // LOAD
  // =========================

  useEffect(()=>{

    fetchTrades();

  },[]);




  return (

    <div className="flex min-h-screen bg-[#050816] text-white">




      {/* SIDEBAR */}

      <Sidebar />




      {/* MAIN */}

      <div className="flex-1 ml-64 p-8">




        {/* NAVBAR */}

        <Navbar />




        {/* HEADER */}

        <div className="mt-8 flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-bold">

              Trades

            </h1>

            <p className="text-gray-400 mt-3">

              Manage and review all your trades.

            </p>

          </div>


          {/* Export Buttons */}


          {/* BUTTONS */}

          <div className="flex gap-4">




            {/* EXPORT CSV */}

            <button

              onClick={()=>

                exportCSV(trades)

              }

              className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-2xl font-semibold transition-all"

            >

              Export CSV

            </button>





            {/* EXPORT PDF */}

            <button

              onClick={()=>

                exportPDF(trades)

              }

              className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-2xl font-semibold transition-all"

            >

              Export PDF

            </button>





            {/* EXPORT EXCEL */}

            <button

              onClick={()=>

                exportExcel(trades)

              }

              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-2xl font-semibold transition-all"

            >

              Export Excel

            </button>





            {/* ADD TRADE */}

            <button

              onClick={()=>

                setShowModal(true)

              }

              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl font-semibold transition-all"

            >

              Add Trade

            </button>

          </div>

          {/* Export Buttons */}

        </div>




        {/* FILTERS */}

        <TradeFilters />




        {/* TABLE */}

        <TradeTable

          trades={trades}

          refreshTrades={fetchTrades}

        />




        {/* MODAL */}

        {showModal && (

          <AddTradeModal

            closeModal={()=>

              setShowModal(false)

            }

            refreshTrades={fetchTrades}

          />

        )}

      </div>

    </div>

  );

}