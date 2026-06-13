import {
  useState,
  useEffect,
} from "react";

import api from "../../services/api";

import {
  Pencil,
  Trash2,
  Plus,
  X,
} from "lucide-react";



export default function TradeTable() {

  // =====================================================
  // STATES
  // =====================================================

  const [trades, setTrades] =
  useState([]);

  const [showModal, setShowModal] =
  useState(false);

  const [editId, setEditId] =
  useState(null);

  const [loading, setLoading] =
  useState(false);

  const [formData, setFormData] =
  useState({

    symbol: "",
    session: "",
    side: "BUY",
    entry: "",
    exit: "",
    profit: "",
    lotsize: "",

  });




  // =====================================================
  // FETCH TRADES
  // =====================================================

  const fetchTrades =
  async () => {

    try {

      const token =
      localStorage.getItem(
        "token"
      );



      const response =
      await api.get(

        "/trades",

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      const tradesData =

      Array.isArray(response.data)

      ? response.data

      : Array.isArray(response.data.data)

      ? response.data.data

      : [];



      setTrades(
        tradesData
      );

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {

    fetchTrades();

  }, []);




  // =====================================================
  // BODY LOCK
  // =====================================================

  useEffect(() => {

    if (showModal) {

      document.body.style.overflow =
      "hidden";

    }

    else {

      document.body.style.overflow =
      "auto";

    }



    return () => {

      document.body.style.overflow =
      "auto";

    };

  }, [showModal]);




  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange =
  (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };




  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {

    setFormData({

      symbol: "",
      session: "",
      side: "BUY",
      entry: "",
      exit: "",
      profit: "",
      lotsize: "",

    });

  };




  // =====================================================
  // ADD TRADE
  // =====================================================

  const handleAddTrade =
  () => {

    setEditId(null);

    resetForm();

    setShowModal(true);

  };




  // =====================================================
  // EDIT TRADE
  // =====================================================

  const handleEdit =
  (trade) => {

    setEditId(
      trade._id
    );



    setFormData({

      symbol:
      trade.symbol || "",

      session:
      trade.session || "",

      side:
      trade.side || "BUY",

      entry:
      trade.entry || "",

      exit:
      trade.exit || "",

      profit:
      trade.profit || "",

      lotsize:
      trade.lotsize || "",

    });



    setShowModal(true);

  };




  // =====================================================
  // DELETE TRADE
  // =====================================================

  const handleDelete =
  async (id) => {

    const confirmDelete =
    window.confirm(
      "Delete Trade?"
    );



    if (!confirmDelete) {

      return;

    }




    try {

      const token =
      localStorage.getItem(
        "token"
      );



      await api.delete(

        `/trades/${id}`,

        {

          headers: {

            Authorization:
            `Bearer ${token}`

          }

        }

      );



      setTrades(

        trades.filter(

          (trade) =>

          trade._id !== id

        )

      );

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

  };




  // =====================================================
  // SAVE TRADE
  // =====================================================

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    setLoading(true);




    try {

      const token =
      localStorage.getItem(
        "token"
      );



      const payload = {

        symbol:
        formData.symbol,

        session:
        formData.session,

        side:
        formData.side,

        entry:
        Number(formData.entry),

        exit:
        Number(formData.exit),

        profit:
        Number(formData.profit),

        lotsize:
        Number(formData.lotsize),

      };




      // UPDATE

      if (editId) {

        await api.put(

          `/trades/${editId}`,

          payload,

          {

            headers: {

              Authorization:
              `Bearer ${token}`

            }

          }

        );

      }




      // CREATE

      else {

        await api.post(

          "/trades",

          payload,

          {

            headers: {

              Authorization:
              `Bearer ${token}`

            }

          }

        );

      }




      await fetchTrades();

      setShowModal(false);

      resetForm();

    }

    catch (error) {

      console.log(

        error.response?.data ||

        error.message

      );

    }

    finally {

      setLoading(false);

    }

  };




  // =====================================================
  // INPUT STYLE
  // =====================================================

  const inputStyle = `

  w-full

  p-4

  rounded-2xl

  bg-black/20

  border
  border-white/10

  outline-none

  text-white

  placeholder:text-gray-500

  focus:border-purple-500

  transition-all
  duration-300

  `;




  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="
      mt-6

      w-full

      max-w-full
      "
    >




      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div
        className="
        flex
        justify-end

        mb-5
        "
      >

        <button

          onClick={handleAddTrade}

          className="
          flex
          items-center
          gap-2

          bg-gradient-to-r
          from-purple-600
          to-fuchsia-600

          px-5
          py-3

          rounded-2xl

          font-semibold

          text-sm
          sm:text-base

          hover:scale-[1.02]

          transition-all
          duration-300

          shadow-xl
          shadow-purple-500/20
          "

        >

          <Plus size={18} />

          Add Trade

        </button>

      </div>




      {/* =====================================================
          TABLE WRAPPER
      ===================================================== */}

      <div
        className="
        w-full

        overflow-x-auto
        overflow-y-hidden

        rounded-3xl

        border
        border-white/10

        bg-white/5

        backdrop-blur-xl

        touch-pan-x

        overscroll-x-contain

        pb-2

        [scrollbar-width:none]
        [-ms-overflow-style:none]

        [&::-webkit-scrollbar]:hidden
        "
      >

        <table
          className="
          min-w-[900px]

          w-full

          text-left

          border-collapse
          "
        >




          {/* =====================================================
              TABLE HEAD
          ===================================================== */}

          <thead>

            <tr
              className="
              border-b
              border-white/10
              "
            >

              {

                [

                  "SYMBOL",
                  "SESSION",
                  "SIDE",
                  "ENTRY",
                  "EXIT",
                  "PROFIT",
                  "LOT",
                  "ACTION",

                ].map((item) => (

                  <th

                    key={item}

                    className="
                    px-4
                    sm:px-6

                    py-5

                    text-gray-400

                    font-semibold

                    text-xs
                    sm:text-sm

                    whitespace-nowrap
                    "

                  >

                    {item}

                  </th>

                ))

              }

            </tr>

          </thead>





          {/* =====================================================
              TABLE BODY
          ===================================================== */}

          <tbody>

            {

              trades.length > 0 ? (

                trades.map((trade) => (

                  <tr

                    key={trade._id}

                    className="
                    border-b
                    border-white/5

                    hover:bg-white/[0.03]

                    transition-all
                    duration-300
                    "

                  >

                    {/* SYMBOL */}

                    <td
                      className="
                      px-4
                      sm:px-6

                      py-5

                      font-semibold

                      text-sm
                      sm:text-base

                      truncate
                      "
                    >

                      {trade.symbol}

                    </td>




                    {/* SESSION */}

                    <td
                      className="
                      px-4
                      sm:px-6

                      py-5

                      text-blue-400

                      text-sm
                      sm:text-base

                      truncate
                      "
                    >

                      {trade.session}

                    </td>




                    {/* SIDE */}

                    <td

                      className={`

                      px-4
                      sm:px-6

                      py-5

                      font-bold

                      text-sm
                      sm:text-base

                      truncate

                      ${

                        trade.side === "BUY"

                        ? "text-green-400"

                        : "text-red-400"

                      }

                      `}

                    >

                      {trade.side}

                    </td>




                    {/* ENTRY */}

                    <td
                      className="
                      px-4
                      sm:px-6

                      py-5

                      text-sm
                      sm:text-base

                      truncate
                      "
                    >

                      {trade.entry}

                    </td>




                    {/* EXIT */}

                    <td
                      className="
                      px-4
                      sm:px-6

                      py-5

                      text-sm
                      sm:text-base

                      truncate
                      "
                    >

                      {trade.exit}

                    </td>




                    {/* PROFIT */}

                    <td

                      className={`

                      px-4
                      sm:px-6

                      py-5

                      font-bold

                      text-sm
                      sm:text-base

                      truncate

                      ${

                        Number(trade.profit) > 0

                        ? "text-green-400"

                        : "text-red-400"

                      }

                      `}

                    >

                      $

                      {

                        Number(
                          trade.profit || 0
                        ).toFixed(2)

                      }

                    </td>




                    {/* LOT */}

                    <td
                      className="
                      px-4
                      sm:px-6

                      py-5

                      text-sm
                      sm:text-base

                      truncate
                      "
                    >

                      {trade.lotsize}

                    </td>




                    {/* ACTION */}

                    <td
                      className="
                      px-4
                      sm:px-6

                      py-5
                      "
                    >

                      <div
                        className="
                        flex
                        items-center
                        gap-2
                        "
                      >

                        {/* EDIT */}

                        <button

                          onClick={() =>

                            handleEdit(trade)

                          }

                          className="
                          w-9
                          h-9

                          rounded-xl

                          bg-blue-500/20
                          hover:bg-blue-500

                          flex
                          items-center
                          justify-center

                          transition-all
                          duration-300
                          "

                        >

                          <Pencil size={16} />

                        </button>




                        {/* DELETE */}

                        <button

                          onClick={() =>

                            handleDelete(
                              trade._id
                            )

                          }

                          className="
                          w-9
                          h-9

                          rounded-xl

                          bg-red-500/20
                          hover:bg-red-500

                          flex
                          items-center
                          justify-center

                          transition-all
                          duration-300
                          "

                        >

                          <Trash2 size={16} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )

              : (

                <tr>

                  <td
                    colSpan={8}
                    className="
                    py-20
                    text-center
                    "
                  >

                    <div
                      className="
                      flex
                      flex-col
                      items-center
                      gap-4
                      "
                    >

                      <div className="text-5xl">

                        📈

                      </div>

                      <h2
                        className="
                        text-2xl
                        font-bold
                        "
                      >

                        No Trades Found

                      </h2>

                      <p
                        className="
                        text-gray-400

                        max-w-md

                        leading-7
                        "
                      >

                        Start adding trades
                        to unlock analytics.

                      </p>

                    </div>

                  </td>

                </tr>

              )

            }

          </tbody>

        </table>

      </div>




      {/* =====================================================
          MODAL
      ===================================================== */}

      {

        showModal && (

          <div
            className="
            fixed
            inset-0
            z-[999]

            bg-black/70
            backdrop-blur-sm

            flex
            items-center
            justify-center

            p-4

            overflow-y-auto
            "
          >

            <form

              onSubmit={handleSubmit}

              className="
              w-full
              max-w-2xl

              bg-[#0B1120]

              border
              border-white/10

              rounded-[30px]

              p-5
              sm:p-8

              shadow-2xl

              space-y-5
              "
            >

              {/* HEADER */}

              <div
                className="
                flex
                items-center
                justify-between
                "
              >

                <h2
                  className="
                  text-2xl
                  font-bold
                  "
                >

                  {

                    editId

                    ? "Edit Trade"

                    : "Add Trade"

                  }

                </h2>




                <button

                  type="button"

                  onClick={() =>

                    setShowModal(false)

                  }

                  className="
                  w-10
                  h-10

                  rounded-xl

                  bg-white/5

                  flex
                  items-center
                  justify-center
                  "

                >

                  <X size={18} />

                </button>

              </div>




              {/* FORM */}

              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2

                gap-4
                "
              >

                <input
                  type="text"
                  name="symbol"
                  placeholder="Symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />

                <select
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                >

                  <option value="">
                    Session
                  </option>

                  <option value="London">
                    London
                  </option>

                  <option value="New York">
                    New York
                  </option>

                  <option value="Asia">
                    Asia
                  </option>

                </select>

                <select
                  name="side"
                  value={formData.side}
                  onChange={handleChange}
                  className={inputStyle}
                >

                  <option value="BUY">
                    BUY
                  </option>

                  <option value="SELL">
                    SELL
                  </option>

                </select>

                <input
                  type="number"
                  step="0.01"
                  name="lotsize"
                  placeholder="Lot Size"
                  value={formData.lotsize}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />

                <input
                  type="number"
                  step="0.01"
                  name="entry"
                  placeholder="Entry"
                  value={formData.entry}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />

                <input
                  type="number"
                  step="0.01"
                  name="exit"
                  placeholder="Exit"
                  value={formData.exit}
                  onChange={handleChange}
                  required
                  className={inputStyle}
                />

                <input
                  type="number"
                  step="0.01"
                  name="profit"
                  placeholder="Profit"
                  value={formData.profit}
                  onChange={handleChange}
                  required
                  className="
                  sm:col-span-2
                  w-full

                  p-4

                  rounded-2xl

                  bg-black/20

                  border
                  border-white/10

                  outline-none

                  text-white

                  placeholder:text-gray-500

                  focus:border-purple-500

                  transition-all
                  duration-300
                  "
                />

              </div>




              {/* BUTTONS */}

              <div
                className="
                flex
                flex-col-reverse
                sm:flex-row

                gap-4

                pt-2
                "
              >

                <button

                  type="button"

                  onClick={() =>

                    setShowModal(false)

                  }

                  className="
                  flex-1

                  py-4

                  rounded-2xl

                  bg-white/5
                  hover:bg-white/10

                  border
                  border-white/10

                  font-semibold
                  "

                >

                  Cancel

                </button>




                <button

                  type="submit"

                  disabled={loading}

                  className="
                  flex-1

                  py-4

                  rounded-2xl

                  bg-gradient-to-r
                  from-purple-600
                  to-fuchsia-600

                  font-bold

                  hover:scale-[1.02]

                  transition-all
                  duration-300

                  shadow-xl
                  shadow-purple-500/20
                  "

                >

                  {

                    loading

                    ? "Saving..."

                    : editId

                    ? "Update Trade"

                    : "Save Trade"

                  }

                </button>

              </div>

            </form>

          </div>

        )

      }

    </div>

  );

}