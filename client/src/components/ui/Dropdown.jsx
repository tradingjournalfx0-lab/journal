export default function Dropdown({
  options,
  value,
  onChange,
}) {

  return (

    <select
      value={value}
      onChange={onChange}
      className="bg-black/20 border border-white/10 rounded-2xl p-4 outline-none">

      {options.map((option, index) => (

        <option
          key={index}
          value={option}>

          {option}

        </option>

      ))}

    </select>

  );
}