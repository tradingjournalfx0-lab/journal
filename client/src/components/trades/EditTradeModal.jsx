export default function EditTradeModal() {

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="w-full max-w-2xl bg-[#0b1120] border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-8">
          Edit Trade
        </h2>

        <div className="grid grid-cols-2 gap-5">

          <input
            type="text"
            defaultValue="XAUUSD"
            className="bg-white/5 border border-white/10 rounded-xl p-4 outline-none"
          />

          <select className="bg-white/5 border border-white/10 rounded-xl p-4">

            <option>
              BUY
            </option>

          </select>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button className="px-6 py-3 rounded-xl bg-white/10">

            Cancel

          </button>

          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700">

            Update Trade

          </button>

        </div>

      </div>

    </div>

  );
}