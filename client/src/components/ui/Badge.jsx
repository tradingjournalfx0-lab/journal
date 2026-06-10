export default function Badge({
  children,
  color = "purple",
}) {

  const colors = {

    purple:
      "bg-purple-500/20 text-purple-400",

    green:
      "bg-green-500/20 text-green-400",

    red:
      "bg-red-500/20 text-red-400",

    blue:
      "bg-blue-500/20 text-blue-400",

  };

  return (

    <span
      className={`px-4 py-2 rounded-xl text-sm font-semibold ${colors[color]}`}>

      {children}

    </span>

  );
}