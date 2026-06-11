
const Razorpay =
require("razorpay");

const crypto =
require("crypto");

const Subscription =
require("../models/Subscription");




// ======================
// RAZORPAY
// ======================

const razorpay =
new Razorpay({

  key_id:
  process.env.RAZORPAY_KEY_ID,

  key_secret:
  process.env.RAZORPAY_KEY_SECRET,

});




// ======================
// CREATE ORDER
// ======================

const createOrder =
async (req, res) => {

  try {

    const amount =
    Number(req.body.amount);




    if (

      !amount ||

      amount <= 0

    ) {

      return res.status(400).json({

        success:false,

        message:
        "Invalid Amount",

      });

    }




    const order =

    await razorpay.orders.create({

      amount:
      amount * 100,

      currency:"INR",

      receipt:
      `receipt_${Date.now()}`,

    });




    console.log(
      "ORDER CREATED:",
      order
    );




    res.json(order);

  } catch (error) {

    console.log(
      "CREATE ORDER ERROR:",
      error
    );




    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};




// ======================
// PAYMENT SUCCESS
// ======================

const paymentSuccess =
async (req, res) => {

  try {

    console.log(
      "PAYMENT SUCCESS API HIT"
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "USER:",
      req.user
    );





    // ======================
    // USER CHECK
    // ======================

    if (

      !req.user ||

      !req.user.id

    ) {

      return res.status(401).json({

        success:false,

        message:
        "Unauthorized User",

      });

    }





    // ======================
    // DATA
    // ======================

    const {

      amount,

      paymentId,

      orderId,

      plan,

      razorpay_signature,

    } = req.body;





    console.log(
      "PAYMENT ID:",
      paymentId
    );

    console.log(
      "ORDER ID:",
      orderId
    );

    console.log(
      "SIGNATURE:",
      razorpay_signature
    );





    // ======================
    // VERIFY PAYMENT
    // ======================

    const body =
    orderId + "|" + paymentId;





    const expectedSignature =

      crypto

        .createHmac(

          "sha256",

          process.env
          .RAZORPAY_KEY_SECRET

        )

        .update(body.toString())

        .digest("hex");





    console.log(
      "EXPECTED:",
      expectedSignature
    );





    // ======================
    // INVALID SIGNATURE
    // ======================

    if (

      expectedSignature !==

      razorpay_signature

    ) {

      return res.status(400).json({

        success:false,

        message:
        "Payment Verification Failed",

      });

    }





    // ======================
    // EXPIRY
    // ======================

    let expiry = null;





    if (

      plan === "1 Month"

    ) {

      expiry = new Date();

      expiry.setMonth(

        expiry.getMonth() + 1

      );

    }

    else if (

      plan === "6 Months"

    ) {

      expiry = new Date();

      expiry.setMonth(

        expiry.getMonth() + 6

      );

    }

    else if (

      plan === "1 Year"

    ) {

      expiry = new Date();

      expiry.setFullYear(

        expiry.getFullYear() + 1

      );

    }

    else if (

      plan === "Lifetime"

    ) {

      expiry = null;

    }





    // ======================
    // EXPIRE OLD PLAN
    // ======================

    await Subscription.updateMany(

      {

        user:req.user.id,

        status:"Active",

      },

      {

        status:"Expired",

      }

    );





    // ======================
    // SAVE SUBSCRIPTION
    // ======================

    const subscription =

    await Subscription.create({

      user:req.user.id,

      plan:
      plan || "Free",

      status:"Active",

      expiry,

      trades:"Unlimited",

      amount:
      Number(amount) || 0,

      paymentId:
      paymentId || "",

      orderId:
      orderId || "",

    });





    console.log(
      "SUBSCRIPTION SAVED ✅",
      subscription
    );





    res.json({

      success:true,

      message:
      "Subscription Activated ✅",

      subscription,

    });

  } catch (error) {

    console.log(
      "PAYMENT ERROR:",
      error
    );




    res.status(500).json({

      success:false,

      message:error.message,

    });

  }

};




// ======================
// EXPORT
// ======================

module.exports = {

  createOrder,

  paymentSuccess,

};

