
const express =
require("express");

const router =
express.Router();




// ======================
// AUTH
// ======================

const protect =
require("../middleware/authMiddleware");




// ======================
// SUBSCRIPTION
// ======================

const checkSubscription =
require("../middleware/subscriptionMiddleware");




// ======================
// CONTROLLERS
// ======================

const {

  getTrades,

  createTrade,

  updateTrade,

  deleteTrade,

} = require(

  "../controllers/tradeController"

);




// ======================
// GET TRADES
// ======================

router.get(

  "/",

  protect,

  checkSubscription,

  getTrades

);




// ======================
// CREATE TRADE
// ======================

router.post(

  "/",

  protect,

  checkSubscription,

  createTrade

);




// ======================
// UPDATE TRADE
// ======================

router.put(

  "/:id",

  protect,

  checkSubscription,

  updateTrade

);




// ======================
// DELETE TRADE
// ======================

router.delete(

  "/:id",

  protect,

  checkSubscription,

  deleteTrade

);




// ======================
// EXPORT
// ======================

module.exports =
router;

