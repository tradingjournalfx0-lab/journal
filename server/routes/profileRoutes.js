
const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const path =
require("path");

const fs =
require("fs");

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
// UPLOAD PATH
// ======================

const uploadPath =
path.join(

  __dirname,

  "../uploads"

);




// ======================
// CREATE UPLOADS FOLDER
// ======================

if(

  !fs.existsSync(
    uploadPath
  )

){

  fs.mkdirSync(

    uploadPath,

    {

      recursive:true,

    }

  );

}




// ======================
// MULTER STORAGE
// ======================

const storage =
multer.diskStorage({

  destination:(req,file,cb)=>{

    cb(

      null,

      uploadPath

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




// ======================
// FILE FILTER
// ======================

const fileFilter =
(req,file,cb)=>{

  const allowedTypes = [

    "image/png",

    "image/jpeg",

    "image/jpg",

    "image/webp",

  ];





  if(

    allowedTypes.includes(
      file.mimetype
    )

  ){

    cb(null,true);

  }else{

    cb(

      new Error(
        "Only image files allowed"
      ),

      false

    );

  }

};




// ======================
// MULTER
// ======================

const upload =
multer({

  storage,

  fileFilter,

  limits:{

    fileSize:
    5 * 1024 * 1024,

  },

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

