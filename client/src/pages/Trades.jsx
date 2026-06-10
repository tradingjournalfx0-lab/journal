import { useState,useEffect } from "react";

// import axios from "axios";

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




          {/* ADD BUTTON */}

          <button

            onClick={()=>

              setShowModal(true)

            }

            className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-2xl font-semibold transition-all">

            Add Trade

          </button>

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