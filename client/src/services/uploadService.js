import api from "./api";

export const uploadImage =
async(file)=>{

  const formData =
    new FormData();

  formData.append(
    "image",
    file
  );

  const response =
    await api.post(

      "/upload",

      formData,

      {

        headers:{

          "Content-Type":
            "multipart/form-data",

        },

      }

    );

  return response.data;

};

export const uploadTradeScreenshot =
async(file)=>{

  const formData =
    new FormData();

  formData.append(
    "screenshot",
    file
  );

  const response =
    await api.post(

      "/upload/trade",

      formData,

      {

        headers:{

          "Content-Type":
            "multipart/form-data",

        },

      }

    );

  return response.data;

};