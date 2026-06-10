export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {

  const variants = {

    primary:
      "bg-purple-600 hover:bg-purple-700 text-white",

    secondary:
      "bg-white/10 hover:bg-white/20 text-white",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",

  };

  return (

    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl transition-all duration-300 font-semibold ${variants[variant]} ${className}`}>

      {children}

    </button>

  );
}