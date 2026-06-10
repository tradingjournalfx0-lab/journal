import api from "./api";




// =========================
// GET SUBSCRIPTION
// =========================

export const getSubscription =
async()=>{

  try{

    const response =

    await api.get(

      "/subscription"

    );




    return response.data;

  }catch(error){

    console.log(

      "GET SUBSCRIPTION ERROR:",

      error.response?.data ||

      error.message

    );




    throw error;

  }

};




// =========================
// CREATE SUBSCRIPTION
// =========================

export const createSubscription =
async(subscriptionData)=>{

  try{

    const response =

    await api.post(

      "/subscription",

      subscriptionData

    );




    return response.data;

  }catch(error){

    console.log(

      "CREATE SUBSCRIPTION ERROR:",

      error.response?.data ||

      error.message

    );




    throw error;

  }

};




// =========================
// CANCEL SUBSCRIPTION
// =========================

export const cancelSubscription =
async(id)=>{

  try{

    const response =

    await api.delete(

      `/subscription/${id}`

    );




    return response.data;

  }catch(error){

    console.log(

      "CANCEL SUBSCRIPTION ERROR:",

      error.response?.data ||

      error.message

    );




    throw error;

  }

};




// =========================
// BILLING HISTORY
// =========================

export const getBillingHistory =
async()=>{

  try{

    const response =

    await api.get(

      "/subscription/history"

    );




    return response.data;

  }catch(error){

    console.log(

      "BILLING HISTORY ERROR:",

      error.response?.data ||

      error.message

    );




    throw error;

  }

};