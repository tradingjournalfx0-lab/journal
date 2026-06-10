import api from "./api";

export const getTrades =
async()=>{

  const response =
    await api.get("/trades");

  return response.data;

};

export const getTradeById =
async(id)=>{

  const response =
    await api.get(
      `/trades/${id}`
    );

  return response.data;

};

export const createTrade =
async(tradeData)=>{

  const response =
    await api.post(
      "/trades",
      tradeData
    );

  return response.data;

};

export const updateTrade =
async(id,tradeData)=>{

  const response =
    await api.put(
      `/trades/${id}`,
      tradeData
    );

  return response.data;

};

export const deleteTrade =
async(id)=>{

  const response =
    await api.delete(
      `/trades/${id}`
    );

  return response.data;

};