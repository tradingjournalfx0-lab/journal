const calculateStats = (trades = []) => {




  // =========================
  // SAFE ARRAY
  // =========================

  if(!Array.isArray(trades)){

    trades = [];

  }





  // =========================
  // TOTAL TRADES
  // =========================

  const totalTrades =
  trades.length;





  // =========================
  // WIN / LOSS
  // =========================

  const winningTrades =
  trades.filter(

    (trade)=>

      Number(trade.profit) > 0

  );




  const losingTrades =
  trades.filter(

    (trade)=>

      Number(trade.profit) < 0

  );




  const breakEvenTrades =
  trades.filter(

    (trade)=>

      Number(trade.profit) === 0

  );





  // =========================
  // COUNTS
  // =========================

  const wins =
  winningTrades.length;




  const losses =
  losingTrades.length;




  const breakEven =
  breakEvenTrades.length;





  // =========================
  // TOTAL PROFIT
  // =========================

  const totalProfit =
  trades.reduce(

    (acc,trade)=>

      acc + Number(

        trade.profit || 0

      ),

    0

  );





  // =========================
  // TOTAL WIN PROFIT
  // =========================

  const totalWinProfit =
  winningTrades.reduce(

    (acc,trade)=>

      acc + Number(

        trade.profit || 0

      ),

    0

  );





  // =========================
  // TOTAL LOSS PROFIT
  // =========================

  const totalLossProfit =
  losingTrades.reduce(

    (acc,trade)=>

      acc + Number(

        trade.profit || 0

      ),

    0

  );





  // =========================
  // AVERAGE WIN
  // =========================

  const averageWin =

    wins > 0

    ? (

        totalWinProfit / wins

      ).toFixed(2)

    : "0.00";





  // =========================
  // AVERAGE LOSS
  // =========================

  const averageLoss =

    losses > 0

    ? (

        totalLossProfit / losses

      ).toFixed(2)

    : "0.00";





  // =========================
  // WIN RATE
  // =========================

  const winRate =

    totalTrades > 0

    ? (

        (wins / totalTrades) * 100

      ).toFixed(2)

    : "0.00";





  // =========================
  // PROFIT FACTOR
  // =========================

  const profitFactor =

    Math.abs(totalLossProfit) > 0

    ? (

        Math.abs(totalWinProfit) /

        Math.abs(totalLossProfit)

      ).toFixed(2)

    : "0.00";





  // =========================
  // BEST TRADE
  // =========================

  const bestTrade =

    totalTrades > 0

    ? Math.max(

        ...trades.map(

          (trade)=>

            Number(trade.profit || 0)

        )

      )

    : 0;





  // =========================
  // WORST TRADE
  // =========================

  const worstTrade =

    totalTrades > 0

    ? Math.min(

        ...trades.map(

          (trade)=>

            Number(trade.profit || 0)

        )

      )

    : 0;





  // =========================
  // RETURN
  // =========================

  return {

    totalTrades,

    wins,

    losses,

    breakEven,

    totalProfit:

      Number(totalProfit.toFixed(2)),




    totalWinProfit:

      Number(totalWinProfit.toFixed(2)),




    totalLossProfit:

      Number(totalLossProfit.toFixed(2)),




    averageWin:

      Number(averageWin),




    averageLoss:

      Number(averageLoss),




    winRate:

      Number(winRate),




    profitFactor:

      Number(profitFactor),




    bestTrade,

    worstTrade,

  };

};




// =========================
// EXPORT
// =========================

module.exports =
calculateStats;