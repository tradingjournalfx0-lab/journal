export default function Card({
  children,
  className = "",
}) {

  return (

    <div
      className={`bg-white/5 border border-white/10 rounded-3xl p-6 ${className}`}>

      {children}

    </div>

  );
}