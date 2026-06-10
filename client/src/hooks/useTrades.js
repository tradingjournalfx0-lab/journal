import {
  useEffect,
  useState,
} from "react";

import {
  getTrades,
  createTrade,
  updateTrade,
  deleteTrade,
} from "../services/tradeService";

export default function useTrades() {

  const [trades, setTrades] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchTrades = async()=>{

    try{

      setLoading(true);

      const data =
        await getTrades();

      setTrades(data);

    }catch(err){

      setError(
        err.message
      );

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    fetchTrades();

  },[]);

  const addTrade =
  async(tradeData)=>{

    try{

      const newTrade =
        await createTrade(
          tradeData
        );

      setTrades([
        newTrade,
        ...trades,
      ]);

    }catch(err){

      setError(
        err.message
      );

    }

  };

  const editTrade =
  async(id,tradeData)=>{

    try{

      const updated =
        await updateTrade(
          id,
          tradeData
        );

      setTrades(

        trades.map((trade)=>

          trade._id === id
            ? updated
            : trade

        )

      );

    }catch(err){

      setError(
        err.message
      );

    }

  };

  const removeTrade =
  async(id)=>{

    try{

      await deleteTrade(id);

      setTrades(

        trades.filter(
          (trade)=>
            trade._id !== id
        )

      );

    }catch(err){

      setError(
        err.message
      );

    }

  };

  return {

    trades,
    loading,
    error,
    fetchTrades,
    addTrade,
    editTrade,
    removeTrade,

  };

}