const Profile =
require("../models/Profile");




// ======================
// GET PROFILE
// ======================

const getProfile =
async(req,res)=>{

  try{

    let profile =

    await Profile.findOne({

      user:req.user.id,

    });




    // CREATE EMPTY PROFILE

    if(!profile){

      profile =

      await Profile.create({

        user:req.user.id,

      });

    }




    res.json(profile);

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// SAVE PROFILE
// ======================

const saveProfile =
async(req,res)=>{

  try{

    let profile =

    await Profile.findOne({

      user:req.user.id,

    });




    // UPDATE PROFILE

    if(profile){

      profile.fullName =
      req.body.fullName;

      profile.email =
      req.body.email;

      profile.country =
      req.body.country;

      profile.experience =
      req.body.experience;

      profile.broker =
      req.body.broker;

      profile.accountType =
      req.body.accountType;

      profile.bio =
      req.body.bio;

      profile.leverage =
      req.body.leverage;




      await profile.save();




      return res.json(profile);

    }




    // CREATE PROFILE

    profile =

    await Profile.create({

      user:req.user.id,

      fullName:req.body.fullName,

      email:req.body.email,

      country:req.body.country,

      experience:req.body.experience,

      broker:req.body.broker,

      accountType:req.body.accountType,

      bio:req.body.bio,

      leverage:req.body.leverage,

    });




    res.status(201).json(

      profile

    );

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




// ======================
// UPLOAD AVATAR
// ======================

const uploadAvatar =
async(req,res)=>{

  try{

    let profile =

    await Profile.findOne({

      user:req.user.id,

    });




    const avatarPath =

    `uploads/${req.file.filename}`;




    // UPDATE

    if(profile){

      profile.avatar =
      avatarPath;

      await profile.save();

    }else{

      // CREATE

      profile =

      await Profile.create({

        user:req.user.id,

        avatar:avatarPath,

      });

    }




    res.json({

      avatar:avatarPath,

    });

  }catch(error){

    console.log(error);




    res.status(500).json({

      message:error.message,

    });

  }

};




module.exports = {

  getProfile,

  saveProfile,

  uploadAvatar,

};