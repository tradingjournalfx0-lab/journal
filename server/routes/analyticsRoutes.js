
const express =
require("express");

const router =
express.Router();




// ======================
// CONTROLLER
// ======================

const {

  getAnalytics,

} = require(

  "../controllers/analyticsController"

);




// ======================
// AUTH MIDDLEWARE
// ======================

const protect =
require(

  "../middleware/authMiddleware"

);




// ======================
// SUBSCRIPTION MIDDLEWARE
// ======================

const checkSubscription =
require(

  "../middleware/subscriptionMiddleware"

);




// ======================
// ROUTES
// ======================

router.get(

  "/",

  protect,

  checkSubscription,

  getAnalytics

);




// ======================
// EXPORT
// ======================

module.exports =
router;

