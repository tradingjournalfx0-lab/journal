
import {

  useEffect,
  useState,

} from "react";

import {

  Navigate,

} from "react-router-dom";

import axios from "axios";




export default function SubscriptionRoute({

  children,

}){

  const [loading,setLoading] =
  useState(true);

  const [allowed,setAllowed] =
  useState(false);




  useEffect(()=>{

    checkSubscription();

  },[]);




  const checkSubscription =
  async()=>{

    try{

      const token =
      localStorage.getItem(

        "token"

      );




      const response =
      await axios.get(

        "/subscription",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      if(

        response.data.status ===

        "Active"

      ){

        setAllowed(true);

      }

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };




  if(loading){

    return(

      <div className="h-screen flex items-center justify-center bg-[#050816] text-white">

        Checking Subscription...

      </div>

    );

  }




  if(!allowed){

    return <Navigate to="/subscription" />;

  }




  return children;

}

