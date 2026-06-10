const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const path =
require("path");

const protect =
require("../middleware/authMiddleware");

const {

  getProfile,

  saveProfile,

  uploadAvatar,

} = require(

  "../controllers/profileController"

);




// ======================
// MULTER CONFIG
// ======================

const storage =
multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(

      null,

      "uploads/"

    );

  },




  filename:(req,file,cb)=>{

    cb(

      null,

      Date.now() +

      path.extname(

        file.originalname

      )

    );

  },

});




const upload =
multer({

  storage,

});




// ======================
// GET PROFILE
// ======================

router.get(

  "/",

  protect,

  getProfile

);




// ======================
// SAVE PROFILE
// ======================

router.post(

  "/",

  protect,

  saveProfile

);




// ======================
// AVATAR UPLOAD
// ======================

router.post(

  "/avatar",

  protect,

  upload.single("avatar"),

  uploadAvatar

);




// ======================
// EXPORT
// ======================

module.exports =
router;