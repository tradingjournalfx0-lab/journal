import { DollarSign } from "lucide-react";

export default function ProfitCard() {

  return (

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-purple-500/10 shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 text-sm">
            Total Profit
          </p>

          <h2 className="text-4xl font-bold mt-3">
            $7,058
          </h2>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">

          <DollarSign size={28} />

        </div>

      </div>

      <div className="mt-5 text-green-400 text-sm">

        +12.5% from last month

      </div>

    </div>

  );
}