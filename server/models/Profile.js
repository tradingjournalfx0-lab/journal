const mongoose =
require("mongoose");

const profileSchema =
new mongoose.Schema({




  // ======================
  // USER
  // ======================

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true,
  },




  // ======================
  // PROFILE INFO
  // ======================

  fullName:{
    type:String,
    default:"",
  },

  email:{
    type:String,
    default:"",
  },

  country:{
    type:String,
    default:"",
  },

  experience:{
    type:String,
    default:"",
  },

  broker:{
    type:String,
    default:"",
  },

  accountType:{
    type:String,
    default:"",
  },

  bio:{
    type:String,
    default:"",
  },




  // ======================
  // AVATAR
  // ======================

  avatar:{
    type:String,
    default:"",
  },




  // ======================
  // TRADING
  // ======================

  leverage:{
    type:String,
    default:"",
  },

},{
  timestamps:true,
});




// ======================
// EXPORT
// ======================

module.exports =
mongoose.model(

  "Profile",

  profileSchema

);