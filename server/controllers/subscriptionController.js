
const Subscription =
require("../models/Subscription");




// ======================
// GET SUBSCRIPTION
// ======================

const getSubscription =
async(req,res)=>{

  try{

    // ======================
    // FIND USER SUBSCRIPTION
    // ======================

    let subscription =

    await Subscription.findOne({

      user:req.user.id,

      status:"Active",

    })

    .sort({

      createdAt:-1,

    });





    // ======================
    // DEFAULT FREE PLAN
    // ======================

    if(!subscription){

      return res.json({

        plan:"Free",

        status:"Inactive",

        expiry:null,

        trades:"20/month",

      });

    }





    // ======================
    // EXPIRE CHECK
    // ======================

    if(

      subscription.expiry &&

      new Date(subscription.expiry)

      < new Date()

    ){

      subscription.status =
      "Expired";

      await subscription.save();




      return res.json({

        plan:"Free",

        status:"Inactive",

        expiry:null,

        trades:"20/month",

      });

    }





    // ======================
    // RESPONSE
    // ======================

    res.json({

      plan:
      subscription.plan,

      status:
      subscription.status,

      expiry:
      subscription.expiry,

      trades:
      subscription.trades,

      amount:
      subscription.amount,

    });

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// CREATE SUBSCRIPTION
// ======================

const createSubscription =
async(req,res)=>{

  try{

    const {

      plan,
      amount,
      paymentId,
      expiry,

    } = req.body;





    // EXPIRE OLD

    await Subscription.updateMany(

      {

        user:req.user.id,

        status:"Active",

      },

      {

        status:"Expired",

      }

    );





    // CREATE NEW

    const subscription =

    await Subscription.create({

      user:req.user.id,

      plan:
      plan || "Pro",

      amount:
      Number(amount || 0),

      paymentId:
      paymentId || "",

      status:"Active",

      expiry:
      expiry || null,

      trades:"Unlimited",

    });





    res.status(201).json(

      subscription

    );

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// CANCEL SUBSCRIPTION
// ======================

const cancelSubscription =
async(req,res)=>{

  try{

    const subscription =

    await Subscription.findOne({

      _id:req.params.id,

      user:req.user.id,

    });





    if(!subscription){

      return res.status(404).json({

        message:
        "Subscription Not Found",

      });

    }





    // CANCEL

    subscription.status =
    "Cancelled";

    await subscription.save();





    res.json({

      success:true,

      message:
      "Subscription Cancelled ✅",

    });

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// BILLING HISTORY
// ======================

const getBillingHistory =
async(req,res)=>{

  try{

    const history =

    await Subscription.find({

      user:req.user.id,

    })

    .sort({

      createdAt:-1,

    });





    res.json(history);

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

  getSubscription,

  createSubscription,

  cancelSubscription,

  getBillingHistory,

};

