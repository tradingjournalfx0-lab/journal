
const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const generateToken =
require("../utils/generateToken");




// =========================
// REGISTER
// =========================

const registerUser =
async(req,res)=>{

  try{

    const {

      name,
      email,
      password,

    } = req.body;



    // VALIDATION

    if(

      !name ||

      !email ||

      !password

    ){

      return res.status(400).json({

        message:
        "All fields required",

      });

    }



    // CHECK USER

    const userExists =
    await User.findOne({

      email,

    });



    if(userExists){

      return res.status(400).json({

        message:
        "User already exists",

      });

    }



    // HASH PASSWORD

    const salt =
    await bcrypt.genSalt(10);



    const hashedPassword =
    await bcrypt.hash(

      password,

      salt

    );



    // CREATE USER

    const user =
    await User.create({

      name,
      email,
      password:
      hashedPassword,

    });



    // RESPONSE

    res.status(201).json({

      _id:user._id,

      name:user.name,

      email:user.email,

      token:generateToken(

        user._id

      ),

    });

  }catch(error){

    console.log(error);



    res.status(500).json({

      message:error.message,

    });

  }

};




// =========================
// LOGIN
// =========================

const loginUser =
async(req,res)=>{

  try{

    const {

      email,
      password,

    } = req.body;



    // CHECK USER

    const user =
    await User.findOne({

      email,

    });



    if(

      user &&

      await bcrypt.compare(

        password,

        user.password

      )

    ){

      res.json({

        _id:user._id,

        name:user.name,

        email:user.email,

        token:generateToken(

          user._id

        ),

      });

    }else{

      res.status(401).json({

        message:
        "Invalid email or password",

      });

    }

  }catch(error){

    console.log(error);



    res.status(500).json({

      message:error.message,

    });

  }

};




// =========================
// RESET PASSWORD
// =========================

const resetPassword =
async(req,res)=>{

  try{

    const {

      email,
      password,

    } = req.body;



    // =========================
    // VALIDATION
    // =========================

    if(

      !email ||

      !password

    ){

      return res.status(400).json({

        message:
        "Email and password required",

      });

    }



    // =========================
    // FIND USER
    // =========================

    const user =
    await User.findOne({

      email,

    });



    if(!user){

      return res.status(404).json({

        message:
        "User not found",

      });

    }



    // =========================
    // HASH NEW PASSWORD
    // =========================

    const salt =
    await bcrypt.genSalt(10);



    const hashedPassword =
    await bcrypt.hash(

      password,

      salt

    );



    // =========================
    // SAVE NEW PASSWORD
    // =========================

    user.password =
    hashedPassword;



    await user.save();



    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({

      message:
      "Password reset successful ✅",

    });

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

module.exports = {

  registerUser,

  loginUser,

  resetPassword,

};

