import { useEffect,useState } from "react";

// import axios from "axios";
import api from "../../services/api";

export default function BrokerInfo() {




  // =========================
  // STATES
  // =========================

  const [profile,setProfile] =
  useState(null);

  const [brokers,setBrokers] =
  useState([]);




  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile =
  async()=>{

    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      const response =
      await api.get(

        "/profile",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      setProfile(

        response.data

      );




      // AUTO CREATE BROKER CARD

      if(response.data){

        setBrokers([

          {

            name:

            response.data.broker ||

            "No Broker",




            type:

            response.data.accountType ||

            "Unknown",




            leverage:

            response.data.leverage ||

            "1:100",




            status:"Active",

          },

        ]);

      }

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

    fetchProfile();

  },[]);




  // =========================
  // LOADING
  // =========================

  if(!profile){

    return (

      <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-gray-400">

        Loading Broker Info...

      </div>

    );

  }




  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">




      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold">

          Broker Information

        </h2>

        <p className="text-gray-400 mt-2">

          Connected trading accounts.

        </p>

      </div>




      {/* LIST */}

      <div className="space-y-5">




        {brokers.length > 0 ? (

          brokers.map((broker,index)=>(

            <div

              key={index}

              className="bg-black/20 border border-white/5 rounded-2xl p-5 flex items-center justify-between">




              {/* LEFT */}

              <div>

                <h3 className="text-2xl font-bold">

                  {broker.name}

                </h3>




                <p className="text-gray-400 mt-1">

                  {broker.type}

                </p>

              </div>




              {/* RIGHT */}

              <div className="text-right">

                <h4 className="text-purple-400 font-semibold">

                  {broker.leverage}

                </h4>




                <p className="text-green-400 text-sm mt-1">

                  {broker.status}

                </p>

              </div>

            </div>

          ))

        ) : (

          <div className="bg-black/20 rounded-2xl p-8 text-center text-gray-400">

            No Broker Connected

          </div>

        )}

      </div>

    </div>

  );

}