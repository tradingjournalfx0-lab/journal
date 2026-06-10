import { useState,useEffect } from "react";

import axios from "axios";

import {

  Pencil,
  Trash2,
  Plus,

} from "lucide-react";

export default function TradeTable() {




  // =========================
  // STATES
  // =========================

  const [trades,setTrades] =
  useState([]);

  const [showModal,setShowModal] =
  useState(false);

  const [editId,setEditId] =
  useState(null);

  const [loading,setLoading] =
  useState(false);

  const [formData,setFormData] =
  useState({

    symbol:"",
    session:"",
    side:"BUY",
    entry:"",
    exit:"",
    profit:"",
    lotsize:"",

  });




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




      // API

      const response =
      await axios.get(

        "/api/trades",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




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




  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };




  // =========================
  // OPEN ADD MODAL
  // =========================

  const handleAddTrade = ()=>{

    setEditId(null);




    setFormData({

      symbol:"",
      session:"",
      side:"BUY",
      entry:"",
      exit:"",
      profit:"",
      lotsize:"",

    });




    setShowModal(true);

  };




  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEdit = (trade)=>{

    setEditId(trade._id);




    setFormData({

      symbol:
      trade.symbol,

      session:
      trade.session,

      side:
      trade.side,

      entry:
      trade.entry,

      exit:
      trade.exit,

      profit:
      trade.profit,

      lotsize:
      trade.lotsize,

    });




    setShowModal(true);

  };




  // =========================
  // DELETE TRADE
  // =========================

  const handleDelete =
  async(id)=>{

    const confirmDelete =
    window.confirm(

      "Delete this trade?"

    );




    if(!confirmDelete){

      return;

    }




    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      await axios.delete(

        `/api/trades/${id}`,

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      const filtered =
      trades.filter(

        (trade)=>

        trade._id !== id

      );




      setTrades(filtered);




      alert(

        "Trade Deleted ✅"

      );

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );




      alert(

        error.response?.data?.message ||

        "Delete Failed"

      );

    }

  };




  // =========================
  // SAVE TRADE
  // =========================

  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    setLoading(true);




    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // =====================
      // UPDATE TRADE
      // =====================

      if(editId){

        const response =
        await axios.put(

          `/api/trades/${editId}`,

          {

            symbol:
            formData.symbol,

            session:
            formData.session,

            side:
            formData.side,

            entry:Number(
              formData.entry
            ),

            exit:Number(
              formData.exit
            ),

            profit:Number(
              formData.profit
            ),

            lotsize:
            formData.lotsize,

          },

          {

            headers:{

              Authorization:

              `Bearer ${token}`

            }

          }

        );




        const updatedTrades =
        trades.map((trade)=>

          trade._id === editId

          ? response.data

          : trade

        );




        setTrades(updatedTrades);

      }




      // =====================
      // ADD TRADE
      // =====================

      else{

        const response =
        await axios.post(

          "/api/trades",

          {

            symbol:
            formData.symbol,

            session:
            formData.session,

            side:
            formData.side,

            entry:Number(
              formData.entry
            ),

            exit:Number(
              formData.exit
            ),

            profit:Number(
              formData.profit
            ),

            lotsize:
            formData.lotsize,

          },

          {

            headers:{

              Authorization:

              `Bearer ${token}`

            }

          }

        );




        setTrades([

          response.data,
          ...trades,

        ]);

      }




      alert(

        "Trade Saved ✅"

      );




      setShowModal(false);

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );




      alert(

        error.response?.data?.message ||

        "Trade Save Failed"

      );

    }finally{

      setLoading(false);

    }

  };




  // =========================
  // UI
  // =========================

  return (

    <div className="mt-8">




      {/* TOP BUTTON */}

      <div className="flex justify-end mb-6">

        <button

          onClick={handleAddTrade}

          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-2xl transition-all">

          <Plus size={20} />

          Add Trade

        </button>

      </div>




      {/* TABLE */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 text-left">

              <th className="pb-4">

                Symbol

              </th>

              <th className="pb-4">

                Session

              </th>

              <th className="pb-4">

                Side

              </th>

              <th className="pb-4">

                Entry

              </th>

              <th className="pb-4">

                Exit

              </th>

              <th className="pb-4">

                Profit

              </th>

              <th className="pb-4">

                Lot Size

              </th>

              <th className="pb-4">

                Actions

              </th>

            </tr>

          </thead>




          <tbody>

            {trades.map((trade)=>(

              <tr

                key={trade._id}

                className="border-b border-white/5">




                {/* SYMBOL */}

                <td className="py-6">

                  {trade.symbol}

                </td>




                {/* SESSION */}

                <td className="py-6 text-blue-400">

                  {trade.session}

                </td>




                {/* SIDE */}

                <td className={`py-6 font-bold

                  ${trade.side === "BUY"

                    ? "text-green-400"

                    : "text-red-400"

                  }`}>

                  {trade.side}

                </td>




                {/* ENTRY */}

                <td className="py-6">

                  {trade.entry}

                </td>




                {/* EXIT */}

                <td className="py-6">

                  {trade.exit}

                </td>




                {/* PROFIT */}

                <td className={`py-6 font-bold

                  ${trade.profit > 0

                    ? "text-green-400"

                    : "text-red-400"

                  }`}>

                  {trade.profit}

                </td>




                {/* Lot Size */}

                <td className="py-6">

                  {trade.lotsize}

                </td>




                {/* ACTIONS */}

                <td className="py-6">

                  <div className="flex gap-3">




                    {/* EDIT */}

                    <button

                      onClick={()=>

                        handleEdit(trade)

                      }

                      className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-500 flex items-center justify-center transition-all">

                      <Pencil size={18} />

                    </button>




                    {/* DELETE */}

                    <button

                      onClick={()=>

                        handleDelete(trade._id)

                      }

                      className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500 flex items-center justify-center transition-all">

                      <Trash2 size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>




      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">

          <form

            onSubmit={handleSubmit}

            className="bg-[#0B1120] border border-white/10 rounded-3xl p-8 w-full max-w-lg">




            <h2 className="text-3xl font-bold mb-6">

              {editId

                ? "Edit Trade"

                : "Add Trade"

              }

            </h2>




            <div className="space-y-4">




              {/* SYMBOL */}

              <input
                type="text"
                name="symbol"
                placeholder="Symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/20 border border-white/10 outline-none"
              />




              {/* SESSION */}

              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/20 border border-white/10 outline-none">

                <option value="">

                  Select Session

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




              {/* SIDE */}

              <select
                name="side"
                value={formData.side}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black/20 border border-white/10 outline-none">

                <option value="BUY">

                  BUY

                </option>

                <option value="SELL">

                  SELL

                </option>

              </select>




              {/* ENTRY */}

              <input
                type="number"
                name="entry"
                placeholder="Entry Price"
                value={formData.entry}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/20 border border-white/10 outline-none"
              />




              {/* EXIT */}

              <input
                type="number"
                name="exit"
                placeholder="Exit Price"
                value={formData.exit}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/20 border border-white/10 outline-none"
              />




              {/* PROFIT */}

              <input
                type="number"
                name="profit"
                placeholder="Profit"
                value={formData.profit}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/20 border border-white/10 outline-none"
              />




              {/* STRATEGY */}

              <input
                type="text"
                name="lotsize"
                placeholder="Lot Size"
                value={formData.strategy}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/20 border border-white/10 outline-none"
              />

            </div>




            {/* BUTTONS */}

            <div className="flex gap-4 mt-8">

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 py-4 rounded-2xl transition-all">

                {loading

                  ? "Saving..."

                  : "Save Trade"

                }

              </button>




              <button
                type="button"
                onClick={()=>

                  setShowModal(false)

                }
                className="flex-1 bg-white/10 hover:bg-white/20 py-4 rounded-2xl transition-all">

                Cancel

              </button>

            </div>

          </form>

        </div>

      )}

    </div>

  );

}