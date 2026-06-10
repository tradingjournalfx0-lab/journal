const mongoose =
require("mongoose");




// ======================
// SUBSCRIPTION SCHEMA
// ======================

const subscriptionSchema =
new mongoose.Schema({




  // ======================
  // USER
  // ======================

  user:{

    type:
    mongoose.Schema.Types.ObjectId,

    ref:"User",

    required:true,

  },




  // ======================
  // PLAN
  // ======================

  plan:{

    type:String,

    default:"Free",

  },




  // ======================
  // STATUS
  // ======================

  status:{

    type:String,

    default:"Inactive",

  },




  // ======================
  // EXPIRY
  // ======================

  expiry:{

    type:Date,

    default:null,

  },




  // ======================
  // TRADES LIMIT
  // ======================

  trades:{

    type:String,

    default:"20/month",

  },




  // ======================
  // PAYMENT
  // ======================

  amount:{

    type:Number,

    default:0,

  },




  paymentId:{

    type:String,

    default:"",

  },




  orderId:{

    type:String,

    default:"",

  },




  // ======================
  // PLAN TYPE
  // ======================

  duration:{

    type:String,

    default:"1 Month",

  },

},{
  timestamps:true,
});




// ======================
// EXPORT
// ======================

module.exports =
mongoose.model(

  "Subscription",

  subscriptionSchema

);