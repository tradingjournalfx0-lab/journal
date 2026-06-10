export default function TradeFilters() {

  return (

    <div className="flex flex-wrap gap-4 mb-6">

      <input
        type="text"
        placeholder="Search Symbol..."
        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
      />

      <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">

        <option>
          All Strategies
        </option>

        <option>
          CRT
        </option>

        <option>
          SMC
        </option>

      </select>

      <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">

        <option>
          All Sessions
        </option>

        <option>
          London
        </option>

        <option>
          New York
        </option>

        <option>
          Asia
        </option>

      </select>

    </div>

  );
}
