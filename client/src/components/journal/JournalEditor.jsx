import { useState } from "react";

import axios from "axios";

export default function JournalEditor({

  refreshJournals,

}) {




  // =========================
  // STATES
  // =========================

  const [loading,setLoading] =
  useState(false);

  const [formData,setFormData] =
  useState({

    title:"",
    emotion:"",
    content:"",
    tags:"",

  });




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
  // SAVE JOURNAL
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

      await axios.post(

        "http://localhost:5000/api/journals",

        {

          title:
          formData.title,

          emotion:
          formData.emotion,

          content:
          formData.content,

          tags:
          formData.tags
          .split(",")

          .map((tag)=>

            tag.trim()

          )

          .filter(Boolean),

        },

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      alert(

        "Journal Saved ✅"

      );




      // RESET FORM

      setFormData({

        title:"",
        emotion:"",
        content:"",
        tags:"",

      });




      // REFRESH

      if(refreshJournals){

        refreshJournals();

      }

    }catch(error){

      console.log(error);




      alert(

        error.response?.data?.message ||

        "Journal Save Failed"

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

          Trading Journal Editor

        </h2>

        <p className="text-gray-400 mt-2">

          Write your trading experience and psychology.

        </p>

      </div>




      {/* FORM */}

      <div className="space-y-6">




        {/* TITLE */}

        <input
          type="text"
          name="title"
          placeholder="Journal Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
        />




        {/* EMOTION */}

        <select

          name="emotion"

          value={formData.emotion}

          onChange={handleChange}

          required

          className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 outline-none">

          <option value="">

            Select Mood

          </option>

          <option value="Confident">

            Confident

          </option>

          <option value="Fear">

            Fear

          </option>

          <option value="Greedy">

            Greedy

          </option>

          <option value="Disciplined">

            Disciplined

          </option>

        </select>




        {/* CONTENT */}

        <textarea
          name="content"
          placeholder="Write your trading journal..."
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full h-[250px] bg-black/20 border border-white/10 rounded-2xl p-5 outline-none resize-none"
        />




        {/* TAGS */}

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
        />

      </div>




      {/* BUTTON */}

      <div className="flex justify-end mt-8">

        <button

          type="submit"

          disabled={loading}

          className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300">

          {loading

            ? "Saving..."

            : "Save Journal"

          }

        </button>

      </div>

    </form>

  );

}