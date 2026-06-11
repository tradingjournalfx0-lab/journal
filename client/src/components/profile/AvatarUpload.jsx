import { useEffect,useState } from "react";

// import axios from "axios";

import api from "../../services/api";

export default function AvatarUpload() {




  // =========================
  // STATES
  // =========================

  const [avatar,setAvatar] =
  useState("/avatar.png");

  const [loading,setLoading] =
  useState(false);




  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile =
  async()=>{

    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      const response =
      await api.get(

        "/profile",

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      if(

        response.data?.avatar

      ){

        setAvatar(

          `/${response.data.avatar}`

        );

      }

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  useEffect(()=>{

    fetchProfile();

  },[]);




  // =========================
  // HANDLE FILE
  // =========================

  const handleFileChange =
  async(e)=>{

    const file =
    e.target.files[0];




    if(!file) return;




    const formData =
    new FormData();




    formData.append(

      "avatar",

      file

    );




    setLoading(true);




    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      const response =
      await api.post(

        "/profile/avatar",

        formData,

        {

          headers:{

            Authorization:

            `Bearer ${token}`,

            "Content-Type":

            "multipart/form-data",

          },

        }

      );




      setAvatar(

        `/${response.data.avatar}`

      );




      alert(

        "Avatar Uploaded ✅"

      );

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );




      alert(

        error.response?.data?.message ||

        "Upload Failed"

      );

    }finally{

      setLoading(false);

    }

  };




  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">




      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold">

          Upload Avatar

        </h2>

        <p className="text-gray-400 mt-2">

          Upload your profile picture.

        </p>

      </div>




      {/* UPLOAD BOX */}

      <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 text-center">




        {/* INPUT */}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />




        {/* LABEL */}

        <label

          htmlFor="avatar"

          className="cursor-pointer">




          {/* IMAGE */}

          <img
            src={avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-purple-500 mx-auto"
          />




          {/* TEXT */}

          <h3 className="text-2xl font-bold mt-6">

            Upload Profile Image

          </h3>

          <p className="text-gray-400 mt-2">

            PNG, JPG supported

          </p>




          {/* BUTTON */}

          <button

            type="button"

            className="mt-6 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-all">

            {loading

              ? "Uploading..."

              : "Choose File"

            }

          </button>

        </label>

      </div>

    </div>

  );

}