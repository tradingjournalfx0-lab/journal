const express =
require("express");

const router =
express.Router();




// ======================
// CONTROLLER
// ======================

const {

  createOrder,

  paymentSuccess,

} = require(

  "../controllers/paymentController"

);




// ======================
// AUTH MIDDLEWARE
// ======================

const protect =
require(

  "../middleware/authMiddleware"

);




// ======================
// CREATE ORDER
// ======================

router.post(

  "/create-order",

  protect,

  createOrder

);




// ======================
// PAYMENT SUCCESS
// ======================

router.post(

  "/success",

  protect,

  paymentSuccess

);




// ======================
// EXPORT
// ======================

module.exports =
router;