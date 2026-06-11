import axios from "axios";




// =========================
// API URL
// =========================

const BASE_URL =

  import.meta.env.VITE_API_URL;




// =========================
// AXIOS INSTANCE
// =========================

const api = axios.create({

  baseURL:
  `${BASE_URL}`,

  headers: {

    "Content-Type":
    "application/json",

  },

});




// =========================
// REQUEST INTERCEPTOR
// =========================

api.interceptors.request.use(

  (config) => {

    const token =

      localStorage.getItem(

        "token"

      );




    if (token) {

      config.headers.Authorization =

        `Bearer ${token}`;

    }




    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);




// =========================
// RESPONSE INTERCEPTOR
// =========================

api.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    console.log(

      "API ERROR:",

      error.response?.data ||

      error.message

    );




    return Promise.reject(error);

  }

);




// =========================
// EXPORT
// =========================

export default api;