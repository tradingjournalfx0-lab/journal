
const Trade =
require("../models/Trade");




// ======================
// GET ANALYTICS
// ======================

const getAnalytics =
async(req,res)=>{

  try{

    // ======================
    // USER TRADES
    // ======================

    const trades =

    await Trade.find({

      user:req.user._id,

    }).sort({

      createdAt:-1

    });




    // ======================
    // TOTAL TRADES
    // ======================

    const totalTrades =

    trades.length;





    // ======================
    // WINS
    // ======================

    const wins =

    trades.filter(

      (trade)=>

      Number(trade.profit) > 0

    ).length;





    // ======================
    // LOSSES
    // ======================

    const losses =

    trades.filter(

      (trade)=>

      Number(trade.profit) < 0

    ).length;





    // ======================
    // BREAKEVEN
    // ======================

    const breakeven =

    trades.filter(

      (trade)=>

      Number(trade.profit) === 0

    ).length;





    // ======================
    // TOTAL PROFIT
    // ======================

    const totalProfit =

    trades.reduce(

      (acc,trade)=>

        acc +

        Number(

          trade.profit || 0

        ),

      0

    );





    // ======================
    // WIN RATE
    // ======================

    const winRate =

    totalTrades > 0

    ? (

        (wins / totalTrades)

        * 100

      ).toFixed(2)

    : 0;





    // ======================
    // AVG PROFIT
    // ======================

    const avgProfit =

    totalTrades > 0

    ? (

        totalProfit /

        totalTrades

      ).toFixed(2)

    : 0;





    // ======================
    // BIGGEST WIN
    // ======================

    const biggestWin =

    trades.length > 0

    ? Math.max(

        ...trades.map(

          (trade)=>

          Number(

            trade.profit || 0

          )

        )

      )

    : 0;





    // ======================
    // BIGGEST LOSS
    // ======================

    const biggestLoss =

    trades.length > 0

    ? Math.min(

        ...trades.map(

          (trade)=>

          Number(

            trade.profit || 0

          )

        )

      )

    : 0;





    // ======================
    // SESSION STATS
    // ======================

    const londonTrades =

    trades.filter(

      (trade)=>

      trade.session === "London"

    ).length;





    const newYorkTrades =

    trades.filter(

      (trade)=>

      trade.session === "New York"

    ).length;





    const asiaTrades =

    trades.filter(

      (trade)=>

      trade.session === "Asia"

    ).length;





    // ======================
    // RESPONSE
    // ======================

    res.json({

      totalTrades,

      wins,

      losses,

      breakeven,

      totalProfit,

      winRate,

      avgProfit,

      biggestWin,

      biggestLoss,




      sessions:{

        london:londonTrades,

        newYork:newYorkTrades,

        asia:asiaTrades,

      },




      // IMPORTANT
      // FULL TRADES

      allTrades: trades,




      // RECENT

      recentTrades:

      trades.slice(0,5),

    });

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// EXPORT
// ======================

module.exports = {

  getAnalytics,

};

