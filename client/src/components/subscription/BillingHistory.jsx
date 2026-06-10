
import { useEffect,useState }
from "react";

import axios from "axios";

export default function BillingHistory(){

  const [history,setHistory] =
  useState([]);




  const fetchHistory =
  async()=>{

    try{

      const token =
      localStorage.getItem(

        "token"

      );




      const response =
      await axios.get(

        "/api/subscription/history",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      setHistory(

        response.data

      );

    }catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    fetchHistory();

  },[]);




  return(

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-8">

      <h2 className="text-3xl font-bold mb-6">

        Billing History

      </h2>




      <div className="space-y-4">

        {history.length > 0 ? (

          history.map((item,index)=>(

            <div

              key={index}

              className="bg-black/20 rounded-2xl p-5 flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold">

                  {item.plan}

                </h3>

                <p className="text-gray-400 text-sm mt-1">

                  {

                    new Date(

                      item.createdAt

                    ).toLocaleDateString()

                  }

                </p>

              </div>




              <div className="text-right">

                <h3 className="text-green-400 font-bold">

                  ₹{item.amount}

                </h3>

                <p className="text-purple-400 text-sm">

                  {item.status}

                </p>

              </div>

            </div>

          ))

        ) : (

          <div className="text-center text-gray-400 py-10">

            No Billing History

          </div>

        )}

      </div>

    </div>

  );

}

