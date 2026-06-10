export default function Modal({
  open,
  onClose,
  children,
}) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">

      <div className="w-full max-w-2xl bg-[#0b1120] border border-white/10 rounded-3xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20">

          ✕

        </button>

        {children}

      </div>

    </div>

  );
}