export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {

  return (

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full bg-black/20 border border-white/10 rounded-2xl p-4 outline-none focus:border-purple-500"
    />

  );
}