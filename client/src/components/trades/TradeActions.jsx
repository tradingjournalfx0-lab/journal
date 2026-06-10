import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function TradeActions({

  trade,
  onEdit,
  onDelete,

}) {

  return (

    <div className="flex items-center gap-3">

      <button

        onClick={()=>onEdit(trade)}

        className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-500 flex items-center justify-center transition-all">

        <Pencil size={18} />

      </button>

      <button

        onClick={()=>onDelete(trade._id)}

        className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500 flex items-center justify-center transition-all">

        <Trash2 size={18} />

      </button>

    </div>

  );

}