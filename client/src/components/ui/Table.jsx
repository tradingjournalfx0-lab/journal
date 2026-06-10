export default function Table({
  columns,
  data,
}) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b border-white/10">

            {columns.map((column, index) => (

              <th
                key={index}
                className="p-4 text-left text-gray-400">

                {column}

              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr
              key={index}
              className="border-b border-white/5">

              {Object.values(row).map(
                (cell, idx) => (

                  <td
                    key={idx}
                    className="p-4">

                    {cell}

                  </td>

                )
              )}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}