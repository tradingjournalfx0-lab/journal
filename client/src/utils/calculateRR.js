const calculateRR = (
  entry,
  stoploss,
  takeprofit
) => {

  const risk =
    Math.abs(
      entry - stoploss
    );

  const reward =
    Math.abs(
      takeprofit - entry
    );

  if (risk === 0) {

    return 0;

  }

  return (
    reward / risk
  ).toFixed(2);

};

export default calculateRR;