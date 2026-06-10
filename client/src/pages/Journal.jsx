import { useEffect,useState } from "react";

import axios from "axios";

import Sidebar from "../components/layout/Sidebar";

import Navbar from "../components/layout/Navbar";

import JournalEditor from "../components/journal/JournalEditor";

import JournalList from "../components/journal/JournalList";

export default function Journal() {




  // =========================
  // STATES
  // =========================

  const [journals,setJournals] =
  useState([]);

  const [loading,setLoading] =
  useState(true);




  // =========================
  // FETCH JOURNALS
  // =========================

  const fetchJournals =
  async()=>{

    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      const response =
      await axios.get(

        "/api/journals",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      // SAVE DATA

      setJournals(

        response.data

      );

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };




  // =========================
  // LOAD
  // =========================

  useEffect(()=>{

    fetchJournals();

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

        <div className="mt-8">

          <h1 className="text-4xl font-bold">

            Trading Journal

          </h1>

          <p className="text-gray-400 mt-2">

            Track your emotions and lessons.

          </p>

        </div>




        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">




          {/* EDITOR */}

          <JournalEditor

            refreshJournals={

              fetchJournals

            }

          />




          {/* JOURNAL LIST */}

          {loading ? (

            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-gray-400">

              Loading Journals...

            </div>

          ) : (

            <JournalList

              journals={journals}

              refreshJournals={

                fetchJournals

              }

            />

          )}

        </div>

      </div>

    </div>

  );

}