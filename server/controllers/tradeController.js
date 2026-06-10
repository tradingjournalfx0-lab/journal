const Trade =
require("../models/Trade");




// ======================
// GET USER TRADES
// ======================

const getTrades =
async(req,res)=>{

  try{

    const trades =
    await Trade.find({

      user:req.user.id,

    })

    .sort({

      createdAt:-1

    });

    res.json(

      trades

    );

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// CREATE TRADE
// ======================

const createTrade =
async(req,res)=>{

  try{

    const trade =
    await Trade.create({

      user:req.user.id,

      symbol:req.body.symbol,

      side:req.body.side,

      entry:req.body.entry,

      exit:req.body.exit,

      stoploss:req.body.stoploss,

      takeprofit:req.body.takeprofit,

      profit:req.body.profit,

      lotsize:req.body.lotsize,

      session:req.body.session,

      note:req.body.note,

    });

    res.status(201).json(

      trade

    );

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// UPDATE TRADE
// ======================

const updateTrade =
async(req,res)=>{

  try{

    // CHECK USER TRADE

    const trade =
    await Trade.findOne({

      _id:req.params.id,

      user:req.user.id,

    });




    if(!trade){

      return res.status(404).json({

        message:
        "Trade Not Found",

      });

    }




    // UPDATE

    trade.symbol =
    req.body.symbol;

    trade.side =
    req.body.side;

    trade.entry =
    req.body.entry;

    trade.exit =
    req.body.exit;

    trade.stoploss =
    req.body.stoploss;

    trade.takeprofit =
    req.body.takeprofit;

    trade.profit =
    req.body.profit;

    trade.lotsize =
    req.body.lotsize;

    trade.session =
    req.body.session;

    trade.note =
    req.body.note;




    const updatedTrade =
    await trade.save();




    res.json(

      updatedTrade

    );

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// DELETE TRADE
// ======================

const deleteTrade =
async(req,res)=>{

  try{

    // CHECK USER TRADE

    const trade =
    await Trade.findOne({

      _id:req.params.id,

      user:req.user.id,

    });




    if(!trade){

      return res.status(404).json({

        message:
        "Trade Not Found",

      });

    }




    // DELETE

    await trade.deleteOne();




    res.json({

      message:
      "Trade Deleted ✅"

    });

  }catch(error){

    console.log(error);

    res.status(500).json({

      message:error.message,

    });

  }

};




module.exports = {

  getTrades,

  createTrade,

  updateTrade,

  deleteTrade,

};