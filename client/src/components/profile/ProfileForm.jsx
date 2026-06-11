import { useEffect,useState } from "react";

// import axios from "axios";
import api from "../../services/api";

export default function ProfileForm() {




  // =========================
  // STATES
  // =========================

  const [loading,setLoading] =
  useState(false);

  const [formData,setFormData] =
  useState({

    fullName:"",
    email:"",
    country:"",
    experience:"",
    broker:"",
    accountType:"",
    bio:"",

  });




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




      if(response.data){

        setFormData({

          fullName:
          response.data.fullName || "",

          email:
          response.data.email || "",

          country:
          response.data.country || "",

          experience:
          response.data.experience || "",

          broker:
          response.data.broker || "",

          accountType:
          response.data.accountType || "",

          bio:
          response.data.bio || "",

        });

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
  // HANDLE INPUT
  // =========================

  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };




  // =========================
  // SAVE PROFILE
  // =========================

  const handleSubmit =
  async(e)=>{

    e.preventDefault();

    setLoading(true);




    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // API

      await api.post(

        "/profile",

        formData,

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      alert(

        "Profile Updated ✅"

      );

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );




      alert(

        error.response?.data?.message ||

        "Profile Save Failed"

      );

    }finally{

      setLoading(false);

    }

  };




  return (

    <form

      onSubmit={handleSubmit}

      className="bg-white/5 border border-white/10 rounded-3xl p-8">




      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold">

          Edit Profile

        </h2>

        <p className="text-gray-400 mt-2">

          Update your trader profile information.

        </p>

      </div>




      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">




        {/* FULL NAME */}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
        />




        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
        />




        {/* COUNTRY */}

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
        />




        {/* EXPERIENCE */}

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
        />




        {/* BROKER */}

        <input
          type="text"
          name="broker"
          placeholder="Broker Name"
          value={formData.broker}
          onChange={handleChange}
          className="bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
        />




        {/* ACCOUNT TYPE */}

        <select

          name="accountType"

          value={formData.accountType}

          onChange={handleChange}

          className="bg-black/20 border border-white/10 rounded-2xl p-4 outline-none">

          <option value="">

            Select Account Type

          </option>

          <option value="Funded">

            Funded

          </option>

          <option value="Personal">

            Personal

          </option>

          <option value="Demo">

            Demo

          </option>

        </select>

      </div>




      {/* BIO */}

      <textarea
        name="bio"
        placeholder="Write your bio..."
        value={formData.bio}
        onChange={handleChange}
        className="w-full mt-5 h-[180px] bg-black/20 border border-white/10 rounded-2xl p-5 outline-none resize-none"
      />




      {/* BUTTON */}

      <div className="flex justify-end mt-8">

        <button

          type="submit"

          disabled={loading}

          className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-semibold transition-all">

          {loading

            ? "Saving..."

            : "Save Changes"

          }

        </button>

      </div>

    </form>

  );

}