const calculateWinRate = (
  trades
) => {

  if (
    !trades ||
    trades.length === 0
  ) {

    return 0;

  }

  const wins =
    trades.filter(

      (trade)=>
        trade.profit > 0

    ).length;

  return (

    (wins / trades.length) *
    100

  ).toFixed(2);

};

export default calculateWinRate;