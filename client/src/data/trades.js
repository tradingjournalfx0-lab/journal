const trades = [

  {
    id: 1,
    symbol: "XAUUSD",
    side: "BUY",
    entry: 3340,
    exit: 3352,
    stoploss: 3330,
    takeprofit: 3365,
    profit: 120,
    strategy: "CRT",
    session: "London",
    date: "12 June 2026",
    result: "Win",
  },

  {
    id: 2,
    symbol: "BTCUSD",
    side: "SELL",
    entry: 105000,
    exit: 104200,
    stoploss: 105500,
    takeprofit: 103500,
    profit: -80,
    strategy: "SMC",
    session: "New York",
    date: "14 June 2026",
    result: "Loss",
  },

  {
    id: 3,
    symbol: "EURUSD",
    side: "BUY",
    entry: 1.1450,
    exit: 1.1490,
    stoploss: 1.1420,
    takeprofit: 1.1520,
    profit: 210,
    strategy: "Scalp",
    session: "London",
    date: "15 June 2026",
    result: "Win",
  },

];

export default trades;