
import { useEffect,useState } from "react";

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

      console.log(
        "FETCHING PROFILE..."
      );





      const response =
      await api.get(
        "/profile"
      );





      console.log(

        "PROFILE RESPONSE:",

        response.data

      );





      // =========================
      // SET AVATAR
      // =========================

      if(

        response.data?.avatar

      ){

        setAvatar(

          `${response.data.avatar}?t=${Date.now()}`

        );

      }

    }catch(error){

      console.log(

        "PROFILE ERROR:",

        error.response?.data ||

        error.message

      );

    }

  };





  // =========================
  // LOAD
  // =========================

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





    console.log(
      "FILE:",
      file
    );





    if(!file){

      console.log(
        "NO FILE SELECTED"
      );

      return;

    }





    const formData =
    new FormData();





    formData.append(

      "avatar",

      file

    );





    setLoading(true);





    try{

      console.log(
        "UPLOAD STARTED..."
      );





      const response =
      await api.post(

        "/profile/avatar",

        formData,

        {

          headers:{

            "Content-Type":

            "multipart/form-data",

          },

        }

      );






      console.log(

        "UPLOAD RESPONSE:",

        response.data

      );






      // =========================
      // UPDATE IMAGE
      // =========================

      setAvatar(

        `${response.data.avatar}?t=${Date.now()}`

      );






      alert(

        "Avatar Uploaded ✅"

      );

    }catch(error){

      console.log(

        "UPLOAD ERROR:",

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

          className="cursor-pointer"

        >




          {/* IMAGE */}

          <img

            src={avatar}

            alt="avatar"

            onError={(e)=>{

              console.log(
                "IMAGE LOAD FAILED"
              );

              e.target.src =
              "/avatar.png";

            }}

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

            className="mt-6 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-all"

          >

            {

              loading

              ?

              "Uploading..."

              :

              "Choose File"

            }

          </button>

        </label>

      </div>

    </div>

  );

}

