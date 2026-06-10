
const express =
require("express");

const router =
express.Router();




// ======================
// CONTROLLERS
// ======================

const {

  getSubscription,

  createSubscription,

  cancelSubscription,

  getBillingHistory,

} = require(

  "../controllers/subscriptionController"

);




// ======================
// AUTH MIDDLEWARE
// ======================

const protect =
require(

  "../middleware/authMiddleware"

);




// ======================
// GET SUBSCRIPTION
// ======================

router.get(

  "/",

  protect,

  getSubscription

);




// ======================
// BILLING HISTORY
// IMPORTANT:
// KEEP ABOVE "/:id"
// ======================

router.get(

  "/history",

  protect,

  getBillingHistory

);




// ======================
// CREATE SUBSCRIPTION
// ======================

router.post(

  "/",

  protect,

  createSubscription

);




// ======================
// CANCEL SUBSCRIPTION
// ======================

router.delete(

  "/:id",

  protect,

  cancelSubscription

);




// ======================
// EXPORT
// ======================

module.exports =
router;

