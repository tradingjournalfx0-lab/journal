import {
  useEffect,
  useState,
} from "react";

import {
  getAnalytics,
} from "../services/analyticsService";

export default function useAnalytics() {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchAnalytics =
  async()=>{

    try{

      setLoading(true);

      const data =
        await getAnalytics();

      setAnalytics(data);

    }catch(err){

      setError(
        err.message
      );

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    fetchAnalytics();

  },[]);

  return {

    analytics,
    loading,
    error,
    fetchAnalytics,

  };

}