const Subscription =
require("../models/Subscription");




// =========================
// CHECK SUBSCRIPTION
// =========================

const checkSubscription =
async(req,res,next)=>{

  try{

    // FIND ACTIVE SUBSCRIPTION

    const subscription =

    await Subscription.findOne({

      user:req.user.id,

      status:"Active",

    })

    .sort({

      createdAt:-1

    });





    // NO SUBSCRIPTION

    if(!subscription){

      return res.status(403).json({

        message:
        "Subscription Required",

      });

    }




    // LIFETIME PLAN

    if(

      subscription.plan ===

      "Lifetime"

    ){

      return next();

    }




    // CHECK EXPIRY

    if(

      subscription.expiry &&

      new Date(

        subscription.expiry

      ) < new Date()

    ){

      // EXPIRE PLAN

      subscription.status =

      "Expired";




      await subscription.save();




      return res.status(403).json({

        message:
        "Subscription Expired",

      });

    }




    // ACCESS GRANTED

    next();

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




// =========================
// EXPORT
// =========================

module.exports =
checkSubscription;