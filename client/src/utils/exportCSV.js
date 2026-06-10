const exportCSV = (
  trades
) => {

  const headers = [

    "Symbol",
    "Side",
    "Entry",
    "Exit",
    "Profit",
    "Strategy",

  ];

  const rows =
    trades.map((trade)=>[

      trade.symbol,
      trade.side,
      trade.entry,
      trade.exit,
      trade.profit,
      trade.strategy,

    ]);

  let csvContent =

    "data:text/csv;charset=utf-8," +

    [headers,...rows]

    .map((e)=>e.join(","))

    .join("\n");

  const encodedUri =
    encodeURI(csvContent);

  const link =
    document.createElement("a");

  link.setAttribute(
    "href",
    encodedUri
  );

  link.setAttribute(
    "download",
    "trades.csv"
  );

  document.body.appendChild(
    link
  );

  link.click();

};

export default exportCSV;