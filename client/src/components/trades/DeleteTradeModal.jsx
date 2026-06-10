export default function DeleteTradeModal() {

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="w-full max-w-md bg-[#0b1120] border border-white/10 rounded-3xl p-8 text-center">

        <h2 className="text-3xl font-bold">
          Delete Trade
        </h2>

        <p className="text-gray-400 mt-4">

          Are you sure you want to delete this trade?

        </p>

        <div className="flex justify-center gap-4 mt-8">

          <button className="px-6 py-3 rounded-xl bg-white/10">

            Cancel

          </button>

          <button className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700">

            Delete

          </button>

        </div>

      </div>

    </div>

  );
}