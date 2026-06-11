import { useState } from "react";

// import axios from "axios";
import api from "../../services/api";

export default function JournalCard({

  journal,
  refreshJournals,

}) {




  // =========================
  // STATES
  // =========================

  const [isEditing,setIsEditing] =
  useState(false);

  const [loading,setLoading] =
  useState(false);

  const [formData,setFormData] =
  useState({

    title:
    journal.title || "",

    emotion:
    journal.emotion || "",

    content:
    journal.content || "",

    tags:
    Array.isArray(journal.tags)

    ? journal.tags.join(", ")

    : "",

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
  // DELETE JOURNAL
  // =========================

  const handleDelete =
  async()=>{

    const confirmDelete =
    window.confirm(

      "Delete this journal?"

    );




    if(!confirmDelete){

      return;

    }




    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // DELETE API

      await api.delete(

        `/journals/${journal._id}`,

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      alert(

        "Journal Deleted ✅"

      );




      // REFRESH

      refreshJournals();

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );




      alert(

        error.response?.data?.message ||

        "Delete Failed"

      );

    }

  };




  // =========================
  // UPDATE JOURNAL
  // =========================

  const handleUpdate =
  async()=>{

    setLoading(true);




    try{

      // TOKEN

      const token =
      localStorage.getItem(

        "token"

      );




      // SAFE TAGS

      const formattedTags =

      typeof formData.tags === "string"

      ? formData.tags
        .split(",")
        .map((tag)=>

          tag.trim()

        )
        .filter(Boolean)

      : [];




      // UPDATE API

      const response =
      await api.put(

        `/journals/${journal._id}`,

        {

          title:
          formData.title,

          emotion:
          formData.emotion,

          content:
          formData.content,

          tags:
          formattedTags,

        },

        {

          headers:{

            Authorization:

            `Bearer ${token}`

          }

        }

      );




      console.log(

        response.data

      );




      alert(

        "Journal Updated ✅"

      );




      setIsEditing(false);




      // REFRESH

      refreshJournals();

    }catch(error){

      console.log(

        error.response?.data ||

        error.message

      );




      alert(

        error.response?.data?.message ||

        "Update Failed"

      );

    }finally{

      setLoading(false);

    }

  };




  // =========================
  // TAGS
  // =========================

  const tags =
  Array.isArray(journal.tags)

  ? journal.tags

  : [];




  return (

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">




      {/* TOP */}

      <div className="flex items-start justify-between gap-5">




        {/* LEFT */}

        <div className="flex-1">




          {/* TITLE */}

          {isEditing ? (

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 outline-none"
            />

          ) : (

            <h2 className="text-2xl font-bold">

              {journal.title}

            </h2>

          )}





          {/* DATE */}

          <p className="text-gray-400 text-sm mt-2">

            {new Date(

              journal.createdAt

            ).toLocaleDateString()}

          </p>

        </div>




        {/* EMOTION */}

        {isEditing ? (

          <select
            name="emotion"
            value={formData.emotion}
            onChange={handleChange}
            className="bg-black/20 border border-white/10 rounded-xl p-3 outline-none">

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

        ) : (

          <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl text-sm">

            {journal.emotion}

          </div>

        )}

      </div>




      {/* CONTENT */}

      <div className="mt-6">

        {isEditing ? (

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full h-40 bg-black/20 border border-white/10 rounded-2xl p-4 outline-none resize-none"
          />

        ) : (

          <p className="text-gray-300 leading-7 whitespace-pre-wrap">

            {journal.content}

          </p>

        )}

      </div>




      {/* TAGS */}

      <div className="mt-8">

        {isEditing ? (

          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags comma separated"
            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 outline-none"
          />

        ) : (

          <div className="flex items-center gap-3 flex-wrap">

            {tags.map((tag,index)=>(

              <span

                key={index}

                className="px-4 py-2 rounded-xl bg-black/20 text-gray-300 text-sm">

                #{tag}

              </span>

            ))}

          </div>

        )}

      </div>




      {/* BUTTONS */}

      <div className="flex gap-4 mt-8">

        {isEditing ? (

          <>

            {/* SAVE */}

            <button

              onClick={handleUpdate}

              disabled={loading}

              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-2xl font-semibold">

              {loading

                ? "Saving..."

                : "Save"

              }

            </button>




            {/* CANCEL */}

            <button

              onClick={()=>

                setIsEditing(false)

              }

              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl">

              Cancel

            </button>

          </>

        ) : (

          <>

            {/* EDIT */}

            <button

              onClick={()=>

                setIsEditing(true)

              }

              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl font-semibold">

              Edit

            </button>




            {/* DELETE */}

            <button

              onClick={handleDelete}

              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-semibold">

              Delete

            </button>

          </>

        )}

      </div>

    </div>

  );

}