const mongoose =
require("mongoose");

const tradeSchema =
new mongoose.Schema({

  user:{
    type:
    mongoose.Schema.Types.ObjectId,

    ref:"User",

    required:true,
  },

  symbol:{
    type:String,
    required:true,
  },

  session:{
    type:String,
    required:true,
  },

  side:{
    type:String,
    required:true,
  },

  entry:{
    type:Number,
    required:true,
  },

  exit:{
    type:Number,
    required:true,
  },

  profit:{
    type:Number,
    required:true,
  },

  lotsize:{
    type:String,
    required:true,
  },

  stoploss:Number,

  takeprofit:Number,

  note:String,

},{
  timestamps:true,
});

module.exports =
mongoose.model(

  "Trade",

  tradeSchema

);