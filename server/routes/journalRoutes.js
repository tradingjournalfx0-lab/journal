const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {

  getJournals,

  createJournal,

  updateJournal,

  deleteJournal,

} = require(

  "../controllers/journalController"

);




// ======================
// GET USER JOURNALS
// ======================

router.get(

  "/",

  protect,

  getJournals

);




// ======================
// CREATE JOURNAL
// ======================

router.post(

  "/",

  protect,

  createJournal

);




// ======================
// UPDATE JOURNAL
// ======================

router.put(

  "/:id",

  protect,

  updateJournal

);




// ======================
// DELETE JOURNAL
// ======================

router.delete(

  "/:id",

  protect,

  deleteJournal

);




module.exports =
router;