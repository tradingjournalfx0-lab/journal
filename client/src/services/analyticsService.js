import api from "./api";

export const getAnalytics =
async()=>{

  const response =
    await api.get(
      "/analytics"
    );

  return response.data;

};

export const getMonthlyAnalytics =
async()=>{

  const response =
    await api.get(
      "/analytics/monthly"
    );

  return response.data;

};

export const getSessionAnalytics =
async()=>{

  const response =
    await api.get(
      "/analytics/sessions"
    );

  return response.data;

};

export const getWinRateAnalytics =
async()=>{

  const response =
    await api.get(
      "/analytics/winrate"
    );

  return response.data;

};

export const getDrawdownAnalytics =
async()=>{

  const response =
    await api.get(
      "/analytics/drawdown"
    );

  return response.data;

};