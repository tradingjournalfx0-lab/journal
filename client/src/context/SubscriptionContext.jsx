import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getSubscription,
  createSubscription,
  cancelSubscription,
} from "../services/subscriptionService";

const SubscriptionContext =
createContext();

export const SubscriptionProvider =
({ children }) => {

  const [
    subscription,
    setSubscription,
  ] = useState(null);

  const [loading,setLoading] =
    useState(false);

  const [error,setError] =
    useState(null);

  const fetchSubscription =
  async()=>{

    try{

      setLoading(true);

      const data =
        await getSubscription();

      setSubscription(data);

    }catch(err){

      setError(
        err.message
      );

    }finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    fetchSubscription();

  },[]);

  const subscribe =
  async(subscriptionData)=>{

    try{

      const data =
        await createSubscription(
          subscriptionData
        );

      setSubscription(data);

    }catch(err){

      setError(
        err.message
      );

    }

  };

  const unsubscribe =
  async(id)=>{

    try{

      await cancelSubscription(id);

      setSubscription(null);

    }catch(err){

      setError(
        err.message
      );

    }

  };

  return (

    <SubscriptionContext.Provider
      value={{

        subscription,
        loading,
        error,
        fetchSubscription,
        subscribe,
        unsubscribe,

      }}>

      {children}

    </SubscriptionContext.Provider>

  );

};

export const useSubscription =
()=>{

  return useContext(
    SubscriptionContext
  );

};