import { useState } from "react";

import axios from "axios";

export default function AddJournalModal({

  closeModal,
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
          .split(","),

        }

      );

      alert(

        "Journal Saved ✅"

      );

      refreshJournals();

      closeModal();

    }catch(error){

      console.log(error);

      alert(

        "Journal Save Failed"

      );

    }finally{

      setLoading(false);

    }

  };




  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">

      <form

        onSubmit={handleSubmit}

        className="w-full max-w-3xl bg-[#0b1120] border border-white/10 rounded-3xl p-8">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold">

              Add Trading Journal

            </h2>

            <p className="text-gray-400 mt-2">

              Record your trade psychology and lessons.

            </p>

          </div>



          {/* CLOSE */}

          <button

            type="button"

            onClick={closeModal}

            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 transition-all">

            ✕

          </button>

        </div>



        {/* FORM */}

        <div className="space-y-5">

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

              Select Emotion

            </option>

            <option value="Confident">

              Confident

            </option>

            <option value="Fear">

              Fear

            </option>

            <option value="Greed">

              Greed

            </option>

            <option value="Discipline">

              Discipline

            </option>

          </select>



          {/* CONTENT */}

          <textarea
            name="content"
            placeholder="Write your journal..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full h-[220px] bg-black/20 border border-white/10 rounded-2xl p-5 outline-none resize-none"
          />



          {/* TAGS */}

          <input
            type="text"
            name="tags"
            placeholder="Tags (example: CRT, London, Discipline)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 outline-none"
          />

        </div>



        {/* BUTTONS */}

        <div className="flex justify-end gap-4 mt-8">

          <button

            type="button"

            onClick={closeModal}

            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">

            Cancel

          </button>



          <button

            type="submit"

            disabled={loading}

            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-all">

            {loading

              ? "Saving..."

              : "Save Journal"

            }

          </button>

        </div>

      </form>

    </div>

  );

}